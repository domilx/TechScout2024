import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateNewTeam } from "./ValidationLogic";
import GalileoJSON from "../Models/Galileo.json";
import ArchimedesJSON from "../Models/Archimedes.json";
import { Alert } from "react-native";

export const saveTeam = async (teamNumber) => {
  try {
    const teams = await loadTeams();

    if (teams.length === 0) {
      if (!GalileoJSON.teams.includes(Number(teamNumber)) && !ArchimedesJSON.teams.includes(Number(teamNumber))) {
        Alert.alert('Team is not in the either division');
        }
      else {
      const numericTeamNumber = + teamNumber;
  ''
      const id = Date.now().toString();
      const newTeam = { id, teamNumber: numericTeamNumber };
  
      teams.push(newTeam);
      teams.sort((a, b) => a.teamNumber - b.teamNumber);
  
      await AsyncStorage.setItem("teams", JSON.stringify(teams));
      }
    } else {
      if (await validateNewTeam(teamNumber, teams)) {
        console.warn("Team already exists. Aborting.");
        return;
      }

      for (const team of teams) {
        if (GalileoJSON.teams.includes(Number(team.teamNumber))){
          if (!GalileoJSON.teams.includes(Number(teamNumber))) {        
            Alert.alert('New Team is not in Galileo');
            break;
        } else {
          const numericTeamNumber = + teamNumber;
          const id = Date.now().toString();
          const newTeam = { id, teamNumber: numericTeamNumber };
      
          teams.push(newTeam);
          teams.sort((a, b) => a.teamNumber - b.teamNumber);
      
          await AsyncStorage.setItem("teams", JSON.stringify(teams));
          break;
        }
          
      }
        else if (ArchimedesJSON.teams.includes(Number(team.teamNumber))){
          if (!ArchimedesJSON.teams.includes(Number(teamNumber))) {
            Alert.alert('New Team is not in Archimedes');
            break;
        }
        else {
          const numericTeamNumber = + teamNumber;
          const id = Date.now().toString();
          const newTeam = { id, teamNumber: numericTeamNumber };
      
          teams.push(newTeam);
          teams.sort((a, b) => a.teamNumber - b.teamNumber);
      
          await AsyncStorage.setItem("teams", JSON.stringify(teams));
          break;
        }}
        else {
          console.warn("Initial team is not in the JSON file. Aborting.");
          break;
      }
    }      
   

    }
    
    
  } catch (error) {
    console.error("Error saving team:", error);
    throw error;
  }
};

export const loadTeams = async () => {  try {
    const teamsJSON = await AsyncStorage.getItem("teams");
    const teams = teamsJSON ? JSON.parse(teamsJSON) : [];
    teams.sort((a, b) => a.teamNumber - b.teamNumber);
    return teams;
  } catch (error) {
    console.error("Error loading teams:", error);
    return [];
  }
};
export async function removeTeam(name) {
  try {
    const teams = await loadTeams();
    const newTeams = teams.filter((team) => team.teamNumber !== name);
    await AsyncStorage.setItem("teams", JSON.stringify(newTeams));
  } catch (error) {
    console.error("Error removing team:", error);
  }
}

export const editTeam = async (teamNumberToEdit, newTeamNumber) => {
  try {
    const teams = await loadTeams();
    const updatedTeams = teams.map((team) =>
      team.teamNumber === teamNumberToEdit
        ? { ...team, teamNumber: newTeamNumber }
        : team
    );

    await AsyncStorage.setItem("teams", JSON.stringify(updatedTeams));
  } catch (error) {
    console.error("Error editing team:", error);
  }
};

export const loadTeamData = async (teamNumber) => {
  try {
    const teams = await loadTeams();
    const team = teams.find((t) => t.teamNumber === teamNumber);
    return team;
  } catch (error) {
    console.error("Error loading team:", error);
    throw error;
  }
};

export const saveMatchCount = async (TeamNumber) => {
  const teamsJson = await AsyncStorage.getItem("teams");
  const teams = teamsJson ? JSON.parse(teamsJson) : [];

  const targetTeamIndex = teams.findIndex(
    (team) =>
      team.teamNumber == TeamNumber || team.teamNumber.toString() == TeamNumber
  );

  if (targetTeamIndex !== -1) {
    if ("matchNumber" in teams[targetTeamIndex]) {
      teams[targetTeamIndex].matchNumber += 1;
    } else {
      teams[targetTeamIndex].matchNumber = 1;
    }

    // Save the updated teams to AsyncStorage
    await AsyncStorage.setItem("teams", JSON.stringify(teams));

    //console.log('Match count saved: ' + await loadMatchCount(TeamNumber));
  } else {
    console.log("Team not found");
  }
};

export async function loadMatchCount(teamNumber) {
  try {
    // Retrieve data from AsyncStorage
    const team = await loadTeamData(teamNumber);
    if (team.matchNumber == null) {
      return 0;
    }
    return team.matchNumber;
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error);
    return null; // or handle accordingly based on your app's error handling
  }
}
