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

 const LoginScreen = ({ navigation }) => {
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
      login(username,password,deviceId,StringComponent.VersionCode);

      
      // Add login logic here
    }
  };
  //login functionality
  const login = async (username, password, deviceId, versionName) => {
    try{
        setLoading(true);
        const apiUrl = StringComponent.APIURL+APINameComponents.login;
        console.log("api_url"," url "+apiUrl+" usernae "+username+
          " pass "+password+" device id "+deviceId+" version "+StringComponent.VersionCode
        );


        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            device_id: deviceId,
            version_no: StringComponent.VersionCode,
          }),
        });
        const jsonResponse = await response.json();
        console.log("api_url"," json ",jsonResponse);
        if (response?.ok) {
           if(jsonResponse?.status==='success'){
              if(jsonResponse?.emp_details){
                const { emp_details, token_type, bearer_token,emp_no } = jsonResponse;
                console.log("api_url"," emp ",emp_details," no ",emp_details.Employee_No);
                    if (emp_details) {
               
                      if (emp_details?.Employee_No) {
                        await AsyncStorage.setItem('AdminEmpNo', emp_details.Employee_No);
                      }
                      if (emp_details?.Name) {
                        await AsyncStorage.setItem('AdminName', emp_details.Name);
                      }
                      if (emp_details?.Role) {
                        await AsyncStorage.setItem('AdminRole', emp_details.Role.join('@'));
                      }
                      if (emp_details?.Role_Name ) {
                        await AsyncStorage.setItem('AdminRoleName', emp_details.Role_Name.join('@'));
                      }
                    }  
                    
                    
                    
                    await AsyncStorage.setItem('username', username);
                    await AsyncStorage.setItem('token', `${token_type} ${bearer_token}`);
                    Alert.alert('Success'," Login Success");
                    navigation.navigate('Dashboard');
                    
              }
           }else{
             Alert.alert('Error',error.message);
           }
            
        } else {
          console.log("api_url","response nukk ");
          throw new Error(jsonResponse.error || 'Something went wrong');
        }




    }catch(error){
      if(error?.response){
          Alert.alert('Error',error.response.data); 
      }else{
          Alert.alert('Error',error.message);
      }
    }finally{
      setLoading(false);
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
  const textToUpperClass =(input)=>{
    setUsername(input.toUpperCase());
  }


  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader    title="Login"
        onBackPress={handleBackPress}/>
      <SafeAreaView style={[CommonStyle.container, ]}>
      <View  >
      <Text style={[CommonStyle.title,{marginTop:50}]}>Login</Text>
      <Text style={CommonStyle.versionCode}>Version Code : {StringComponent.VersionCode}</Text>

      <View style={CommonStyle.inputContainer}>
        <Image source={require('../assets/emp-icon.png')}   style={CommonStyle.icon} />
        <TextInput
        onChangeText={textToUpperClass}
          value={username}
          style={CommonStyle.input}
           selectionColor={ConColors.n_org}
          placeholder="Emp ID"
          placeholderTextColor={ConColors.black}// Use a color similar to your black
        />
      </View>

      <View style={CommonStyle.inputContainer}>
        <View style={CommonStyle.passwordContainer}>
          <Image source={require('../assets/password.png')}  style={CommonStyle.icon} />
          <TextInput
          selectionColor={ConColors.n_org}
          onChangeText={setPassword}
          value={password}
            style={CommonStyle.input}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={ConColors.black}  // Use a color similar to your black
          />
          <TouchableOpacity onPress={togglePasswordVisibility}  >
            <Image 
            source={isPasswordVisible ? require('../assets/eye_show.png') : require('../assets/password_hide.png')}
             style={[CommonStyle.icon,{marginRight:10,tintColor:ConColors.n_org}]}   />
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