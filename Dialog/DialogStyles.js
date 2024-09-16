import { StyleSheet } from "react-native";
import Colors  from "../Constants/Colors";

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     },
    dialogContainer: {
      width: 300,
      padding: 25,
      borderRadius: 10,
      backgroundColor: 'white',
      elevation: 5,
    },
    title: {
      fontSize: 18,
      color:Colors.success_color,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      color:Colors.success_color,
      alignItems: 'center',
      alignSelf:'center',
      width:'100%',
      textAlign:'center'
     },
    buttonContainer: {
     justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
     },
    button: {
      padding: 7,
      borderRadius: 5,
      width:'30%',
      backgroundColor: Colors.success_color,
       marginHorizontal: 5,
       alignItems: 'center',
     },
    buttonText: {
      color: 'white',
      fontSize: 14,
    },
  });
  export default styles;