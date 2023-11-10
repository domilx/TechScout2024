import AsyncStorage from '@react-native-async-storage/async-storage';

// save pit data to Async Storage  
export const savePitData = async (newPitData) => {
    try {
      const passedData = newPitData
      const existingPitModels = await AsyncStorage.getItem('pitModels');
      const pitModels = existingPitModels ? JSON.parse(existingPitModels) : [];

      // Add the new Pit Model instance to the array
      pitModels.push(passedData);
      // Retourner les nouveaux models dans le AsyncStorage
      await AsyncStorage.setItem('pitModels', JSON.stringify(pitModels));
      
      alert('Data saved to AsyncStorage');
      Vibration.vibrate()
    } catch (error) {
      console.error('Error saving Pit Data:', error);
    }
  };

