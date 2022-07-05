import React from "react";
import {View, Text, StyleSheet, TextInput, useWindowDimensions} from "react-native";
import {LargeButton} from "../components/LargeButton";

const SearchPage = () => {
    // const styles = makestyle(useWindowDimensions().fontScale)
    return (
        <View style = {styles.mainContainer}>
            <TextInput  style = {[styles.searchBar, styles.inputText]}
                        placeholder = {"Search for a book here"}
            />
            <LargeButton buttonName = {"Search"} onPress = {() => console.log("Searched")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        backgroundColor: "#dbb49c",
        flex: 1
    },
    searchBar: {
        backgroundColor: "#ebebeb",
        flex: 0.12,
        width: "80%",
        borderWidth: 1.5,
        paddingLeft: "4%",
        borderColor: "black",
        borderRadius: 70,
        marginTop: "50%",
    },
    inputText: {
        fontSize: 19
    }
});

export {SearchPage};