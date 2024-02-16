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
  
      const teamsJson = await AsyncStorage.getItem('teams');
      const teams = teamsJson ? JSON.parse(teamsJson) : [];
  
    
      const targetTeamIndex = teams.findIndex(team => team.teamNumber == teamNumber || team.teamNumber.toString() == teamNumber);
  
      if (targetTeamIndex !== -1) {
      
        delete teams[targetTeamIndex].pitData;
        for (let i = 0; teams[targetTeamIndex].hasOwnProperty(`MatchData${i}`); i++) {
          delete teams[targetTeamIndex][`MatchData${i}`];
        }
        delete teams[targetTeamIndex].matchNumber;
       
       
        await AsyncStorage.setItem('teams', JSON.stringify(teams));
  
       
      } else {
        
        alert(`Team with number ${teamNumber} not found`);
      }
    } catch (error) {
      console.error('Error removing pit data:', error);
      throw error;
    }
  };