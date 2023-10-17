import React from 'react';
import { View, Text,  StatusBar, Button } from 'react-native';

function CodeGenerator() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FF' }}>
        <Text>iCode Generator Tab</Text>
        <Button
          title="Generate QR"
         
        />
      </View>
    );
  }

export default CodeGenerator;
