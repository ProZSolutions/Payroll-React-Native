import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View ,Dimensions ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 
import archi from './assets/icon.png';
import prozLogo from './assets/icon.png';
import { ImageBackground } from 'react-native';
import SplashScreen from './MainComponets/SplashScreen ';
import LoginScreen from './MainComponets/LoginScreen';
import DashboardNewScreen from './MainComponets/DashboardNewScreen';

 

const Stack = createStackNavigator();


 export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="DashboardNewScreen" component={DashboardNewScreen}  options={{ headerShown: false }}/>
     </Stack.Navigator>
  </NavigationContainer>

  );
}


 
