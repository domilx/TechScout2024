import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import TeamScreen from "./Teams";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { clearTeamsStorage, clearModelsStorage  } from "../logic/SettingsLogic";
import Modal from "react-native-modal";

const Stack = createStackNavigator();

const Settings = ({ onSettingsPress }) => (
  <TouchableOpacity onPress={onSettingsPress}>
    <Icon name={"cog-outline"} color={"#F6EB14"} size={32} style={{ marginRight: 12 }} />
  </TouchableOpacity>
);

const StackNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const onSettingPressed = async () => {
    setModalVisible(!isModalVisible);
    
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const clearTeamsButton = async() => {
    await clearTeamsStorage();
    alert("Storage cleared and teams removed");
  };

  const clearModelsButton = async() => {
    await clearModelsStorage();
    alert("Storage cleared and models removed");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Teams">
        <Stack.Screen
          name="Teams"
          component={TeamScreen}
          options={({ route, navigation }) => ({
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTintColor: "#F6EB14",
            headerRight: () => (
              <Settings
                onSettingsPress={() => {
                  onSettingPressed();
                }}
              />
            ),
          })}
        />

        <Stack.Screen
          name="teamScreen"
          component={TabNavigator}
          initialParams={{ teamNumber: "33" }}
          options={{
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTintColor: "#F6EB14",
            headerRight: () => (
              <Settings
                onSettingsPress={() => {
                  onSettingPressed();
                }}
              />
            ),
          }}
        />
      </Stack.Navigator>

      {/* settings screen */}
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={styles.modalScreen}>
        <View style={styles.modalContainer}>
          <Text style={styles.tittleText}>Settings Screen</Text>
          <TouchableOpacity onPress={clearModelsButton} style={styles.buttons}>
            <Text style={styles.buttonsText}>Clear Models</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearTeamsButton} style={styles.buttons}>
            <Text style={styles.buttonsText}>Clear Teams</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
            <Icon name={"arrow-back-outline"} color={"#1E1E1E"} size={30} style={styles.iconStyle} />
            <Text style={styles.buttonsText}>Close Settings</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </NavigationContainer>
  );
};

export default StackNavigator;


const styles = StyleSheet.create({
  modalScreen: { 
    backgroundColor: 'white', 
    margin: 0 },

  modalContainer: {
    height: 200, 
    width: '100%', 
    backgroundColor: 'white', 
    justifyContent: 'space-between', 
    alignItems: 'center' 

  },
  
  closeModal: {

    flexDirection: "row",
    marginTop: 20,
    width: 300,
    height: 50,
    borderWidth: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "left",
    backgroundColor: "#F6EB14",
  },

  iconStyle:{
    marginRight: 50,
    marginLeft: 15,
  },

  buttons: {
    marginTop: 20,
    width: 200,
    height: 50,
    borderWidth: 4,
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
  }



})