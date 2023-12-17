import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { validateEmptyField } from './ValidationLogic';
import { initialPitData } from '../Models/PitModel';
import { loadTeams } from './TeamLogic';
// save the pit data to Async, will verify if the input is empty
export const savePitData = async (newPitData, TeamNumber) => {
  try {
    // Load existing teams from AsyncStorage
    const teamsJson = await AsyncStorage.getItem('teams');
    const teams = teamsJson ? JSON.parse(teamsJson) : [];

    // Find the target team based on TeamNumber
    const targetTeamIndex = teams.findIndex(team => team.teamNumber == TeamNumber || team.teamNumber.toString() == TeamNumber);
    
    if (teams[targetTeamIndex].pitData !== undefined) {
      // Team with the same number already exists
      Alert.alert(
        'Data Exists',
        'Do you want to replace existing data?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Replace',
            onPress: async () => {
              // Update the target team with the new pit data
              teams[targetTeamIndex].pitData = newPitData;

              // Save the updated teams to AsyncStorage
              await AsyncStorage.setItem('teams', JSON.stringify(teams));

              // Notify the user that data has been saved
              alert('Data replaced in AsyncStorage');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // Add a new team since it doesn't exist
      teams[targetTeamIndex].pitData = newPitData;

      // Save the updated teams to AsyncStorage
      await AsyncStorage.setItem('teams', JSON.stringify(teams));

      // Notify the user that data has been saved
      alert('Data replaced in AsyncStorage');
    }
  } catch (error) {
    console.error('Error saving pit data:', error);
    throw error;
  }
};



export const loadPitData = async (currentTeamNumber) => {
  try {
    // Load existing teams
    const teams = await loadTeams();
    
    // Find the team with the specified team number
    const targetTeam = teams.find(team => team.teamNumber == currentTeamNumber || team.teamNumber.toString() == currentTeamNumber);
    //console.log(targetTeam);

    // If the team is found, return its pit data; otherwise, return initialPitData
    return targetTeam ? targetTeam.pitData || initialPitData : initialPitData;
  } catch (error) {
    // Handle errors (e.g., AsyncStorage is not available)
    console.error('Error loading pit data:', error);

    // Return the initialPitData in case of an error
    return null;
  }
};
