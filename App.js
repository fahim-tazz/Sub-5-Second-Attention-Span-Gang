import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { NavigationContainer, StackActions,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <View style={styles.container}>
          <Image
            source = {require("./assets/landingPage6.png")}
            style = {styles.landingBackground}
          />
          <Text style = {styles.landingSubtitle}>
            your reading journey starts here
          </Text>
          <StatusBar style="auto"/>
        </View>
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  }
});
