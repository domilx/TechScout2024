import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { SaveMatchData } from "../logic/MatchLogic.js";
import { loadMatchCount } from "../logic/TeamLogic.js";
import * as MatchModel from "../Models/MatchModel";
import RadioButtonGrid from "./RadioButtons.js";
import {
  InputField,
  ToggleSwitch,
  DropDownSelector,
  Grid,
  Counter,
} from "./ReusableStuff.js";
import Timer from "./Timer.js";
import { validateEmptyField } from "../logic/ValidationLogic.js";

function Matches({ route }) {
  const { currentTeamNumber } = route.params;
  const [newMatchData, setNewMatchData] = useState(MatchModel.initialMatchData);
  const [matchCount, setMatchCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const loadMatchDataOnMount = async () => {
      setMatchCount(await loadMatchCount(currentTeamNumber));
    };
    loadMatchDataOnMount();
    console.log(newMatchData);
  }, []);

  const setField = (field, value) => {
    setNewMatchData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setNumericField = (field, value) => {
    const numericValue = value === "" ? "" : parseInt(value, 10);

    setNewMatchData((prevData) => ({
      ...prevData,
      [field]: numericValue,
    }));
  };

  const setEnumField = (field, value) => {
    setNewMatchData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setBooleanField = (field, value) => {
    setNewMatchData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setArrayField = (key, item) => {
    setNewMatchData((prevData) => ({
      ...prevData,
      [key]: [...(prevData?.[key] ?? []), item],
    }));
  };

  const content = ({ data }) => {
    return (
      <FlatList
        scrollEnabled={false}
        style={styles.container}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View key={item.key}>
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
            {item.type === "timer" && (
              <Timer
                addCycleTime={(text) => setArrayField(item.key, text)}
                addDropPiece={() =>
                  setNumericField(
                    "TeleopDropped",
                    newMatchData.TeleopDropped + 1
                  )
                }
                addAmpPiece={() =>
                  setNumericField(
                    "TeleopAmplifier",
                    newMatchData.TeleopAmplifier + 1
                  )
                }
                addSpeakPiece={() =>
                  setNumericField(
                    "TeleopSpeaker",
                    newMatchData.TeleopSpeaker + 1
                  )
                }
                addAmpSpeakPiece={() =>
                  setNumericField(
                    "TeleopSpeakerAmplified",
                    newMatchData.TeleopSpeakerAmplified + 1
                  )
                }
              />
            )}
            {item.type === "counter" && (
              <Counter
                label={item.label}
                value={item.value}
                onToggle={() => setNumericField(item.key, item.value + 1)}
                OnNegToggle={() => setNumericField(item.key, item.value - 1)}
              />
            )}
            {item.type === "radio" && (
              <RadioButtonGrid
                horizontalAmount={item.horizontal}
                verticalAmount={item.vertical}
                columnTitles={item.titles}
                rowTitles={["", ""]}
                label={item.label}
                onPress={(boolValue, boolToChange) => setBooleanField(item.key[boolToChange], boolValue)}
                values={item.droptype}
              />
            )}
          </View>
        )}
      />
    );
  };

  async function handleSaveMatchData() {
    try {
      setCurrentStep(0);
      // on peut ajouter des fields si necessaire
      const validationFields = [
        { field: "ScoutName", value: newMatchData.ScoutName },
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
        setField("TeamNumber", currentTeamNumber);
        const saveSuccess = await SaveMatchData(
          newMatchData,
          currentTeamNumber,
          matchCount
        );

        if (saveSuccess) {
          setMatchCount(matchCount + 1);
        }
      }
    } catch (validationFailed) {
      console.error(validationFailed);
    }
  }
  function generateEnumItems(enumObject) {
    return Object.keys(enumObject).map((key) => ({
      label: enumObject[key],
      value: enumObject[key],
    }));
  }

  const PositionTypeItem = generateEnumItems(MatchModel.Position);
  const extraNotesItem = generateEnumItems(MatchModel.ExtraNotes);
  const ShootSpotsItem = generateEnumItems(MatchModel.ShootSpots);
  const EndGameOnStageItem = generateEnumItems(MatchModel.EndGameOnStage);
  const EndGameHarmonyItem = generateEnumItems(MatchModel.EndGameHarmony);
  const TrapTypeItem = generateEnumItems(MatchModel.Trap);
  const RankingPointsItem = generateEnumItems(MatchModel.RankingPoints);
  const DefenseLevelItem = generateEnumItems(MatchModel.DefenseLevel);
  const TippinessItem = generateEnumItems(MatchModel.Tippiness);
  const SpeedItem = generateEnumItems(MatchModel.Speed);
  const AwareTypeItem = generateEnumItems(MatchModel.Awareness);
  const EndGameTrapITem = generateEnumItems(MatchModel.TrapEndGame);
  const InfoData = [
    {
      label: "Scout Name",
      key: "ScoutName",
      value: newMatchData.ScoutName,
      type: "text",
    },
    {
      label: "Match Number",
      key: "MatchNumber",
      value: newMatchData.MatchNumber.toString(),
      type: "number",
    },
  ];

  const AutoData = [
    {
      label: "Starting Position",
      key: "AutoStartingPosition",
      value: newMatchData.AutoStartingPosition,
      type: "dropdown",
      droptype: PositionTypeItem,
    },
    {
      label: "Auto Leave",
      key: "AutoLeave",
      value: newMatchData.AutoLeave,
      type: "boolean",
    },
    {
      label: "Amplifier",
      key: "AutoAmp",
      value: newMatchData.AutoAmp,
      type: "counter",
    },
    {
      label: "Speaker",
      key: "AutoSpeaker",
      value: newMatchData.AutoSpeaker,
      type: "counter",
    },
    {
      label: "Dropped Game Pieces",
      key: "AutoDropped",
      value: newMatchData.AutoDropped,
      type: "counter",
    },
    {
      label: "Extra Notes",
      key: "AutoExtraNotes", //TODO CUSTOM RADIO BUTTON
      value: newMatchData.AutoExtraNotes,
      type: "radio",
      titles: ["Stage Left", "Center Stage", "Stage Right"],
      fields: extraNotesItem
    },
    {
      label: "A-StopPressed?",
      key: "AutoAStopPressed",
      value: newMatchData.AutoAStopPressed,
      type: "boolean",
    },
    {
      label: "Incapacitated in auto?",
      key: "AutoIncapacitated",
      value: newMatchData.AutoIncapacitated,
      type: "boolean",
    },
    {
      label: "Fell in auto?",
      key: "AutoRobotFalls",
      value: newMatchData.AutoRobotFalls,
      type: "boolean",
    },
    {
      label: "Robot Did Not Play",
      key: "AutoRobotDidNotPlay",
      value: newMatchData.AutoRobotDidNotPlay,
      type: "boolean",
    },
  ];

  const TeleopData = [
    {
      label: "Teleop Cycle Time",
      key: "TeleopCycleTime",
      value: newMatchData.TeleopCycleTime,
      type: "timer",
    },
    {
      label: "Teleop Game Piece Stuck",
      key: "TeleopGamePieceStuck",
      value: newMatchData.TeleopGamePieceStuck,
      type: "counter",
    },
    {
      label: "Teleop Trap",
      key: ["TeleopTrapZero", "TeleopTrapFive", "TeleopTrapTen", "TeleopTrapFifteen"],
      values: ["newMatchData.TeleopTrapZero", "newMatchData.TeleopTrapFive", "newMatchData.TeleopTrapTen", "newMatchData.TeleopTrapFifteen"],
      type: "radio",
      vertical: 1,
      horizontal: 3,
      titles: ["Stage Left", "Center Stage", "Stage Right"],
      values: ["newmatchdata", "stageleft", "stageright"],
     
    },
    {
      label: "Fell in teleop?",
      key: "TeleopFell",
      value: newMatchData.TeleopFell,
      type: "boolean",
    },
    {
      label: "Incapacitated in Teleop",
      key: "TeleopIncapacitated",
      value: newMatchData.TeleopIncapacitated,
      type: "boolean",
    },
   
    {
      label: "Teleop Shoots From",
      key: "TeleopShootsFrom",
      value: newMatchData.AutoRobotDidNotPlay,
      type: "radio",
      vertical: 1,
      horizontal: 3,
      titles: ["Starting Zone", "Podium", "Wing"],
      values: ["newmatchdata", "stageleft", "stageright"],
     
    },
    {
      label: "Can PassUnder Stage",
      key: "TeleopUnderStage",
      value: newMatchData.TeleopUnderStage,
      type: "boolean",
    },
  ];

  const EndGameData = [
    {
      label: "End Game On Stage",
      key: "EndGameOnStage",
      value: newMatchData.EndGameOnStage,
      type: "dropdown",
      droptype: EndGameOnStageItem,
    },
    {
      label: "End Game Harmony", //TODO not put in verif
      key: "EndGameHarmony",
      value: newMatchData.EndGameHarmony,
      type: "dropdown",
      droptype: EndGameHarmonyItem,
    },
    {
      label: "End Game Trap", //TODO not put in verif
      key: "EndGameTrap",
      value: newMatchData.EndGameTrap,
      type: "dropdown",
      droptype: EndGameTrapITem,
    },
    {
      label: "End Game Robot Fell",
      key: "EndGameRobotFell",
      value: newMatchData.EndGameRobotFell,
      type: "boolean",
    },
    {
      label: "End Game Robot Incapacitated",
      key: "EndGameRobotIncapacitated",
      value: newMatchData.EndGameRobotIncapacitated,
      type: "boolean",
    },
    {
      label: "End Game Spotlit",
      key: "EndGameSpotLighted",
      value: newMatchData.EndGameSpotLighted,
      type: "boolean",
    },
  ];

  const PerformanceData = [
    {
      label: "Total Points Alliance",
      key: "AllianceTotalPoints",
      value: newMatchData.AllianceTotalPoints,
      type: "number",
    },
    {
      label: "Alliance Game Status",
      key: "AllianceRankingPoints",
      value: newMatchData.AllianceRankingPoints,
      type: "dropdown",
      droptype: RankingPointsItem,
    },
    {
      label: "Alliance Melody",
      key: "AllianceMelody",
      value: newMatchData.AllianceMelody,
      type: "boolean",
    },
    {
      label: "Alliance Coopertition",
      key: "AllianceCoopertition",
      value: newMatchData.AllianceCoopertition,
      type: "boolean",
    },
    {
      label: "Alliance Ensemble",
      key: "AllianceEnsemble",
      value: newMatchData.AllianceEnsemble,
      type: "boolean",
    },
    {
      label: "Plays Defense?",
      key: "PlaysDefense",
      value: newMatchData.PlaysDefense,
      type: "dropdown",
      droptype: DefenseLevelItem,
    },
    {
      label: "Is robot tippy?",
      key: "RobotTippy",
      value: newMatchData.RobotTippy,
      type: "dropdown",
      droptype: TippinessItem,
    },
    {
      label: "Is robot fast?",
      key: "RobotSpeed",
      value: newMatchData.RobotSpeed,
      type: "dropdown",
      droptype: SpeedItem,
    },
    {
      label: "Field Awareness",
      key: "FieldAwareness",
      value: newMatchData.FieldAwareness,
      type: "dropdown",
      droptype: AwareTypeItem,
    },
    {
      label: "Comment",
      key: "Comment",
      value: newMatchData.TotalPointsAlliance,
      type: "text",
    },
  ];

  const buttonTextStyle = {
    color: "#686868",
    fontWeight: "bold",
  };

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }} onStartShouldSetResponderCapture={handleScroll}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90} // Adjust this offset as needed
      >
        <ProgressSteps
          completedProgressBarColor="#1E1E1E"
          activeStepIconBorderColor="#1E1E1E"
          completedStepIconColor="#1E1E1E"
          activeStepIconColor="#F6EB14"
          activeLabelColor="#1E1E1E"
          completedCheckColor="#F6EB14"
        >
          <ProgressStep
            label="Info"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View>{content({ data: InfoData })}</View>
          </ProgressStep>
          <ProgressStep
            label="Auto"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View style={{}}>
              <View>{content({ data: AutoData })}</View>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Teleop"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View style={{}}>
              <View>{content({ data: TeleopData })}</View>
            </View>
          </ProgressStep>
          <ProgressStep
            label="EndGame"
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View style={{}}>
              <View>{content({ data: EndGameData })}</View>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Results"
            onSubmit={handleSaveMatchData}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <View style={{}}>
              <View>{content({ data: PerformanceData })}</View>
            </View>
          </ProgressStep>
        </ProgressSteps>
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
  label: {
    width: 100,
    marginRight: 10,
  },
});
export default Matches;
