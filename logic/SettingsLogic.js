import AsyncStorage from "@react-native-async-storage/async-storage";

export async function clearTeamsStorage() {
    try {
      await AsyncStorage.removeItem('teams');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

export async function clearModelsStorage () {
    try {
      await AsyncStorage.removeItem('pitModels');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };