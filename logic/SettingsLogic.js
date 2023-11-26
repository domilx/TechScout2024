import AsyncStorage from "@react-native-async-storage/async-storage";

export async function clearTeamsStorage() {
    try {
      await AsyncStorage.removeItem('teams');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };


  export const clearModelsStorage = async (teamNumber) => {
    try {
      // Load existing teams from AsyncStorage
      const teamsJson = await AsyncStorage.getItem('teams');
      const teams = teamsJson ? JSON.parse(teamsJson) : [];
  
      // Find the target team based on TeamNumber
      const targetTeamIndex = teams.findIndex(team => team.teamNumber == teamNumber || team.teamNumber.toString() == teamNumber);
  
      if (targetTeamIndex !== -1) {
        // Remove pitData from the target team
        delete teams[targetTeamIndex].pitData;
  
        // Save the updated teams to AsyncStorage
        await AsyncStorage.setItem('teams', JSON.stringify(teams));
  
        // Notify the user that pitData has been removed
        alert('Pit data removed from AsyncStorage');
      } else {
        // Handle the case where the target team is not found
        alert(`Team with number ${teamNumber} not found`);
      }
    } catch (error) {
      console.error('Error removing pit data:', error);
      throw error;
    }
  };