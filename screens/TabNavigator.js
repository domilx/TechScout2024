import React, {} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Matches from "./Matches";
import Pits from "./Pits";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";
import CodeGenerator from "./CodeGenerator";
import { StatusBar, StyleSheet } from "react-native";
const Tab = createBottomTabNavigator();
import { useRoute } from '@react-navigation/native';

function TabNavigator() {
  const route = useRoute();

  const { params } = route;
  const currentTeamNumber = params ? params.teamNumber : null;

  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle="white-content" />
      <Tab.Navigator
        initialRouteName="Pits"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 90,
            paddingVertical: 10,
            backgroundColor: "#1E1E1E",
          },
          tabBarActiveTintColor: "#F6EB14",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Pits"
          component={Pits}
          initialParams={{currentTeamNumber: currentTeamNumber}}
          options={{
            tabBarLabel: "Pits",
            tabBarIcon: ({ color, size, focused }) => (
              <Icon
                name={"people"}
                color={focused ? "#F6EB14" : color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Matches"
          component={Matches}
          initialParams={{currentTeamNumber: currentTeamNumber}}
          options={{
            tabBarLabel: "Matches",
            tabBarIcon: ({ color, size, focused }) => (
              <Icon
                name={"document-text"}
                color={focused ? "#F6EB14" : color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="QR"
          component={CodeGenerator}
          initialParams={{currentTeamNumber: currentTeamNumber}}
          options={{
            tabBarLabel: "QR",
            tabBarIcon: ({ color, size, focused }) => (
              <Icon2
                name={"qrcode"}
                color={focused ? "#F6EB14" : color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

export default TabNavigator