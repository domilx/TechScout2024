import { Alert } from "react-native";


// validate if the given value is empty or not, will return a bool
export function validateEmptyField(fieldName, fieldValue) {
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

export function validateNewTeam(teamNumber, teamList) {
  try {
    if (!teamNumber || teamNumber.trim() === '') {
      throw new Error('Team Number cannot be empty');
    }

    if (teamList.some(item => item.teamNumber === teamNumber)) {
      throw new Error('Team Number already exists');
    }

    return false; // Validation passed
  } catch (validationError) {
    Alert.alert('Error Saving Team', validationError.message);
    return true; // Validation failed
  }
}