import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
 import commonHeader from '../CommonComponents/HeaderComponent';
const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <commonHeader />
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor:colors.n_blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text :{
    color:colors.white
  }
});

export default LoginScreen;