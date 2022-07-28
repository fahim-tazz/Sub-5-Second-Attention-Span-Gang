import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { StyleSheet, Text, TextInput, View, Image, Button, ScrollView} from 'react-native'
import React, { useState }  from "react";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { auth, db } from "../firebase";
import { doc, collection, set, listDocuments } from "firebase/firestore";
import {Slider} from '@miblanchard/react-native-slider';
import { Animated } from 'react-native';
import { Rating } from 'react-native-ratings';

const DescriptionPage = (book) => {

    const navigation = useNavigation();

    const [added, setAdded] = useState(false);

    const [button, setButton] = useState();

    const [slider, setSlider] = useState(0);

    const [rating, setRating] = useState(0);

    const [text, onChangeText] = useState("");

    const addToLibrary = async (bookdetails) => {
        try {
            const docRef = await db.collection("UserLibraryBooks")
            .doc(auth.currentUser?.email + bookdetails.title).set({
                userID: auth.currentUser?.email,
                book: bookdetails,
                progress: 0,
                userRating: 0
              });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          
        navigation.navigate("Profile")
    }

    const removeBookFromLibrary = async (bookDetails) => {
        try {
            const docRef = await db.collection("UserLibraryBooks")
            .doc(auth.currentUser?.email 
                + bookDetails.title)
            .delete()
            
            const annotationRef = await db.collection("UserAnnotations")
            .where("userID","==",auth.currentUser?.email)
            .where("book.title","==",book.route.params.book.title)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection("UserAnnotations")
                    .doc(auth.currentUser?.email 
                        + book.route.params.book.title 
                        + doc.data().progress).delete()
                }
                )
            }
            )
          } catch (e) {
            console.error("Error removing document: ", e);
          }
          navigation.navigate("Profile")
    }

    const updatePages = async (pages) => {
        try {
            const docRef = await db.collection("UserLibraryBooks")
            .doc(auth.currentUser?.email 
                + book.route.params.book.title)
            .update({
                userID: auth.currentUser?.email,
                book: book.route.params.book,
                progress: pages,
                userRating: rating
              })
              showAnnotation(slider)
        } catch (e) {
            console.error("Error updating pages read: ", e);
        }
    }

    const updateRating = async (rate) => {
        try {
            const docRef = await db.collection("UserLibraryBooks")
            .doc(auth.currentUser?.email 
                + book.route.params.book.title)
            .update({
                userID: auth.currentUser?.email,
                book: book.route.params.book,
                progress: slider,
                userRating: rate
              })
        } catch (e) {
            console.error("Error updating pages read: ", e);
        }
    }

    const addAnnotation = async (thought) => {
        try {
            const docRef = await db.collection("UserAnnotations")
            .doc(auth.currentUser?.email 
                + book.route.params.book.title 
                + slider)
            .set({
                userID: auth.currentUser?.email,
                book: book.route.params.book,
                progress: slider,
                annotation: thought
              })
        } catch (e) {
            console.error("Error updating annotation: ", e);
        }
    }

    const showAnnotation = async (pages) => {
        await db.collection("UserAnnotations")
        .doc(auth.currentUser?.email 
        + book.route.params.book.title 
        + pages)
        .get()
        .then(querySnapshot => {
        if(querySnapshot.exists && !querySnapshot.empty){
            onChangeText(querySnapshot.data().annotation)
        }
        else{
            onChangeText("")
        }})
    }

    
    useFocusEffect(React.useCallback(() => {
    let comp;
    var query = db.collection("UserLibraryBooks").where("book.title", "==", book.route.params.book.title)
    .where("userID", "==", auth.currentUser?.email).get()
    .then(querySnapshot => {
    if(querySnapshot.empty) {
      comp = <Button title = "Add to Library"
              onPress={() => addToLibrary(book.route.params.book)}/>
              setButton(comp);
             }
    else {
      comp = <Button title = "Remove from Library"
              onPress={() => removeBookFromLibrary(book.route.params.book)}/>
              setButton(comp)
              setSlider(querySnapshot.docs[0].data().progress)
              setRating(querySnapshot.docs[0].data().userRating)
              setAdded(true)
              showAnnotation(querySnapshot.docs[0].data().progress)
    }
    })


    }, []))

    if(!added) {
        return (
            <ScrollView contentInset = {{top: 10, left: 10, bottom: 80, right: 10}}>
              <Text>{book.route.params.book.title}</Text>
              <Text>Author: {book.route.params.book.authors[0]}</Text>
              <Text>Rating: {book.route.params.book.averageRating}</Text>
              <Image style = {styles.poster}
                source = {{uri: book.route.params.book.imageLinks.thumbnail}}
              />
              <Text style = {{height: '20%'}}>{book.route.params.book.description}</Text>
              {button}
            </ScrollView>
          )

    } else {
  return (
    <ScrollView contentInset = {{top: 10, left: 10, bottom: 80, right: 10}}>
      <Text>{book.route.params.book.title}</Text>
      <Text>Author: {book.route.params.book.authors[0]}</Text>
      <Text>Rating: {book.route.params.book.averageRating}</Text>
      <Image style = {styles.poster}
        source = {{uri: book.route.params.book.imageLinks.thumbnail}}
      />
      <Text style = {{height: '20%'}}>{book.route.params.book.description}</Text>
      <Text>Your Rating:</Text>
      <Rating
        style={{ paddingVertical: 10 }}
        startingValue={rating}
        onFinishRating = {updateRating}
        onSwipeRating = {setRating}
      />
      <Slider
        value={slider}
        startingValue={slider}
        maximumValue={book.route.params.book.pageCount}
        step={1}
        onValueChange={setSlider}
        onSlidingComplete={(value) => updatePages(value)}
        style = {{width: "50%"}}
        trackClickable ={false}
        />
        <Text>Pages Read: {slider} / {book.route.params.book.pageCount}</Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Annotations"
        />
        <Button title = "Save Annotation for current page" 
        onPress={() => addAnnotation(text)}
        />
      {button}
    </ScrollView>
  )
    }
}

const styles = StyleSheet.create({
    poster:{
        width: 150,
        height: 215,
        margin:5
    },
    input: {
        margin: 15,
        height: '20%',
        borderColor: 'black',
        borderWidth: 1
     }
})

export {DescriptionPage};

