// AsyncStorageUtils.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save data to AsyncStorage
export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Function to load data from AsyncStorage
export const loadData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};
