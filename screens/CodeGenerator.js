import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function CodeGenerator() {
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



  const refreshData = () => {
    loadPitData();
  };
  

  return (
    <View>
      <Button title="Refresh Data" onPress={refreshData} />

    
    <ScrollView>
      <Text>---------------------------------</Text>
      <Text>{JSON.stringify(pitModels, null, 2)}</Text>
      <Text>---------------------------------</Text>
    </ScrollView>

      {/* <FlatList
        data={pitModels}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Team Number: {item.teamNumber}</Text>
            <Text>Team Name: {item.teamName}</Text>
            <Text>Robot width: {item.RobotWidth}</Text>
            <Text>Robot Lenght: {item.RobotLength}</Text>
            <Text>Robot Weight: {item.RobotWeight}</Text>
            <Text>Robot drive type: {item.DriveType}</Text>
            <Text>Robot motor type: {item.DriveMotors}</Text>
            <Text>Scout notes: {item.ScoutNotes}</Text>
            <Text>Able to do first game piece: {item.GamePiece1.toString()}</Text>
            <Text>Able to do second game piece: {item.GamePiece2.toString()}</Text>
            <Text>AutoObjective 1: {item.AutoObj1.toString()}</Text>
            <Text>AutoObjective 2: {item.AutoObj2.toString()}</Text>
            <Text>---------------------------------</Text>
          </View>
        )}
      /> */}
    </View>
  );
}

export default CodeGenerator;
