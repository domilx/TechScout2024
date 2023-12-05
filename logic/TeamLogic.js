import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateNewTeam } from './ValidationLogic';

export const saveTeam = async (teamNumber) => {
  try {
    const teams = await loadTeams();
    
    if (await validateNewTeam(teamNumber, teams)) {
      console.warn('Team already exists. Aborting.');
      return;
    }
    const numericTeamNumber = +teamNumber;

    const id = Date.now().toString();
    const newTeam = { id, teamNumber: numericTeamNumber };
    
    teams.push(newTeam);
    teams.sort((a, b) => a.teamNumber - b.teamNumber);

    await AsyncStorage.setItem('teams', JSON.stringify(teams));
  } catch (error) {
    console.error('Error saving team:', error);
    throw error;
  }
};


export const loadTeams = async () => {
  try {
    const teamsJSON = await AsyncStorage.getItem('teams');
    const teams = teamsJSON ? JSON.parse(teamsJSON) : [];
    teams.sort((a, b) => a.teamNumber - b.teamNumber);
    return teams;
  } catch (error) {
    console.error('Error loading teams:', error);
    return [];
  }
};
export async function removeTeam(name) {
  try {
    const teams = await loadTeams();
    const newTeams = teams.filter((team) => team.teamNumber !== name);
    await AsyncStorage.setItem('teams', JSON.stringify(newTeams));
  } catch (error) {
    console.error('Error removing team:', error);
  }
}

export const editTeam = async (teamNumberToEdit, newTeamNumber) => {
  try {
    const teams = await loadTeams();
    const updatedTeams = teams.map((team) =>
      team.teamNumber === teamNumberToEdit ? { ...team, teamNumber: newTeamNumber } : team
    );

    await AsyncStorage.setItem('teams', JSON.stringify(updatedTeams));
  } catch (error) {
    console.error('Error editing team:', error);
  }
};

export const loadTeamData = async (teamNumber) => {
  try {
    const teams = await loadTeams();
    const team = teams.find((t) => t.teamNumber === teamNumber);
    return team || null; // Return null if the team is not found
  } catch (error) {
    console.error('Error loading team:', error);
    throw error;
  }
};




export const saveCurrentMatchCount = async (teamNumber, matchNumber) => {
  try {
    // Load existing teams from AsyncStorage
    const teamsJson = await AsyncStorage.getItem('teams');
    const teams = teamsJson ? JSON.parse(teamsJson) : [];

    // Find the target team based on TeamNumber
    const targetTeamIndex = teams.findIndex(
      (team) => team.teamNumber === teamNumber
    );

    // Update the target team with the new match number
    teams[targetTeamIndex].matchNumber = matchNumber + 1;

    // Save the updated teams to AsyncStorage
    await AsyncStorage.setItem('teams', JSON.stringify(teams));

    // Notify the user that data has been saved
    console.log('Match number saved successfully');
  } catch (error) {
    console.error('Error saving match number:', error);
    throw error;
  }
};


export const loadMatchCount = async (teamNumber) => {
  try {
    // Load existing teams from AsyncStorage
    const teamsJson = await AsyncStorage.getItem('teams');
    
    if (!teamsJson) {
      // If teamsJson is null or undefined, return null (no teams stored)
      return null;
    }

    const teams = JSON.parse(teamsJson);

    if (!Array.isArray(teams)) {
      // If teams is not an array, return null (unexpected data format)
      return null;
    }

    // Filter teams based on TeamNumber
    const filteredTeams = teams.filter((team) => team.teamNumber === teamNumber);

    // Retrieve the first element of the filtered array (or null if no match)
    const targetTeam = filteredTeams.length > 0 ? filteredTeams[0] : null;

    // Return the current match number or null if the team is not found
    return targetTeam ? targetTeam.matchNumber || null : null;
  } catch (error) {
    console.error('Error getting current match number:', error);
    throw error;
  }
};

  

  

