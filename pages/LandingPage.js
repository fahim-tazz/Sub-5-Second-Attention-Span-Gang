import React from "react";
import {Text, View, StyleSheet, Image, StatusBar,} from "react-native";

const LandingPage = (props) => {
    return ( 
        <View style={styles.container}>
            <Image
                source = {require("../assets/landingPage6.png")}
            />
            <Text style = {styles.landingSubtitle}>
                your reading journey starts here
            </Text>
            <StatusBar barStyle = {"light-content"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },    
    landingSubtitle: {
        fontSize: 19.5,
        fontFamily: "Cochin",
        fontWeight: "bold",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        paddingTop: "22%",
    },
})

export {LandingPage};