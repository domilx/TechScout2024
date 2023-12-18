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
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.dropdownSelectedText}
        inputSearchStyle={styles.dropdownInputSearch}
        iconStyle={styles.dropdownIcon}
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

export const SaveButton = ({ save }) => {
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
    flexDirection: "column",
    alignItems: "flex-start", // Align input and label to the start of the container
    marginVertical: 10,
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
  dropdownIcon: {
    color: "#333", // Customize dropdown icon color
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
    backgroundColor: "#F6EB14",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
});
