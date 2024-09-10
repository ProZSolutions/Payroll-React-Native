import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View ,Dimensions ,Image} from 'react-native';
 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { ImageBackground } from 'react-native';
import SplashScreen from './Main_Components/SplashScreen';
 import LoginScreen from './Main_Components/LoginScreen'; 
 import Dashboard from './Main_Components/Dashboard';

 

const Stack = createStackNavigator();


 export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Dashboard" component={Dashboard}  options={{ headerShown: false }}/>
     </Stack.Navigator>
  </NavigationContainer>

  );
}


 
