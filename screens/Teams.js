import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { saveTeam, loadTeams } from "../logic/TeamLogic";
import Dialog from "react-native-dialog";
import Modal from "react-native-modal";
import { clearTeamsStorage, clearModelsStorage  } from "../logic/SettingsLogic";

const TeamScreen = ({ route, navigation }) => {
  const [teams, setTeams] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  

  const closeModal = () => {
    setModalVisible(false);
  };

  const clearTeamsButton = async () => {
    await clearTeamsStorage();
    alert("Storage cleared and teams removed");
  };

  const clearModelsButton = async () => {
    await clearModelsStorage();
    alert("Storage cleared and models removed");
  };
  useEffect(() => {
    loadTeams().then((loadedTeams) => {
      console.log("Teams loaded:", loadedTeams);
      setTeams(loadedTeams);
    });
  }, [route.params?.teamsCleared]);

  const reloadTeams = async () => {
    try {
      const loadedTeams = await loadTeams();
      setTeams(loadedTeams);
    } catch (error) {
      console.error("Error loading teams:", error);
    }
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const navigateToTeam = (team) => {
    navigation.navigate("teamScreen", { teamNumber: team });
  };

  const Placeholder = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>Welcome to Scout!</Text>
        <Text style={styles.boldText}>Add a team to get started!</Text>
      </View>
    );
  };

  function AddTeamDialog() {
    const [input, setInput] = useState("");
    const handleCloseDialog = async () => {
      if (input.trim() !== "" && !isNaN(input)) {
        setVisible(false);
        await saveTeam(input);
        setInput("");
        reloadTeams();
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
            maxLength={4}
          ></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Add" onPress={handleCloseDialog} />
        </Dialog.Container>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {teams.length === 0 ? <Placeholder /> : null}
      {teams.map((team) => (
    <TouchableOpacity onPress={() => navigateToTeam(team.teamNumber)} onLongPress={() => {
      setModalVisible(!isModalVisible);

  }}
  delayLongPress={1000}>
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
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modalScreen}
      >
        <View style={styles.tittleContainer}>
          <Text style={styles.tittleText}>Settings</Text>
        </View>
        <View style={styles.modalContainer}>
          <Text>Options</Text>
          <TouchableOpacity onPress={clearModelsButton} style={styles.buttons}>
            <Text style={styles.buttonsText}>Clear Models</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearTeamsButton} style={styles.buttons}>
            <Text style={styles.buttonsText}>Clear Teams</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.returnContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
            <Icon
              name={"arrow-back-outline"}
              color={"#1E1E1E"}
              size={30}
              style={styles.iconStyle}
            />
            <Text style={styles.buttonsText}>Close Settings</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );

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
  popup: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: "95%",
    backgroundColor: "#F6EB14",
    
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 30,
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
  modalScreen: {
    backgroundColor: 'white',
    margin: 0,
  },

  modalContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: 'center',
  },

  tittleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    
  },

  returnContainer: {
    height: 200,
    width: '100%',
    paddingBottom: 100,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  closeModal: {
    flexDirection: "row",
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6EB14",
  },

  iconStyle: {
    marginRight: 10,
  },

  buttons: {
    marginTop: 20,
    width: 200,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6EB14",
  },

  buttonsText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  tittleText: {
    fontSize: 42,
    fontWeight: "bold",
  },
});

export default TeamScreen;
