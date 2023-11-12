import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTeam = async (teamNumber) => {
  try {
    const teams = await loadTeams();
    const id = Date.now().toString();
    const newTeam = { id, teamNumber };
    teams.push(newTeam);
    teams.sort((a, b) => a.teamNumber - b.teamNumber);
    await AsyncStorage.setItem('teams', JSON.stringify(teams));
  } catch (error) {
    console.error('Error saving team:', error);
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
export async function removeTeam(id) {
  try {
    const teams = await loadTeams();
    const newTeams = teams.filter((team) => team.id !== id);
    await AsyncStorage.setItem('teams', JSON.stringify(newTeams));
  } catch (error) {
    console.error('Error removing team:', error);
  }
}

