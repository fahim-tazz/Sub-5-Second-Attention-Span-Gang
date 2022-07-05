import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, useWindowDimensions} from "react-native";
import {LargeButton} from "../components/LargeButton";

const SearchPage = () => {
    // const styles = makestyle(useWindowDimensions().fontScale)
    const [searchTerm, setSearchTerm] = useState();

    const searchHandler = (query) => {
        setSearchTerm(query);
    }
    return (
        <View style = {styles.mainContainer}>
            <TextInput  style = {[styles.searchBar, styles.inputText]}
                        placeholder = {"Search for a book here"}
                        onChangeText = {searchHandler}
            />
            <LargeButton 
                        buttonName = {"Search"} 
                        onPress = {() => console.log(searchTerm)} //Pass to Google Books API
                        style = {styles.searchButton}
                    />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        backgroundColor: "#dbb49c",
        flexDirection: "column",
        flex: 1
    },
    searchBar: {
        backgroundColor: "#ebebeb",
        flex: 0.1,
        width: "80%",
        borderWidth: 1.5,
        paddingLeft: "4%",
        borderColor: "black",
        borderRadius: 70,
        marginTop: "50%",
    },
    inputText: {
        fontSize: 19
    },
    searchButton: {
        flex: 0.07,
    }
});

export {SearchPage};