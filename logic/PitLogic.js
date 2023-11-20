import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Vibration } from 'react-native';
import { validateEmptyField } from './ValidationLogic';
import { initialPitData } from '../Models/PitModel';
import { loadTeams } from './TeamLogic';
// save the pit data to Async, will verify if the input is empty
export const savePitData1 = async (newPitData) => {
  try {

    // Validation for empty data points
    /*if (
      validateEmptyField('Team Name', newPitData.teamName) ||
      validateEmptyField('Robot Length', newPitData.RobotLength) ||
      validateEmptyField('Robot Width', newPitData.RobotWidth) ||
      validateEmptyField('Robot Weight', newPitData.RobotWeight) ||
      validateEmptyField('Robot Drive Type', newPitData.DriveType) ||
      validateEmptyField('Robot Drive Motors', newPitData.DriveMotors) ||
      validateEmptyField('Driver Experience', newPitData.DriverExperience)
    ) {
      return; // break the save function
    }*/
    

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


export const savePitData = async (data, currentTeamNumber) => {
  try {
    // Load existing teams
    const teams = await loadTeams();

    // Find the index of the team with the specified team number
    const targetTeamIndex = teams.findIndex(team => team.teamNumber === currentTeamNumber);

    if (targetTeamIndex === -1) {
      console.warn('Team not found. Aborting pit data save.');
      return false;
    }

    // Create a copy of the target team to avoid mutating the original array
    const updatedTeam = { ...teams[targetTeamIndex], pitData: data };

    // Update the team within the array
    const updatedTeams = [...teams];
    updatedTeams[targetTeamIndex] = updatedTeam;

    // Save the updated teams array
    await AsyncStorage.setItem('teams', JSON.stringify(updatedTeams));
    console.log(await loadTeams(currentTeamNumber));
    // Return true to indicate success
    return true;
  } catch (error) {
    // Handle errors (e.g., AsyncStorage is not available, storage quota exceeded)
    console.error('Error saving pit data:', error);

    // Return false to indicate failure
    return false;
  }
};


// Assuming this function is in the same file or imported where the PitModel and enums are defined

export const loadPitData = async (currentTeamNumber) => {
  try {
    // Load existing teams
    const teams = await loadTeams();

    // Find the team with the specified team number
    const targetTeam = teams.find(team => team.teamNumber === currentTeamNumber);

    // If the team is found, return its pit data; otherwise, return initialPitData
    return targetTeam ? targetTeam.pitData || initialPitData : initialPitData;
  } catch (error) {
    // Handle errors (e.g., AsyncStorage is not available)
    console.error('Error loading pit data:', error);

    // Return the initialPitData in case of an error
    return initialPitData;
  }
};
