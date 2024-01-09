import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { loadTeams, saveMatchCount } from "./TeamLogic";
import { initialMatchData } from "../Models/MatchModel";

export const SaveMatchData = async (newMatchData, TeamNumber, matchCount) => {
  try {
    const teamsJson = await AsyncStorage.getItem("teams");
    const teams = teamsJson ? JSON.parse(teamsJson) : [];

    const targetTeamIndex = teams.findIndex(
      (team) =>
        team.teamNumber == TeamNumber ||
        team.teamNumber.toString() == TeamNumber
    );

    const matchDataKey = `MatchData${matchCount}`;
    return new Promise((resolve, reject) => {
      if (targetTeamIndex !== -1) {
        Alert.alert(
          "Save Match",
          "Once saved, the data for this match cannot be changed. Are you sure you want to save?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => resolve(false),
            },
            {
              text: "Save",
              onPress: async () => {
                teams[targetTeamIndex][matchDataKey] = newMatchData;

                await AsyncStorage.setItem("teams", JSON.stringify(teams));
                await saveMatchCount(TeamNumber, matchCount);

                alert("Saved!");

                resolve(true);
              },
            },
          ],
          { cancelable: false }
        );
      } else {

        alert("Data saved to AsyncStorage");

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
    const teams = await loadTeams();

    const targetTeam = teams.find(
      (team) =>
        team.teamNumber == currentTeamNumber ||
        team.teamNumber.toString() == currentTeamNumber
    );

    if (targetTeam) {
      const matchDataKey = `MatchData${MatchNumber}`;

      return targetTeam[matchDataKey] || initialMatchData;
    } else {
      return initialMatchData;
    }
  } catch (error) {
    console.error("Error loading match data:", error);

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
