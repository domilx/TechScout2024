import React, { useState, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import TeamScreen from "./Teams";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { clearStorage } from "../logic/TeamLogic";
const Stack = createStackNavigator();

const StackNavigator = (route) => {
  const Settings = () => {
    const onSettingPressed = async () => {
      alert("alert ");
      await clearStorage();
    };

    return (
      <TouchableOpacity onPress={onSettingPressed}>
        <Icon
          name={"cog-outline"}
          color={"#F6EB14"}
          size={32}
          style={{ marginRight: 12 }}
        />
      </TouchableOpacity>
    );
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
                onSettingsPress={async () => {
                  await clearStorage();
                  alert("Storage cleared and teams removed");
                  // Here, you can trigger a screen refresh or pass a parameter to TeamScreen
                  navigation.setParams({ teamsCleared: true }); // Set the parameter
                }}
              />
            ),
          })}
        />

        <Stack.Screen
          name="teamScreen"
          component={TabNavigator}
          initialParams={{ teamNumber: '33' }}
          options={{
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTintColor: "#F6EB14",
            headerRight: () => <Settings />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
