import {View, Text, TextInput, StyleSheet} from "react-native";


const LoginPage = () => {
    return (
        <View style = {styles.loginContainer}>
            <Text style = {styles.loginTitle}>Log in to readit</Text>
            <TextInput 
                style = {styles.usernameInputBox}
                placeholder = {"   Enter your username"}
            />
            <TextInput 
                style = {styles.passwordInputBox}
                placeholder = {"   *******"}    
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        alignItems: "center",
        marginTop: "75%"
    },
    usernameInputBox: {
        height: 50,
        width: 300,
        borderWidth: 1,
    }, 
    passwordInputBox: {
        height: 50,
        width: 300,
        borderWidth: 1,
        marginTop: "7%",
        // backgroundColor: "dodgerblue"
    },
    loginTitle: {
        // backgroundColor: "dodgerblue",
        fontSize: 30,
        paddingBottom: 30
    }
});
export {LoginPage};