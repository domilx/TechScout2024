import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { validateEmptyField } from './ValidationLogic';
import { initialPitData } from '../Models/PitModel';
import { loadTeams } from './TeamLogic';
import { initialMatchData } from '../Models/MatchModel';

export const SaveMatchData = async (newMatchData, TeamNumber, MatchNumber) => {
  try {
    // Load existing teams from AsyncStorage
    const teamsJson = await AsyncStorage.getItem('teams');
    const teams = teamsJson ? JSON.parse(teamsJson) : [];

    // Find the target team based on TeamNumber
    const targetTeamIndex = teams.findIndex(team => team.teamNumber == TeamNumber || team.teamNumber.toString() == TeamNumber);

    const matchDataKey = `MatchData${MatchNumber}`;

    if (targetTeamIndex !== -1) {
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
              // Update the target team with the new pit data under the specified match data key
              teams[targetTeamIndex][matchDataKey] = newMatchData;

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
      const newTeam = {
        teamNumber: TeamNumber,
      };
      newTeam[matchDataKey] = newMatchData;

      teams.push(newTeam);

      // Save the updated teams to AsyncStorage
      await AsyncStorage.setItem('teams', JSON.stringify(teams));

      // Notify the user that data has been saved
      alert('Data saved to AsyncStorage');
    }
  } catch (error) {
    console.error('Error saving pit data:', error);
    throw error;
  }
};


export const loadMatchData = async (currentTeamNumber, MatchNumber) => {
  try {
    // Load existing teams
    const teams = await loadTeams();

    // Find the team with the specified team number
    const targetTeam = teams.find(team => team.teamNumber == currentTeamNumber || team.teamNumber.toString() == currentTeamNumber);

    if (targetTeam) {
      const matchDataKey = `MatchData${MatchNumber}`;

      // Return the match data for the specified match number; otherwise, return initialMatchData
      return targetTeam[matchDataKey] || initialMatchData;
    } else {
      // If the team is not found, return initialMatchData
      return initialMatchData;
    }
  } catch (error) {
    // Handle errors (e.g., AsyncStorage is not available)
    console.error('Error loading match data:', error);

    // Return the initialMatchData in case of an error
    return initialMatchData;
  }
};



