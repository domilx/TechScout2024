import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

function CodeGenerator({ route }) {
  let logoFromFile = require('../assets/logo.png');

  const { currentTeamNumber } = route.params;
  const [pitModels, setPitModels] = useState([]);

  useEffect(() => {
    loadPitData();
  }, []);

  const loadPitData = async () => {
    try {
      const existingPitModels = await AsyncStorage.getItem('pitModels');
      const pitModels = existingPitModels ? JSON.parse(existingPitModels) : [];
      setPitModels(pitModels);
    } catch (error) {
      console.error('Error loading Pit Data:', error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('pitModels');
      setPitModels([]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  const refreshData = () => {
    loadPitData();
  };
  

  return (
    <View>
      {/* Clear storage will erase the whole array of team scouting*/}
      <Button title="Clear Storage" onPress={clearStorage} />
      <Button title="Refresh Data" onPress={refreshData} />
  
      <ScrollView>
        {pitModels
          .filter((pitData) => pitData.teamNumber === currentTeamNumber)
          .map((currentTeamPitData, index) => (
            <View key={index}>
              <Text>Qr Code:</Text>
              <QRCode value={JSON.stringify(currentTeamPitData, null,2)} size={300} logo={logoFromFile} logoSize={75}/>
              <Text>{JSON.stringify(currentTeamPitData, null,2)}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
  
}

export default CodeGenerator;
