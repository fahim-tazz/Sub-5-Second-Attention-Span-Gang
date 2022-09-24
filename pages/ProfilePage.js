import { useNavigation, useFocusEffect } from "@react-navigation/core";
import React, { useState }  from "react";
import {View, SafeAreaView, Text, ActivityIndicator, TouchableOpacity, FlatList, TouchableHighlight, StyleSheet, Image, Button, useWindowDimensions} from "react-native";
import {LargeButton} from "../components/LargeButton";
import { auth, db, storage } from "../firebase";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {launchImageLibrary} from 'react-native-image-picker';

const ProfilePage = () => {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true); 

  const [userBooks, setUserBooks] = useState([]);

  const [photo, setPhoto] = useState(null);

  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  const addProfilePic = async () => {
    const result = await launchImageLibrary();
    handleChange(result)
    const fileRef = ref(storage, auth.currentUser.uid + '.png');
  
    const snapshot = await uploadBytes(fileRef, photo);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(auth.currentUser, {photoURL});
  }

  useFocusEffect(React.useCallback(() => {
        db.collection("UserLibraryBooks").where("userID","==",auth.currentUser?.email)
        .get()
        .then((querySnapshot) => {
            const books = [];
            querySnapshot.forEach((doc) => {
                books.push(doc.data().book);
            });
            setUserBooks(books);
            setLoading(false);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
        if (auth.currentUser?.photoURL) {
            setPhotoURL(auth.currentUser.photoURL);
        }

    }, []))
    
    if (loading) {
        return <ActivityIndicator />;
    }

    const moveToDescription = (book) => {
        navigation.navigate("Description", {book : book})
    }
    
  return (
    <View style = {styles.container}>
        <View style = {styles.header} >
        <View style={styles.headerContent}>
        <Image style={styles.avatar}
                  source={{uri: photoURL}}/>
        <Button
            title = "Upload Profile picture"
            onPress={addProfilePic}
        />
        <Text style={styles.name}>Your Library</Text>
        <Text style={styles.userInfo}>{auth.currentUser?.email}</Text>
        <Text style={styles.userInfo}>Books Read: {userBooks.length}</Text>
        </View>
        </View>
        <View style = {styles.body}>
        <FlatList
        contentInset = {{top: 0, left: 0, bottom: 250, right: 0}}
        data={userBooks}
        numColumns = {2}
        renderItem = {(book) => {
            return(
                <View style = {{height: '5%'}}>
                <TouchableHighlight onPress = {() => moveToDescription(book.item)}>
                <Image style={styles.poster}
                    source={{
                    uri: book.item.imageLinks.smallThumbnail,
                    }} />
                </TouchableHighlight>
                </View>
            )
        }}
        />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    searchButton: {
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
    },
    header:{
        backgroundColor: "#DCDCDC",
    },
    headerContent:{
        padding:10,
        alignItems: 'center',
    },
    body:{
        backgroundColor: "#778899",
        height:'80%',
        alignItems:'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
      },
      userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
});

export {ProfilePage};

