import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Switch,
  Platform,
} from "react-native";
import { savePitData } from "../logic/PitLogic";
import {
  initialPitData,
  DriveBaseType,
  DriveBaseMotor,
  DriverExperience,
  Stability,
} from "../Models/PitModel";
import { Dropdown } from "react-native-element-dropdown";
import { loadPitData } from "../logic/PitLogic";

// Define the InputField component
export const InputField = ({
  label,
  value,
  onChange,
  keyboardType = "default",
  maxLength = null,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  </View>
);

// Define the ToggleSwitch component
export const ToggleSwitch = ({ label, onToggle, value }) => (
  <View style={styles.switchContainer}>
    <Text>{label}</Text>
    <Switch
      trackColor={{ false: "gray", true: "green" }}
      thumbColor={value ? "white" : "white"}
      onValueChange={onToggle}
      value={value}
    />
  </View>
);

// Define the DropDownSelector component
export const DropDownSelector = ({ label, items, value, setValue }) => {
  return (
    <View style={styles.subViews}>
      <Text style={styles.text}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        zIndex={5000}
      />
    </View>
  );
};

export const SaveButton = ({save}) => {
    return (
        <TouchableOpacity onPress={save}>
        <View style={styles.saveButton}>
          <Text style={styles.text}>Save Data</Text>
        </View>
      </TouchableOpacity>
    );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingVertical: 20,
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: "#F0F0F0",
      padding: 10,
    },
    headerContainer: {
      alignItems: "center",
      marginVertical: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    dropdown: {
      margin: 16,
      height: 50,
      width: 300,
      backgroundColor: "white",
      borderRadius: 12,
      padding: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    label: {
      flex: 1,    },
    input: {
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      padding: 10,
      flex: 1,
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginVertical: 10,
      borderRadius: 10,
      padding: 10,
    },
    subViews: {
      width: "100%",
      alignItems: "center",
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: "#F0F0F0",
      padding: 10,
    },
    saveButton: {
      backgroundColor: "#F6EB14",
      borderRadius: 10,
      padding: 15,
      alignItems: "center",
    },
  });
  