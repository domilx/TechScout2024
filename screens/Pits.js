import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { savePitData } from "../logic/PitLogic";
import {
  initialPitData,
  DriveBaseType,
  DriveBaseMotor,
  Gravity,
  HumanPlayerSpotlight,
  PickupSpots,
  ScoreSpots,
  ShootSpots,
  WellMade,
  Stability,
  Years,
} from "../Models/PitModel";
import {
  DropDownSelector,
  ToggleSwitch,
  InputField,
  SaveButton,
} from "./ReusableStuff";
import { loadPitData } from "../logic/PitLogic";
import { validateEmptyField } from "../logic/ValidationLogic";
import { RadioButtonGrid1, RadioButtonGrid } from "./RadioButtons.js";

function Pits({ route }) {
  const { currentTeamNumber } = route.params;
  const [newPitData, setNewPitData] = useState(initialPitData);

  useEffect(() => {
    const loadPitDataOnMount = async () => {
      const loadedPitData = await loadPitData(currentTeamNumber);
      setNewPitData(loadedPitData);
      setField("TeamNumber", currentTeamNumber);

      if (loadedPitData === null) {
        setNewPitData(initialPitData);
      }
    };

    loadPitDataOnMount();
  }, [currentTeamNumber]);

  const setField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setNumericField = (field, value) => {
    const numericValue = value === "" ? "" : parseInt(value, 10);

    setNewPitData((prevData) => ({
      ...prevData,
      [field]: numericValue,
    }));
  };

  const setEnumField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setBooleanField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSavePitData = async () => {
    try {
      const validationFields = [
        { field: "Team Name", value: newPitData.TeamName },
        { field: "Robot Weight (lbs)", value: newPitData.WeightLbs },
        { field: "Robot Width (in)", value: newPitData.WidthInches },
        { field: "Robot Length (in)", value: newPitData.LengthInches },
        { field: "Height (in)", value: newPitData.HeightInches },
        {
          field: "Frame Clearance (in)",
          value: newPitData.FrameClearanceInches,
        },
      ];

      const validationResults = await Promise.all(
        validationFields.map(async ({ field, value }) => {
          return { field, ...(await validateEmptyField(field, value)) };
        })
      );

      const failedValidation = validationResults.find(
        (result) => !result.isValid
      );

      if (failedValidation) {
        alert(failedValidation.errorMessage);
      } else {
        await savePitData(newPitData, currentTeamNumber);
      }
    } catch (validationFailed) {
      console.error(validationFailed);
    }
  };

  function generateEnumItems(enumObject) {
    return Object.keys(enumObject).map((key) => ({
      label: enumObject[key],
      value: enumObject[key],
    }));
  }

  const driveBaseTypeItems = generateEnumItems(DriveBaseType);
  const driveBaseMotorItems = generateEnumItems(DriveBaseMotor);
  const years = generateEnumItems(Years);
  const stabilityItems = generateEnumItems(Stability);
  const wellMadeItems = generateEnumItems(WellMade);
  const pickupSpotsItems = generateEnumItems(PickupSpots);
  const scoreSpotsItems = generateEnumItems(ScoreSpots);
  const gravityItems = generateEnumItems(Gravity);
  const shootSpotsItems = generateEnumItems(ShootSpots);
  const humanPlayerSpotlightItems = generateEnumItems(HumanPlayerSpotlight);

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  // FlatList data
  const data = [
    {
      label: "Team Name",
      key: "TeamName",
      value: newPitData.TeamName,
      type: "text",
    },
    {
      label: "Drivebase Type",
      key: "DriveBaseType",
      value: newPitData.DriveBaseType,
      type: "dropdown",
      droptype: driveBaseTypeItems,
    },
    {
      label: "Drivebase Motor",
      key: "DriveBaseMotor",
      value: newPitData.DriveBaseMotor,
      type: "dropdown",
      droptype: driveBaseMotorItems,
    },
    {
      label: "Driver Experience",
      key: "DriverExperience",
      value: newPitData.DriverExperience,
      type: "dropdown",
      droptype: years,
    },
    {
      label: "Robot Weight (lbs)",
      key: "WeightLbs",
      value: newPitData.WeightLbs.toString(),
      type: "number",
    },
    {
      label: "Robot Width (in)",
      key: "WidthInches",
      value: newPitData.WidthInches.toString(),
      type: "number",
    },
    {
      label: "Robot Length (in)",
      key: "LengthInches",
      value: newPitData.LengthInches.toString(),
      type: "number",
    },
    {
      label: "Height (in)",
      key: "HeightInches",
      value: newPitData.HeightInches.toString(),
      type: "number",
    },
    {
      label: "Frame Clearance (in)",
      key: "FrameClearanceInches",
      value: newPitData.FrameClearanceInches.toString(),
      type: "number",
    },
    {
      label: "Stability",
      key: "Stability",
      value: newPitData.Stability,
      type: "dropdown",
      droptype: stabilityItems,
    },
    {
      label: "Well Made",
      key: "WellMade",
      value: newPitData.WellMade,
      type: "dropdown",
      droptype: wellMadeItems,
    },
    {
      label: "Single Intake/Shooter",
      key: "SingleIntakeShooter",
      value: newPitData.SingleIntakeShooter,
      type: "boolean",
    },
    {
      label: "Pickup Spots",
      key: "PickupSpots",
      value: newPitData.PickupSpots,
      type: "dropdown",
      droptype: pickupSpotsItems,
    },
    {
      label: "Score Spots",
      key: "ScoreSpots",
      value: newPitData.ScoreSpots,
      type: "dropdown",
      droptype: scoreSpotsItems,
    },
    {
      label: "Center of Gravity",
      key: "CenterOfGravity",
      value: newPitData.CenterOfGravity,
      type: "dropdown",
      droptype: gravityItems,
    },
    {
      label: "Years Using Swerve",
      key: "YearsUsingSwerve",
      value: newPitData.YearsUsingSwerve,
      type: "dropdown",
      droptype: years,
    },
    {
      label: "Shoots From",
      key: "ShootsFrom",
      value: newPitData.ShootsFrom,
      type: "radio1",
      vertical: 1,
      horizontal: 4,
      titles: ["Starting Zone", "Podium", "Wing", "Center Line"],
      saveButton: "AutoExtraNotesButtons",
    },
    {
      label: "Object Recognition",
      key: "ObjectRecognition",
      value: newPitData.ObjectRecognition,
      type: "boolean",
    },
    {
      label: "Reads April Tags",
      key: "ReadAprilTags",
      value: newPitData.ReadAprilTags,
      type: "boolean",
    },
    {
      label: "Autonomous Program to Leave",
      key: "AutoProgramsToLeave",
      value: newPitData.AutoProgramsToLeave,
      type: "boolean",
    },
    {
      label: "Auto Programs for Speaker blue",
      key: "AutoProgramsForBlue",
      value: newPitData.AutoProgramsForBlue,
      type: "radio",
      vertical: 1,
      horizontal: 3,
      titles: ["Blue Left", "Blue Center", "Blue Right"],
      saveButton: "AutoProgramsForBlueButtons",
      saveButtonValue: newPitData.AutoProgramsForBlueButtons,
    },
    {
      label: "Auto Programs for Speaker red",
      key: "AutoProgramsForRed",
      value: newPitData.AutoProgramsForRed,
      type: "radio",
      vertical: 1,
      horizontal: 3,
      titles: ["Red Left", "Red Center", "Red Right"],
      saveButton: "AutoProgramsForRedButtons",
      saveButtonValue: newPitData.AutoProgramsForRedmButtons,
    },
    {
      label: "Can Get OnStage",
      key: "CanGetOnStage",
      value: newPitData.CanGetOnStage,
      type: "boolean",
    },
    {
      label: "Can Score Notes in Trap",
      key: "CanScoreNotesInTrap",
      value: newPitData.CanScoreNotesInTrap,
      type: "boolean",
    },
    {
      label: "Human Player Spotlight",
      key: "HumanPlayerSpotlight",
      value: newPitData.HumanPlayerSpotlight,
      type: "dropdown",
      droptype: humanPlayerSpotlightItems,
    },
    {
      label: "Can Cheesecake or lift robot",
      key: "CheesecakeAbility",
      value: newPitData.CheesecakeAbility,
      type: "boolean",
    },
    {
      label: "Comments",
      key: "Comments",
      value: newPitData.Comments,
      type: "text",
    },
  ];

  return (
    <View
      style={styles.container}
      onStartShouldSetResponderCapture={handleScroll}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90} // Adjust this offset as needed
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Pit Scouting for Team {currentTeamNumber}
          </Text>
        </View>
        <FlatList
          scrollEnabled={true}
          style={styles.container}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View>
              {item.type === "text" && (
                <InputField
                  label={item.label}
                  value={item.value}
                  onChange={(text) => setField(item.key, text)}
                  keyboardType="default"
                />
              )}
              {item.type === "number" && (
                <InputField
                  label={item.label}
                  value={item.value.toString()}
                  onChange={(text) => setNumericField(item.key, text)}
                  keyboardType="numeric"
                />
              )}
              {item.type === "boolean" && (
                <ToggleSwitch
                  label={item.label}
                  value={item.value}
                  onToggle={(newValue) => setBooleanField(item.key, newValue)}
                />
              )}
              {item.type === "dropdown" && (
                <DropDownSelector
                  label={item.label}
                  value={item.value}
                  items={item.droptype}
                  setValue={(text) => setEnumField(item.key, text)}
                />
              )}
              {item.type === "radio1" && (
                <RadioButtonGrid1
                  horizontalAmount={item.horizontal}
                  verticalAmount={item.vertical}
                  columnTitles={item.titles}
                  label={item.label}
                  onPress={(selectedValue) =>
                    setEnumField(item.key, selectedValue)
                  }
                  saveButtons={(selectedValue) =>
                    setField(item.saveButton, selectedValue)
                  }
                  value={newPitData.AutoExtraNotesButtons}
                />
              )}
              {item.type === "radio" && (
                <RadioButtonGrid
                  horizontalAmount={item.horizontal}
                  verticalAmount={item.vertical}
                  columnTitles={item.titles}
                  rowTitles={[""]}
                  label={item.label}
                  onPress={(selectedValue) =>
                    setEnumField(item.key, selectedValue)
                  }
                  saveButtons={(selectedValue) =>
                    setField(item.saveButton, selectedValue)
                  }
                  value={item.saveButtonValue}
                />
              )}
            </View>
          )}
        />

        <SaveButton save={handleSavePitData} />
      </KeyboardAvoidingView>
    </View>
  );
}

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
