import React from "react";
import {View, Text, TouchableHighlight, StyleSheet} from "react-native";

// import {themeColor} from "../../App.js";

const LargeButton = (props) => {
    return (
        <TouchableHighlight 
            
            onPress = {props.onPress}  
            style = {styles.buttonContainer}
            activeOpacity = {0.4}
            underlayColor = {"#bfa28f"}
        >
            <Text style = {styles.buttonText}>
                {props.buttonName}
            </Text>
        </TouchableHighlight> 
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderWidth: 0.3,
        borderRadius: 1000,
        height: "15%",
        width: "60%",
        marginTop: "6%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e0d5ce",
      
    },
    buttonText: {
        fontSize: 23,
        fontWeight: "500",
    },
})
export default LargeButton;