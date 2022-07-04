import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { NavigationContainer, StackActions, Group} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import { LandingPage} from "./pages/LandingPage";
import { LoginPage} from './pages/LoginPage';
import { SearchPage } from "./pages/SearchPage";



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name = "Search" component = {SearchPage} options = {navOptions.landingPage}/>
          <Stack.Screen name = "Login" component = {LoginPage} options = {navOptions.loginPage}/>
          <Stack.Screen name = "Landing" component = {LandingPage} options = {navOptions.landingPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navOptions = {
  landingPage: {
    headerShown: false,
  },
  loginPage: {
    headerShown: false,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
