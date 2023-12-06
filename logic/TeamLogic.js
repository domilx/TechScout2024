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

export const saveMatchCount = async (TeamNumber) => {
  const teamsJson = await AsyncStorage.getItem('teams');
  const teams = teamsJson ? JSON.parse(teamsJson) : [];

  const targetTeamIndex = teams.findIndex(team => team.teamNumber == TeamNumber || team.teamNumber.toString() == TeamNumber);

  
  if (targetTeamIndex !== -1) {
    if ('matchNumber' in teams[targetTeamIndex]) {
      teams[targetTeamIndex].matchNumber += 1;
    } else {
      teams[targetTeamIndex].matchNumber = 1;
    }

    // Save the updated teams to AsyncStorage
    await AsyncStorage.setItem('teams', JSON.stringify(teams));
    
    //console.log('Match count saved: ' + await loadMatchCount(TeamNumber));
  } else {
    console.log('Team not found');
  }
};



export const loadMatchCount = async (teamNumber) => {
  const teamsJson = await AsyncStorage.getItem('teams');
  const teams = teamsJson ? JSON.parse(teamsJson) : [];

  // Find the target team based on teamNumber
  const targetTeam = teams.find(team => team.teamNumber == teamNumber || team.teamNumber.toString() == teamNumber);

  // Check if the team is found
  if (targetTeam) {
    // Check if the matchNumber property exists, return it if true, otherwise return 0
    return targetTeam.matchNumber || 0;
  } else {
    // Team not found
    return 0;
  }
};

