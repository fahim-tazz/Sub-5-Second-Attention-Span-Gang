import React, { useState }  from "react";
import {View, Text, TextInput, StyleSheet, Image, Button, useWindowDimensions} from "react-native";
import {LargeButton} from "../components/LargeButton";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

// import {themeColor} from "../App.js";

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    }

    // const styles = makestyle(useWindowDimensions().fontScale)
    return (
        <View style = {styles.mainContainer}>
            <View style = {styles.loginContainer}>
                <View style = {styles.upperLoginContainer}>
                    <Text style = {styles.loginTitle}>Sign up for </Text>
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
                    onChangeText = { text => setEmail(text) }
                    value = {email}
                />
                <TextInput 
                    style = {[styles.inputBox, styles.inputPlaceholderText]}
                    placeholder = {"Enter your password"}
                    placeholderTextColor = {"#6d6d6d"}
                    secureTextEntry = {true}
                    onChangeText = { text => setPassword(text) }
                    value = {password}
                />
                
                <LargeButton 
                    buttonName = {"Sign up"}
                    onPress = {handleSignUp}
                    style = {styles.loginButton}  //Add login functionality
                />

            </View>
            <View style = {styles.bottomText}>
                <Text style = {{fontSize: 16, marginBottom: "-1%"}}>
                    Have an account?
                </Text>
                <Button
                    title = {"Login"}
                    color = {"dimgrey"}
                    onPress = { () => navigation.navigate('Login') }   //Add Login navigation
                >
                </Button>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: "#dbb49c",
        flexDirection: "column",
    },
    loginContainer: {
        alignItems: "center",
        marginTop: "60%",
        flex: 0.8,
        // borderWidth: 1,

    },
    upperLoginContainer: {
        // height: "20%",
        // flex: 0.2,
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 5,
        // marginBottom: "10%",
   },
   loginTitle: {
        height: "100%",
        fontSize: 33,
        fontWeight: "300",
        // borderWidth: 1,
        alignSelf: "center",
   },
   logo: {
        width: "27%",
        height: "100%",
        resizeMode: "contain",
        marginLeft: "-0.5%",
        // marginBottom: "2%",
        // borderWidth: 1,

    },
    inputBox: {
        // height: "13%",
        // flex: 0.3,
        width: "80%",
        borderWidth: 1.5,
        paddingLeft: "4%",
        marginTop: "3%",
        borderColor: "black",
        backgroundColor: "#ebebeb",
        borderRadius: 0,
    },

    inputPlaceholderText: {
        // fontFamily: "Didot",
        fontWeight: "500",
        fontSize: 17.5  ,
        paddingVertical: "5%"
    },
    loginButton: {
        flex: 0.2
    },
    bottomText: {
        alignItems: "center",
        flex: 0.2,
        // borderWidth: 1,
        // paddingVertical: "15%",

    }
  
});



export {SignupPage};