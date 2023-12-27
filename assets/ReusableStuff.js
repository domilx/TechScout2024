import React, { useState, useRef } from "react";
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
import * as Animatable from 'react-native-animatable'; // Import the library

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

export const ToggleSwitch = ({ label, onToggle, value }) => (
  <View style={styles.switchContainer}>
    <Text>{label}</Text>
    <Switch
      trackColor={{ false: "#333", true: "#333" }}
      thumbColor={value ? "white" : "white"}
      onValueChange={onToggle}
      value={value}
    />
  </View>
);

export const DropDownSelector = ({ label, items, value, setValue }) => {
  return (
    <View style={styles.subViews}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.dropdownSelectedText}
        containerStyle={styles.list}
        activeColor="#F0F0F0"
        data={items}
        maxHeight={200}
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

export const SaveButton = ({ save }) => {
  return (
    <TouchableOpacity onPress={save}>
      <View style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Data</Text>
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
  list:{
    backgroundColor: "#F0F0F0",
    borderRadius: '15'
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start", // Align input and label to the start of the container
    marginVertical: 0,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginHorizontal: 20,
  },
  label: {
    marginBottom: 5, // Add margin below the label
    color: "#555", // Customize label text color
  },
  input: {
    borderWidth: 1,
    borderColor: "#A0A0A0", // Customize input border color
    borderRadius: 15,
    padding: 10,
    width: "100%", // Take up the full width of the container
    fontSize: 16, // Customize input font size
    color: "#333", // Customize input text color
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
    margin: 0,
    height: 50,
    width: "100%", // Take up the full width of the container
    backgroundColor: "#F0F0F0", // Match the background color
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#A0A0A0", // Customize border color
    padding: 10,
  },
  dropdownPlaceholder: {
    color: "#A0A0A0", // Customize placeholder text color
  },
  dropdownSelectedText: {
    color: "#333", // Customize selected text color

  },
  dropdownInputSearch: {
    color: "#333", // Customize search input text color
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    marginHorizontal: 28,
    borderRadius: 15,
    padding: 10,
    borderColor: "#A0A0A0", // Set border color to black
    borderWidth: 1, // Set border width
  },
  
  subViews: {
    width: "90%",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginHorizontal: 20,

    flexDirection: "column",
    alignItems: "flex-start", // Align input and label to the start of the container
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginHorizontal: 20,
  },
  saveButton: {
    backgroundColor: "#333", // Green color for the button
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    margin: 20, // Add some margin at the top
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F6EB14", // White text color for better contrast
  },
});
