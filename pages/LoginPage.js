import {View, Text, TextInput, StyleSheet, Image} from "react-native";



const LoginPage = () => {
    return (
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
                keyboardType = {"email-address"}
                autoCapitalize = {"none"}
            />
            <TextInput 
                style = {[styles.inputBox, styles.inputPlaceholderText]}
                placeholder = {"Enter your password"}
                secureTextEntry = {true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        alignItems: "center",
        marginTop: "73%",
        height: "42%",
        // borderWidth: 1,

    },
    upperLoginContainer: {
        height: "20%",
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 1,
        marginBottom: "-3%",

   },
   loginTitle: {
       fontSize: 33,
       fontWeight: "600",
   },
   logo: {
        width: "27%",
        resizeMode: "contain",
        marginLeft: "-0.6%",
        marginBottom: "0.5%",

    },
    inputBox: {
        height: "15%",
        width: "80%",
        borderWidth: 1,
        paddingLeft: "4%",
        marginTop: "5%",
    },

    inputPlaceholderText: {
        fontFamily: "Didot",
        fontWeight: "400",
        fontSize: 16,
    },
  
});

export {LoginPage};