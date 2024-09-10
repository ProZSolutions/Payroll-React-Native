import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,ActivityIndicator ,TouchableOpacity,Alert} from 'react-native';
 import axios from 'axios';
//import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



//font 
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons'; // For icons

 
 import ConColors from '../Constants/Colors';
 import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../Common_Components/HeaderComponent';
import CommonStyle from '../Constants/CommonStyle';
import StringComponent from '../Constants/StringComponent';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NetInfo from '@react-native-community/netinfo';
import APINameComponents from '../Constants/APINameComponents';

 const LoginScreen = () => {
  //variabl declaration
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [deviceId, setDeviceId] = useState('');

  //variable declaration

  // default call function
  useEffect(() => {
    // Get the unique device ID
    setDeviceId("8bdad70785414480");
  }, []);
  // default call function



  const checkNetworkStatus = () => {
    NetInfo.fetch().then(state => {
      setIsOnline(state.isConnected);
    });
  };

  //login functionality

  const handleLogin = () => {
    console.log("api_url"," called");
    checkNetworkStatus();

    if (!isOnline) {
       Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
      return;
    }

    if (username.trim() === '') {
    
      Alert.alert('Warning', 'Enter Username');
    } else if (password.trim() === '') {
      Alert.alert('Warning', 'Enter Password');
    } else {
      // Proceed with login
      setLoading(true);
      async(username,password,deviceId,versionName);

      
      // Add login logic here
    }
  };
  //login functionality
  const login = async (username, password, deviceId, versionName) => {
    try{
        setLoading(true);
        const api = StringComponent.APIURL+APINameComponents.login;
        console.log("api_url"," url "+api+" usernae "+username+
          " pass "+password+" device id "+deviceId+" version "+StringComponent.VersionCode
        );

        const response = await axios.post(apiUrl, {
          username:username,
          password:password,
          device_id: deviceId,
          version_name: StringComponent.VersionCode,
        });
        
        if (response.status === 200) {
          setLoading(false);
          console.log("api_url","response "+response.data);
          const { loginInfo, token_type, bearer_token } = response.data;
          if (loginInfo) {
            const { employee_No, name, role, role_Name } = loginInfo;
    
            if (employee_No) {
              await AsyncStorage.setItem('AdminEmpNo', employee_No);
            }
            if (name) {
              await AsyncStorage.setItem('AdminName', name);
            }
            if (role.length > 0) {
              await AsyncStorage.setItem('AdminRole', role.join('@'));
            }
            if (role_Name.length > 0) {
              await AsyncStorage.setItem('AdminRoleName', role_Name.join('@'));
            }
          }    
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('token', `${token_type} ${bearer_token}`);
          
          // Show success message (you need to implement this part in your UI)
          console.log('Logged In Successfully');
          
          // Navigate to Dashboard (you need to implement navigation)
          // For example, using React Navigation:
          // navigation.navigate('DashboardNew');
    
        }  
          
        else{
          setLoading(false);
          Alert.alert("Error",response.data.status);
        }




    }catch(error){
      if(error.response){
          Alert.alert('Error',error.response.data); 
      }else{
          Alert.alert('Error',error.message);
      }
    }
    
    
  }





  

  //toggle button
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };
  // toggle button

  const handleBackPress = () => { 
    // Handle the back button press
  };


  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader    title="Login"
        onBackPress={handleBackPress}/>
      <SafeAreaView style={[CommonStyle.container, ]}>
      <View  >
      <Text style={[CommonStyle.title,{marginTop:50}]}>Login</Text>
      <Text style={CommonStyle.versionCode}>Version Code : {StringComponent.VersionCode}</Text>

      <View style={CommonStyle.inputContainer}>
        <Image source={require('../assets/emp-icon.png')} style={CommonStyle.icon} />
        <TextInput
        onChangeText={setUsername}
          value={username}
          style={CommonStyle.input}
          placeholder="Emp ID"
          placeholderTextColor="#000" // Use a color similar to your black
        />
      </View>

      <View style={CommonStyle.inputContainer}>
        <View style={CommonStyle.passwordContainer}>
          <Image source={require('../assets/password.png')} style={CommonStyle.icon} />
          <TextInput
          onChangeText={setPassword}
          value={password}
            style={CommonStyle.input}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#000" // Use a color similar to your black
          />
          <TouchableOpacity onPress={togglePasswordVisibility}  >
            <Image 
            source={isPasswordVisible ? require('../assets/eye_show.png') : require('../assets/password_hide.png')}
             style={[CommonStyle.icon,{marginRight:10,tintColor:ConColors.n_org}]} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={CommonStyle.forgotPassword}>Forgot Password?</Text>


      {loading && (
        <ActivityIndicator
        size="large"
        color={ConColors.n_blue} // Use the color for the loader
        style={CommonStyle.loader}
      />
      )}
      
      <TouchableOpacity style={[CommonStyle.button,{marginTop:40}]} onPress={handleLogin}  >
        <Ionicons name="checkmark" size={20} color={ConColors.n_green} style={CommonStyle.buttonIcon} />
        <Text style={CommonStyle.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>

       </SafeAreaView>


     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor:ConColors.n_blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text :{
    color:ConColors.white
  }
});

export default LoginScreen;