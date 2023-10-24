import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { saveTeam, loadTeams } from "../logic/TeamLogic";
import Dialog from "react-native-dialog";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [teams, setTeams] = useState([]);
  const [visible, setVisible] = useState(false);

  const onSettingPressed = async () => {
    await clearStorage();
    setTeams([]);
    alert("Storage cleared and teams removed");
  };
  
  useEffect(() => {
    loadTeams().then((loadedTeams) => setTeams(loadedTeams));
  }, []);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const navigateToTeam = (team) => {
    navigation.navigate(team);
  };

  const Placeholder = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>Welcome to Scout!</Text>
        <Text style={styles.boldText}>Add a team to get started!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Placeholder />
      {teams.map((team) => (
        <TouchableOpacity
          key={team.id}
          onPress={() => navigateToTeam(team.teamNumber)}
        >
          <View style={styles.button}>
            <Text style={styles.boldText}>{`Team ${team.teamNumber}`}</Text>
            <Icon
              name="arrow-forward-outline"
              size={30}
              color="#1E1E1E"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      ))}
      <FloatingButton />
      <AddTeamDialog />
    </View>
  );

  function AddTeamDialog() {
    const [input, setInput] = useState("");
    const handleCloseDialog = () => {
      if (input.trim() !== "") {
        const newTeam = { id: Date.now().toString(), teamNumber: input };
        setTeams((prevTeams) => [newTeam, ...prevTeams]);
        setVisible(false);
        setInput("");
        saveTeam(input);
      }
    };
    return (
      <View style={styles.popup}>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Add a team</Dialog.Title>
          <Dialog.Description>
            Do you want to add a new team to scout?
          </Dialog.Description>

          <Dialog.Input
            onChangeText={(value) => setInput(value)}
            value={input}
            keyboardType="numeric"
            placeholder="Team Number"
            autoFocus={true}
          ></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Add" onPress={handleCloseDialog} />
        </Dialog.Container>
      </View>
    );
  }
  function FloatingButton() {
    return (
      <View style={styles.floatingButton}>
        <TouchableOpacity onPress={showDialog}>
          <Icon name="add" size={30} color="#F6EB14" />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#F0F5FF",
  },
  popup: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  icon: {
    marginLeft: 150,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 25,
    backgroundColor: "#1E1E1E",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default HomeScreen;
