import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState }  from "react";
import {View, Text, ActivityIndicator, TouchableOpacity, FlatList, TextInput, StyleSheet, Image, Button, useWindowDimensions} from "react-native";
import {LargeButton} from "../components/LargeButton";
import { auth, db } from "../firebase";

const ProfilePage = () => {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true); 

  const [userBooks, setUserBooks] = useState([]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
        db.collection("UserLibraryBooks").where("userID","==",auth.currentUser?.email)
        .get()
        .then((querySnapshot) => {
            const books = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                books.push(doc.data().book);
            });
            setUserBooks(books);
            setLoading(false);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })

    }, [])
    
    if (loading) {
        return <ActivityIndicator />;
    }
    

  return (
    <View style = {styles.mainContainer}>
        <Text>Email: {auth.currentUser?.email}</Text>
        <LargeButton 
                        buttonName = {"Search and add titles"} 
                        onPress = {() => navigation.push("Search")} 
                        style = {styles.searchButton}
        />
        <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
        >
        <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <FlatList
        data={userBooks}
        numColumns = {2}
        renderItem = {(book) => {
            console.log(book);
            return(
                <View style = {{height: '5%'}}>
                <Image style={styles.poster}
                    source={{
                    uri: book.item.imageLinks.smallThumbnail,
                    }} />
                </View>
            )
        }}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    searchButton: {
        flex: 0.07,
    },
    mainContainer: {
        alignItems: "center",
        backgroundColor: "#dbb49c",
        flexDirection: "column",
        flex: 1
    },
    poster:{
        width: 150,
        height: 215,
        margin:5
    }
});

export {ProfilePage};

