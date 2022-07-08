import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState }  from "react";
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Button, useWindowDimensions} from "react-native";
import {LargeButton} from "../components/LargeButton";
import { auth } from "../firebase";

const ProfilePage = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
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
    }
});

export {ProfilePage};

