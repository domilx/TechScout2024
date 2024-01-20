import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import TeamScreen from "./Teams";
import { TouchableOpacity, View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";

const Stack = createNativeStackNavigator();

const Help = ({ onHelpPress }) => (
  <TouchableOpacity style={styles.help} onPress={onHelpPress}>
    <Icon
      name={"information-circle-outline"}
      color={"#F6EB14"}
      size={32}
    />
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
 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Teams">
        <Stack.Screen
          name="Teams"
          component={TeamScreen}
          options={({ }) => ({
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTintColor: "#F6EB14",
            headerRight: () => (
              <Help
                onHelpPress={() => {
                  onSettingPressed();
                }}
              />
            ),
          })}
        />

        <Stack.Screen
          name="Scouting"
          component={TabNavigator}
          initialParams={{ teamNumber: "" }}
          options={{
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTintColor: "#F6EB14",
            headerRight: () => (
              <Help
                onHelpPress={() => {
                  onSettingPressed();
                }}
              />
            ),
          }}
        />
      </Stack.Navigator>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        swipeDirection={["down"]}
        style={styles.modalit}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
      >
        <View style={styles.content}>
          <Text style={styles.tittleText}>Help</Text>
          <Text style={styles.contentTitle}>
            &#x2022; Add a team by tapping the plus button
          </Text>
          <Text style={styles.contentTitle}>
            &#x2022; Hold a team button to enter edit mode
          </Text>
          <Text style={styles.contentTitle}>
            &#x2022; Dont forget to tick the "Was Scanned"
          </Text>
          <Button onPress={closeModal} title="Close" />
        </View>
      </Modal>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  modalit: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  tittleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 12,
  },
  help: {
    width: 32,
  },
});
