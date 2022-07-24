import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { NavigationContainer, StackActions, Group} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { auth } from "./firebase"

import { LandingPage} from "./pages/LandingPage";
import { LoginPage} from './pages/LoginPage';
import { SearchPage } from "./pages/SearchPage";
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { DescriptionPage } from './pages/DescriptionPage';
import { ForgotPassword } from './pages/ForgotPassword';



const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerLeft: () => (
            <Button
              onPress={handleSignOut}
              title="Sign out"
              color="red"
            />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name = "Login" component = {LoginPage} options = {navOptions.loginPage}/>
          <Stack.Screen name = "ForgotPassword" component = {ForgotPassword} options = {navOptions.loginPage}/>
          <Stack.Screen name = "MyTabs" component= {MyTabs} options = {navOptions.profilePage}/>
          <Stack.Screen name = "Signup" component = {SignupPage} options = {navOptions.signupPage}/>
          <Stack.Screen name = "Description" component = {DescriptionPage} options = {navOptions.descriptionPage}/>
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
  },
  signupPage: {
    headerShown: false,
  },
  profilePage: {
    headerShown: false,
  },
  searchPage: {
    headerShown: true,
  },
  descriptionPage: {
    headerShown: true,
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
