import React from 'react';
import { View, Text,  StatusBar, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';


function Pits({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FF' }}>
        <Text>Pit fields....</Text>
        <Button
          title="SAVE"
         
        />
      </View>
    );
  }

export default Pits;