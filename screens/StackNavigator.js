import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import HomeScreen from "./Home";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

const Settings = () => {
  const onSettingPressed = () => {
    alert('Settings icon clicked');
  };

  return (
    <TouchableOpacity onPress={onSettingPressed}>
      <Icon
      name={'cog-outline'}
      color={'#F6EB14'}
      size={32}
      style={{marginRight: 12}}
      />
    </TouchableOpacity>
  );
};

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Teams">
        <Stack.Screen
          name="Teams"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTintColor: "#F6EB14",
            headerRight: () => <Settings/>
          }}
        />
        <Stack.Screen
          name="3990"
          component={TabNavigator}
          options={{
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTintColor: "#F6EB14",
            headerRight: () => <Settings/>}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
