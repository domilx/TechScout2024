import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, Button, TextInput, Animated  } from "react-native";
import {
  TouchableOpacity,
  Swipeable
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { saveTeam, loadTeams, removeTeam } from "../logic/StorageLogic";
import Dialog from "react-native-dialog";
const TeamScreen = ({ route }) => {
  const navigation = useNavigation();
  const [teams, setTeams] = useState([]);
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
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
    navigation.navigate("teamScreen", {
      teamNumber: team,
      otherParam: "may use later",
    });
  };

  const Placeholder = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>Welcome to Scout!</Text>
        <Text style={styles.boldText}>Add a team to get started!</Text>
      </View>
    );
  };

  function handleDeleteTeam(teamId) {
    return(
      Alert.alert(
        "Delete Team",
        "Are you sure you want to delete this team?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              await removeTeam(teamId);
              reloadTeams();
            },
          },
        ],
        { cancelable: false }
      )
    );
  }

  return (
    <View style={styles.container}>
      {teams.length === 0 ? <Placeholder /> : null}
      {teams.map((team) => (
        <Swipeable
          key={team.id}
          renderRightActions={(progress, dragX) => {
            const scale = dragX.interpolate({
              inputRange: [-80, 0],
              outputRange: [1, 0],
              extrapolate: "clamp",
            });

            fadeIn(); // Call fadeIn to trigger the fade-in animation

            return (
              <Animated.View
                style={[
                  styles.deleteButtonContainer,
                  { transform: [{ scale }], opacity: fadeAnim },
                ]}
              >
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTeam('2')}
                >
                  <Text style={styles.deleteButtonText}>Settings</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        >
          <TouchableOpacity onPress={() => navigateToTeam(team.teamNumber)}>
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
        </Swipeable>
      ))}
      <FloatingButton />
      <AddTeamDialog />
    </View>
  );

  function AddTeamDialog() {
    const [input, setInput] = useState("");
    const handleCloseDialog =  async () => {
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
    width: '95%',
    backgroundColor: "#F6EB14",
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
  deleteButton: {
    flex: 1,
    backgroundColor: 'red', // Customize the color as needed
    justifyContent: 'center',
    alignItems: 'center',
    width: 80, // Customize the width as needed
  },
  deleteButtonContainer: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  

});

export default TeamScreen;
