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

