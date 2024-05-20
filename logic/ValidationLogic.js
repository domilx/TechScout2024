import { Alert } from "react-native";


// validate given fields
// validate if the given value is empty or not, will return a bool and an error message
export async function validateEmptyField(fieldName, fieldValue) {
  try {
    // will check any type of input --> if the value is null, or of value 0
    if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
      return { isValid: false, errorMessage: `${fieldName} cannot be empty` };
    // for number types
    } else if (typeof fieldValue === 'number' && fieldValue === 0) {
      return { isValid: false, errorMessage: `${fieldName} cannot be 0` };
    }
    return { isValid: true }; // validation passed
  } catch (validationError) {
    console.error(validationError);
    return { isValid: false, errorMessage: 'Validation error occurred' };
  }
}


export async function validateNewTeam(teamNumber, teamList) {
  try {
    if (!teamNumber || teamNumber.trim() === '') {
      throw new Error('Team Number cannot be empty');
    }
   
    for (const team of teamList) {
      if (team.teamNumber == teamNumber) {
        throw new Error('Team Number already exists');
       
      }
    }

    return false; // Validation passed
  } catch (validationError) {
    Alert.alert('Error Saving Team', validationError.message);
    return true; // Validation failed
  }
}