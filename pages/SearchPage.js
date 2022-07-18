import React, {useState} from "react";
import {View, Image, FlatList, ScrollView, Text, Button, StyleSheet, TextInput, useWindowDimensions} from "react-native";
import {LargeButton} from "../components/LargeButton";
import axios from 'axios';

const SearchPage = () => {
    // const styles = makestyle(useWindowDimensions().fontScale)

    let books = [];

    const [searchedBooks, setSearchedBooks] = useState([]);

    const [searchTerm, setSearchTerm] = useState();

    const searchHandler = (query) => {
        setSearchTerm(query);
    }

    const searchBooks = async text => {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${text}&startIndex=0&maxResults=10`
        )
        .catch(err => console.err(err));
        //res.data.items.map(item => console.log(item.volumeInfo.title)); // test to see output
        books = res.data.items.map(item => item.volumeInfo);
        setSearchedBooks(books);
    };


    return (
        <View style = {styles.mainContainer}>
            <TextInput  style = {[styles.searchBar, styles.inputText]}
                        placeholder = {"Search for a book here"}
                        onChangeText = {searchHandler}
            />
            <LargeButton 
                        buttonName = {"Search"} 
                        onPress = {() => searchBooks(searchTerm)} //Pass to Google Books API
                        style = {styles.searchButton}
                    />
            <FlatList
                data = {searchedBooks}
                numColumns = {2}
                renderItem = {(book) => {
                    console.log(book.item.title);
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
    mainContainer: {
        alignItems: "center",
        backgroundColor: "#dbb49c",
        flexDirection: "column",
        flex: 1
    },
    searchContainer: {
        alignItems: "left",
        backgroundColor: "white",
        flexDirection: "column",
        padding: 10
    },
    searchBar: {
        backgroundColor: "#ebebeb",
        height: "10%",
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
        height: "5%"
    },
    poster:{
        width: 150,
        height: 215,
        margin:5
    }
});

export {SearchPage};