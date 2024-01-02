import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { validateEmptyField } from "./ValidationLogic";
import { initialPitData } from "../Models/PitModel";
import { loadTeams, saveMatchCount, loadMatchCount } from "./TeamLogic";
import { initialMatchData } from "../Models/MatchModel";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const SaveMatchData = async (newMatchData, TeamNumber, matchCount) => {
  try {
    // Load existing teams from AsyncStorage
    const teamsJson = await AsyncStorage.getItem("teams");
    const teams = teamsJson ? JSON.parse(teamsJson) : [];
    // const currentMatchCount = await loadMatchCount();
    // Find the target team based on TeamNumber
    const targetTeamIndex = teams.findIndex(
      (team) =>
        team.teamNumber == TeamNumber ||
        team.teamNumber.toString() == TeamNumber
    );

    const matchDataKey = `MatchData${matchCount}`;
    return new Promise((resolve, reject) => {
      if (targetTeamIndex !== -1) {
        // Team with the same number already exists
        Alert.alert(
          "Save Match",
          "Once saved, the data for this match cannot be changed. Are you sure you want to save?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => resolve(false), // Resolve with false if Cancel is pressed
            },
            {
              text: "Save",
              onPress: async () => {
                // Update the target team with the new pit data under the specified match data key
                teams[targetTeamIndex][matchDataKey] = newMatchData;

                // Save the updated teams to AsyncStorage
                await AsyncStorage.setItem("teams", JSON.stringify(teams));
                await saveMatchCount(TeamNumber, matchCount);

                // Notify the user that data has been saved
                alert("Saved!");

                // Resolve with true if Save is pressed
                resolve(true);
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // ... (existing code)

        // Notify the user that data has been saved
        alert("Data saved to AsyncStorage");

        // Resolve with true after saving data
        resolve(true);
      }
    });
  } catch (error) {
    console.error("Error saving pit data:", error);
    throw error;
  }
};

export const loadMatchData = async (currentTeamNumber, MatchNumber) => {
  try {
    // Load existing teams
    const teams = await loadTeams();

    // Find the team with the specified team number
    const targetTeam = teams.find(
      (team) =>
        team.teamNumber == currentTeamNumber ||
        team.teamNumber.toString() == currentTeamNumber
    );

    if (targetTeam) {
      const matchDataKey = `MatchData${MatchNumber}`;

      // Return the match data for the specified match number; otherwise, return initialMatchData
      return targetTeam[matchDataKey] || initialMatchData;
    } else {
      // If the team is not found, return initialMatchData
      return initialMatchData;
    }
  } catch (error) {
    // Handle errors (e.g., AsyncStorage is not available)
    console.error("Error loading match data:", error);

    // Return the initialMatchData in case of an error
    return initialMatchData;
  }
};

export const saveMatchScanned = async (TeamNumber, MatchNumber) => {
  try {
    const teamsJson = await AsyncStorage.getItem("teams");
    const teams = teamsJson ? JSON.parse(teamsJson) : [];
    const matchDataKey = `MatchData${MatchNumber}`;
    const targetTeamIndex = teams.findIndex(
      (team) =>
        team.teamNumber == TeamNumber || team.teamNumber.toString() == TeamNumber
    );

    if (targetTeamIndex !== -1) {
      teams[targetTeamIndex][matchDataKey].gotScanned = true;
      await AsyncStorage.setItem("teams", JSON.stringify(teams));
    } else {
      console.log("Team not found");
    }
  } catch (error) {
    console.error("Error saving match scanned status:", error);
  }
};

export const isMatchScanned = async (teamNumber, matchNumber) => {
  try {
    const teamsJson = await AsyncStorage.getItem("teams");
    const teams = teamsJson ? JSON.parse(teamsJson) : [];
    const matchDataKey = `MatchData${matchNumber}`;

    const targetTeam = teams.find(
      (team) =>
        team.teamNumber == teamNumber || team.teamNumber.toString() == teamNumber
    );

    if (targetTeam) {
      return !!targetTeam[matchDataKey]?.gotScanned;
    } else {
      console.log("Team not found");
      return false;
    }
  } catch (error) {
    console.error("Error checking if match is scanned:", error);
    return false;
  }
};
