import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Vibration } from 'react-native';
import { validateField } from './ValidationLogic';

// save the pit data to Async, will verify if the input is empty
export const savePitData = async (newPitData) => {
  try {

    // Validation for empty data points
    if (
      validateField('Team Name', newPitData.teamName) ||
      validateField('Robot Length', newPitData.RobotLength) ||
      validateField('Robot Width', newPitData.RobotWidth) ||
      validateField('Robot Weight', newPitData.RobotWeight) ||
      validateField('Robot Drive Type', newPitData.DriveType) ||
      validateField('Robot Drive Motors', newPitData.DriveMotors) ||
      validateField('Driver Experience', newPitData.DriverExperience)
    ) {
      return; // break the save function
    }
    

    try {
      const existingPitModels = await AsyncStorage.getItem('pitModels');
      const pitModels = existingPitModels ? JSON.parse(existingPitModels) : [];

      const existingModelIndex = pitModels.findIndex(
        (model) => model.teamNumber === newPitData.teamNumber
      );

      if (existingModelIndex !== -1) {
        // if model with the same teamNumber exists

        // Handle replacing or rejecting data 
        Alert.alert(
          'Data Exists',
          'A model with the same teamNumber already exists. Do you want to replace it with the new data?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Replace',
              onPress: async () => {
                // Replace existing data with the new one
                pitModels[existingModelIndex] = newPitData;
                await AsyncStorage.setItem('pitModels', JSON.stringify(pitModels));
                Vibration.vibrate();
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // Add the new Pit Model instance to the array
        pitModels.push(newPitData);
        // Return the new models to AsyncStorage
        await AsyncStorage.setItem('pitModels', JSON.stringify(pitModels));
        alert('Data saved to AsyncStorage');
        Vibration.vibrate();
      }
    } catch (error) {
      console.error('Error saving Pit Data:', error);
    }
  } catch (error) {
    console.error('Error in the savePitData function:', error);
    // Handle the error, you can show an alert or log it
    Alert.alert('Error', 'An error occurred while processing the data.');
  }
};

