import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { StyleSheet, Text, TextInput, View, Image, Button, ScrollView} from 'react-native'
import React, { useState }  from "react";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { auth, db } from "../firebase";
import { doc, collection, set } from "firebase/firestore";
import {Slider} from '@miblanchard/react-native-slider';
import { Animated } from 'react-native';
import { Rating } from 'react-native-ratings';

const DescriptionPage = (book) => {

    const navigation = useNavigation();

    const [button, setButton] = useState();

    const [slider, setSlider] = useState(0);
    const [text, onChangeText] = React.useState("Annotations");

    const addToLibrary = async (bookdetails) => {
        try {
            const docRef = await db.collection("UserLibraryBooks")
            .doc(auth.currentUser?.email + bookdetails.title).set({
                userID: auth.currentUser?.email,
                book: bookdetails,
                progress: 0
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
          } catch (e) {
            console.error("Error removing document: ", e);
          }
          navigation.navigate("Profile")
    }

    const updatePages = async (pages) => {
        try {
            setSlider(pages)
            const docRef = await db.collection("UserLibraryBooks")
            .doc(auth.currentUser?.email 
                + book.route.params.book.title)
            .update({
                userID: auth.currentUser?.email,
                book: book.route.params.book,
                progress: pages
              })
        } catch (e) {
            console.error("Error updating pages read: ", e);
        }
    }

    
    useFocusEffect(React.useCallback(() => {
    let comp;
    let slider;
    var query = db.collection("UserLibraryBooks").where("book.title", "==", book.route.params.book.title)
    .where("userID", "==", auth.currentUser?.email).get()
    .then(querySnapshot => {
    if(querySnapshot.empty) {
      comp = <Button title = "Add to Library"
              onPress={() => addToLibrary(book.route.params.book)}/>
              setButton(comp);
             }
    else {
        console.log(querySnapshot.docs[0].data().progress);
      comp = <Button title = "Remove from Library"
              onPress={() => removeBookFromLibrary(book.route.params.book)}/>
              setButton(comp)
              setSlider(querySnapshot.docs[0].data().progress)
    }
    })
    }, []))



  return (
    <ScrollView>
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
      />
      <Slider
        value={slider}
        maximumValue={book.route.params.book.pageCount}
        step={1}
        onValueChange={(value) => updatePages(value)}
        style = {{width: "50%"}}
        />
        <Text>Pages Read: {slider} / {book.route.params.book.pageCount}</Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Annotations"
        />
      {button}
    </ScrollView>
  )
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

