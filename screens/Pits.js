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
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { savePitData } from "../logic/PitLogic";
import {
  initialPitData,
  DriveBaseType,
  DriveBaseMotor,
  DriverExperience,
  Stability,
} from "../Models/PitModel";
import { DropDownSelector, ToggleSwitch, InputField, SaveButton } from "../assets/ReusableStuff";
import { loadPitData } from "../logic/PitLogic";
import { validateEmptyField } from "../logic/ValidationLogic";


function Pits({ route }) {
  const { currentTeamNumber } = route.params;
  const [newPitData, setNewPitData] = useState(initialPitData);

  useEffect(() => {
    const loadPitDataOnMount = async () => {
      const loadedPitData = await loadPitData(currentTeamNumber);
      setNewPitData(loadedPitData);
      setField("TeamNb", currentTeamNumber)
      if (loadedPitData === null) {
        setNewPitData(initialPitData);
      }
      
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

  // // Save function
  // const handleSavePitData = async () => {
  //   console.log(newPitData.RobWidth)

  //   await savePitData(newPitData, currentTeamNumber);
  // };

  const handleSavePitData = async () => {
    try {
      const validationFields = [
        { field: "Robot Scout", value: newPitData.RobScout },
        { field: "Team Name", value: newPitData.RobTeamNm },
        { field: "Robot Weight", value: newPitData.RobWtlbs},
        { field: "Robot Width", value: newPitData.RobWidth},
        { field: "Robot Lenght", value: newPitData.RobLength},
      ];
  
      const validationResults = await Promise.all(
        validationFields.map(async ({ field, value }) => {
          return { field, ...await validateEmptyField(field, value) };
        })
      );
  
      const failedValidation = validationResults.find(result => !result.isValid);
  
      if (failedValidation) {
        alert(failedValidation.errorMessage);
      } else {
        // If all validations pass, save pit data
        await savePitData(newPitData, currentTeamNumber);
      }
    } catch (validationFailed) {
      console.error(validationFailed);
    }
  };
  
  

  const handleScroll = () => {
    Keyboard.dismiss();
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
    { key: "Has Autonomy?", value: newPitData.RobQuest1 },
    { key: "RobQuest1", value: newPitData.RobQuest2 },
    { key: "RobQuest2", value: newPitData.RobQuest3 },
    { key: "RobQuest4", value: newPitData.RobQuest4 },
    { key: "RobQuest5", value: newPitData.RobQuest5 },
    { key: "RobQuest6", value: newPitData.RobQuest6 },
    { key: "RobQuest7", value: newPitData.RobQuest7 },
    { key: "RobQuest8", value: newPitData.RobQuest8 },
    { key: "RobQuest9", value: newPitData.RobQuest9 },
    { key: "RobQuest11", value: newPitData.RobQuest11 },
    { key: "RobQuest10", value: newPitData.RobQuest10 },
    { key: "RobQuest13", value: newPitData.RobQuest13 },
    { key: "RobQuest12", value: newPitData.RobQuest12 },
    { key: "RobQuest14", value: newPitData.RobQuest14},
    { key: "RobQuest15", value: newPitData.RobQuest15 },
    { key: "Comments", value: newPitData.RobComm1 },
    // Add more data items as needed
  ];
  

  return (
   <View  style={styles.container} onStartShouldSetResponderCapture={handleScroll}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90} // Adjust this offset as needed

      >
    <FlatList
    style={styles.container}
    data={data}
    keyExtractor={(item) => item.key}
    renderItem={({ item }) => (
      <View >
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
        {item.key.startsWith("RobQuest") && (
          <ToggleSwitch
            label={item.key}
            value={newPitData[item.key]}
            onToggle={(newValue) => setBooleanField(item.key, newValue)}
          />
        )}
        {item.key === "Comments" && (
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
      <SaveButton save={handleSavePitData} />
      
    )}
  />
  </KeyboardAvoidingView>
  </View>
   ) }  
   

   const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      alignItems: "center",
      marginVertical: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    saveButton: {
      backgroundColor: "#F6EB14",
      borderRadius: 10,
      padding: 15,
      alignItems: "center",
    },
  });

export default Pits;
