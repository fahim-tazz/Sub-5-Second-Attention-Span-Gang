import React from "react";
import {View, Text, TextInput, StyleSheet, Image, ImageBackground, Button} from "react-native";
import LargeButton from "../components/LargeButton";

// import {themeColor} from "../App.js";


const LoginPage = () => {
    return (
        <View style = {{backgroundColor: "#dbb49c"}}>
            <View style = {styles.loginContainer}>
                <View style = {styles.upperLoginContainer}>
                    <Text style = {styles.loginTitle}>Log in to </Text>
                    <Image 
                        source = {require("../assets/logo_black.png")}
                        style = {styles.logo}
                    />
                </View>
                <TextInput 
                    style = {[styles.inputBox, styles.inputPlaceholderText]}
                    placeholder = {"Enter your username"}
                    placeholderTextColor = {"#6d6d6d"}
                    keyboardType = {"email-address"}
                    autoCapitalize = {"none"}
                />
                <TextInput 
                    style = {[styles.inputBox, styles.inputPlaceholderText]}
                    placeholder = {"Enter your password"}
                    placeholderTextColor = {"#6d6d6d"}
                    secureTextEntry = {true}
                />
                
                <LargeButton 
                    buttonName = {"Log in"}
                    onPress = {() => console.log("logged in")}  //Add login functionality
                />
                <Button
                    title = {"Forgot Password?"}
                    color = {"dimgrey"}
                    onPress = {() => console.log("forgot password!")}  //Add forgot password page navigation
                />

                <View style = {{marginTop: "41.5%"}}>
                    <Text style = {{fontSize: 16, marginBottom: "-1%"}}>
                        Don't have an account?
                    </Text>
                    <Button
                        title = {"Sign up"}
                        color = {"dimgrey"}
                        onPress = {() => console.log("sign up page")}   //Add signup navigation
                    >

                    </Button>
                </View>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    bgImageContainer: {
        height: "100%",
        width: "100%",
    },
    loginContainer: {
        alignItems: "center",
        marginTop: "70%",
        height: "42%",
        // borderWidth: 1,

    },
    upperLoginContainer: {
        height: "20%",
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 1,
        marginBottom: "-4%",

   },
   loginTitle: {
       fontSize: 33,
       fontWeight: "300",
    //    color: "white"
   },
   logo: {
        width: "27%",
        resizeMode: "contain",
        marginLeft: "-0.5%",
        marginBottom: "0.45%",

    },
    inputBox: {
        height: "15%",
        width: "80%",
        borderWidth: 1.5,
        paddingLeft: "4%",
        marginTop: "5%",
        borderColor: "black",
        backgroundColor: "#ebebeb",
        borderRadius: 0,
    },

    inputPlaceholderText: {
        // fontFamily: "Didot",
        fontWeight: "500",
        fontSize: 17.5,
    },
  
});

export {LoginPage};