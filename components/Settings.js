import React, { useState, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import TeamScreen from "./Teams";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { clearStorage } from "../logic/StorageLogic";
const Stack = createStackNavigator();

const Settings = async () => {
    const onSettingPressed = async () => {
  
      await clearStorage();
     
      alert("Storage cleared and teams removed");
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
    export default Settings;
