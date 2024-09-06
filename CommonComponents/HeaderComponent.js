import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
 

 import n_leftarrow from '../assets/n_leftarrow.svg';
 import n_notification from '../assets/n_leftarrow.svg';
 import n_profile from '../assets/n_leftarrow.svg';



const AppHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.linearLayout}>
      <n_leftarrow width={24} height={24} style={styles.icon} />

        <Text style={styles.headerTitle}>Admin</Text>
        <View style={styles.rightContainer}>
  
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0000FF', // Replace with your color value
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50, // Adjust the height as needed
    paddingHorizontal: 15,
  },
  linearLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backPress: {
    width: 25,
    height: 25,
    tintColor: '#FFFFFF', // Replace with your color value
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold', // Make sure to add the Roboto-Bold font to your project
    color: '#FFFFFF', // Replace with your color value
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 17,
  },
});

export default AppHeader;
