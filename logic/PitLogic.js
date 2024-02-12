import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { initialPitData } from '../Models/PitModel';
import { loadTeams } from './TeamLogic';
export const savePitData = async (newPitData, TeamNumber) => {
  try {
    const teamsJson = await AsyncStorage.getItem('teams');
    const teams = teamsJson ? JSON.parse(teamsJson) : [];

    const targetTeamIndex = teams.findIndex(team => team.teamNumber == TeamNumber || team.teamNumber.toString() == TeamNumber);
    if (teams[targetTeamIndex].pitData !== undefined) {
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
              teams[targetTeamIndex].pitData = newPitData;

              await AsyncStorage.setItem('teams', JSON.stringify(teams));
              await savePitScanned(TeamNumber, false);
              alert('Saved!');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      teams[targetTeamIndex].pitData = newPitData;

      await AsyncStorage.setItem('teams', JSON.stringify(teams));

      alert('Saved!');
    }
  } catch (error) {
    console.error('Error saving pit data:', error);
    throw error;
  }
};



export const loadPitData = async (currentTeamNumber) => {
  try {
    const teams = await loadTeams();
    
    const targetTeam = teams.find(team => team.teamNumber == currentTeamNumber || team.teamNumber.toString() == currentTeamNumber);
    console.log('Pit Data:', targetTeam.pitData);

    return targetTeam ? targetTeam.pitData || initialPitData : initialPitData;
  } catch (error) {
    console.error('Error loading pit data:', error);

    return null;
  }
};

export const savePitScanned = async (TeamNumber, state) => {
  try {
    const teamsJson = await AsyncStorage.getItem("teams");
    const teams = teamsJson ? JSON.parse(teamsJson) : [];
    const matchDataKey = 'pitData';
    const targetTeamIndex = teams.findIndex(
      (team) =>
        team.teamNumber == TeamNumber || team.teamNumber.toString() == TeamNumber
    );

    if (targetTeamIndex !== -1) {
      teams[targetTeamIndex][matchDataKey].gotScanned = state;
      await AsyncStorage.setItem("teams", JSON.stringify(teams));

    } else {
      console.log("Team not found");
    }
  } catch (error) {
    console.error("Error saving match scanned status:", error);
  }
};

export const isPitScanned = async (teamNumber) => {
  try {
    const teamsJson = await AsyncStorage.getItem("teams");
    const teams = teamsJson ? JSON.parse(teamsJson) : [];
    const matchDataKey = `pitData`;

    const targetTeam = teams.find(
      (team) =>
        team.teamNumber == teamNumber || team.teamNumber.toString() == teamNumber
    );

    if (targetTeam) {
      return !!targetTeam[matchDataKey]?.gotScanned;
    } else {
      console.log("Team not found");
      return false;
    }
  } catch (error) {
    console.error("Error checking if match is scanned:", error);
    return false;
  }
};
