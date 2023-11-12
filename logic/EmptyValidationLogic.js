import { Alert } from "react-native";


// validate if the given value is empty or not, will return a bool
export function validateField(fieldName, fieldValue) {
  try {
    if (!fieldValue || fieldValue.trim() === '') {
      throw new Error(`${fieldName} cannot be empty`);
    }
    return false; // Validation passed
  } catch (validationError) {
    Alert.alert('Missing Data', validationError.message);
    return true; // Validation failed
  }
}
