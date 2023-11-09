import React from 'react';
import { StyleSheet, Text } from 'react-native';
import StackNavigator from './screens/StackNavigator';

const App = () => {
  return (
    <StackNavigator>      
      <Text style={styles.credit}>made by domi & noril</Text>
    </StackNavigator>
    
  );
};

styles = StyleSheet.create({
  credit: {
    marginTop: 5,
    color: 'grey',
    textAlign: 'center',
  }
})
export default App;
