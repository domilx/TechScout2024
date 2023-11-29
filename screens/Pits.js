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
const InputField = ({
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
const ToggleSwitch = ({ label, onToggle, value }) => (
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
const DropDownSelector = ({ label, items, value, setValue }) => {
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

function Pits({ route }) {
  const { currentTeamNumber } = route.params;
  const [newPitData, setNewPitData] = useState(initialPitData);

  useEffect(() => {
    const loadPitDataOnMount = async () => {
      const loadedPitData = await loadPitData(currentTeamNumber);
      setNewPitData(loadedPitData);
    };

    loadPitDataOnMount();
  }, [currentTeamNumber]);

  // Setter for text and number fields
  const setField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setNumericField = (field, value) => {
    // Check if the value is an empty string
    const numericValue = value === "" ? "" : parseInt(value, 10);

    setNewPitData((prevData) => ({
      ...prevData,
      [field]: numericValue,
    }));
  };

  // Setter for enum fields
  const setEnumField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Setter for boolean fields
  const setBooleanField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Save function
  const handleSavePitData = async () => {
    await savePitData(newPitData, currentTeamNumber);
  };

  // Dropdown selector for DriveBaseType enum
  const driveBaseTypeItems = Object.keys(DriveBaseType).map((key) => ({
    label: DriveBaseType[key],
    value: DriveBaseType[key],
  }));

  const driveBaseMotorItems = Object.keys(DriveBaseMotor).map((key) => ({
    label: DriveBaseMotor[key],
    value: DriveBaseMotor[key],
  }));

  const driveBaseExperienceItems = Object.keys(DriverExperience).map((key) => ({
    label: DriverExperience[key],
    value: DriverExperience[key],
  }));

  const stabilityItems = Object.keys(Stability).map((key) => ({
    label: Stability[key],
    value: Stability[key],
  }));

  // ... other components ...

  // FlatList data
  const data = [
    { key: "Robot Scout", value: newPitData.RobScout },
    { key: "Team Name", value: newPitData.RobTeamNm },
    { key: "Robot Weight (lbs)", value: newPitData.RobWtlbs.toString() },
    { key: "Robot Width", value: newPitData.RobWidth.toString() },
    { key: "Robot Length", value: newPitData.RobLength.toString() },
    { key: "Drivebase Type", value: newPitData.RobDrive },
    { key: "Drivebase Motor", value: newPitData.RobMotor },
    { key: "Drivebase Experience", value: newPitData.RobDriveExp },
    { key: "Stability", value: newPitData.RobStble },
    { key: "Has Autonomy?", value: newPitData.RobQuest1.toString() },
    { key: "RobQuest1", value: newPitData.RobQuest2.toString() },
    { key: "RobQuest2", value: newPitData.RobQuest3.toString() },
    { key: "RobQuest4", value: newPitData.RobQuest4.toString() },
    { key: "RobQuest5", value: newPitData.RobQuest5.toString() },
    { key: "RobQuest6", value: newPitData.RobQuest6.toString() },
    { key: "RobQuest7", value: newPitData.RobQuest7.toString() },
    { key: "RobQuest8", value: newPitData.RobQuest8.toString() },
    { key: "RobQuest9", value: newPitData.RobQuest9.toString() },
    { key: "RobQuest10", value: newPitData.RobQuest10.toString() },
    { key: "RobQuest11", value: newPitData.RobQuest11.toString() },
    { key: "RobQuest12", value: newPitData.RobQuest12.toString() },
    { key: "RobQuest13", value: newPitData.RobQuest13.toString() },
    { key: "RobQuest14", value: newPitData.RobQuest14.toString() },
    { key: "RobQuest15", value: newPitData.RobQuest15.toString() },
    { key: "Communication", value: newPitData.RobComm1 },
    // Add more data items as needed
  ];
  

  return (
    <FlatList
    style={styles.container}
    data={data}
    keyExtractor={(item) => item.key}
    renderItem={({ item }) => (
      <View>
        {item.key === "Robot Scout" && (
          <InputField
            label={item.key}
            value={item.value}
            onChange={(text) => setField("RobScout", text)}
          />
        )}
        {item.key === "Team Name" && (
          <InputField
            label={item.key}
            value={item.value}
            onChange={(text) => setField("RobTeamNm", text)}
          />
        )}
        {item.key === "Robot Weight (lbs)" && (
          <InputField
            label={item.key}
            value={item.value.toString()}
            onChange={(text) => setNumericField("RobWtlbs", text)}
            keyboardType="numeric"
          />
        )}
        {item.key === "Drivebase Type" && (
          <DropDownSelector
            label={item.key}
            items={driveBaseTypeItems}
            value={item.value}
            setValue={(value) => setEnumField("RobDrive", value)}
          />
        )}
        {item.key === "Drivebase Motor" && (
          <DropDownSelector
            label={item.key}
            items={driveBaseMotorItems}
            value={item.value}
            setValue={(value) => setEnumField("RobMotor", value)}
          />
        )}
        {item.key === "Drivebase Experience" && (
          <DropDownSelector
            label={item.key}
            items={driveBaseExperienceItems}
            value={item.value}
            setValue={(value) => setEnumField("RobDriveExp", value)}
          />
        )}
        {item.key === "Robot Width" && (
          <InputField
            label={item.key}
            value={item.value.toString()}
            onChange={(text) => setNumericField("RobWidth", text)}
            keyboardType="numeric"
          />
        )}
        {item.key === "Robot Length" && (
          <InputField
            label={item.key}
            value={item.value.toString()}
            onChange={(text) => setNumericField("RobLength", text)}
            keyboardType="numeric"
          />
        )}
        {item.key === "Stability" && (
          <DropDownSelector
            label={item.key}
            items={stabilityItems}
            value={item.value}
            setValue={(value) => setEnumField("RobStble", value)}
          />
        )}
        {item.key === "RobQuest1" && (
          <ToggleSwitch
            label={item.key}
            value={newPitData.RobQuest1}
            onToggle={(newValue) => setBooleanField("RobQuest1", newValue)}
          />
        )}
        {item.key.startsWith("RobQuest") && (
          <ToggleSwitch
            label={item.key}
            value={newPitData[item.key]}
            onToggle={(newValue) => setBooleanField(item.key, newValue)}
          />
        )}
        {item.key === "Communication" && (
          <InputField
            label={item.key}
            value={item.value}
            onChange={(text) => setField("RobComm1", text)}
          />
        )}
        {/* Add conditions and components for other properties as needed */}
      </View>
    )}
    ListHeaderComponent={() => (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Pit Scouting for Team {currentTeamNumber}
        </Text>
        {/* Add other components outside of the list header */}
      </View>
    )}
    ListFooterComponent={() => (
      <TouchableOpacity onPress={handleSavePitData}>
        <View style={styles.saveButton}>
          <Text style={styles.text}>Save Data</Text>
        </View>
      </TouchableOpacity>
    )}
  />
   ) }  

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
    width: 100,
    marginRight: 10,
  },
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
  },
  subViews: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  dropDownContainer: {
    width: "90%",
    height: 40,
  },
  placeholderStyle: {
    color: "grey",
  },
  modalContentContainerStyle: {
    backgroundColor: "white",
  },
  saveButton: {
    backgroundColor: "#F6EB14",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },

  // DropDown picker Prop styles
  dropDownContainer: {
    width: "95%",
    backgroundColor: "lightgray",
    borderWidth: 2,
    borderColor: "black",
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
    }),
    margin: 5,
    zIndex: 5000,
  },

  modalContentContainerStyle: {
    backgroundColor: "white",
  },

  modalTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  selectedItemContainerStyle: {
    backgroundColor: "#5edb76",
  },
  selectedItemLabelStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  placeholderStyle: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
   inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10, // Make the container round
    backgroundColor: "#F0F0F0", // Add a background color
    padding: 10, // Add padding for better spacing
  },

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
    borderRadius: 10, // Make the container round
    padding: 10, // Add padding for better spacing
  },

  subViews: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10, // Make the container round
    backgroundColor: "#F0F0F0", // Add a background color
    padding: 10, // Add padding for better spacing
  },

  saveButton: {
    backgroundColor: "#F6EB14",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
});

export default Pits;
