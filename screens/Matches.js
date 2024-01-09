import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Keyboard } from "react-native";
import { SaveMatchData } from "../logic/MatchLogic.js";
import { loadMatchCount, saveCurrentMatchCount } from "../logic/TeamLogic.js";
import * as MatchModel from "../Models/MatchModel";

import {
  InputField,
  ToggleSwitch,
  DropDownSelector,
  Timer,
  Grid,
} from "./ReusableStuff.js";
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
  });

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
                setValue={(text) => setArrayField(item.key, text)}
                dropPiece={() =>
                  setNumericField(
                    "DroppedGamePiece",
                    newMatchData.DroppedGamePiece + 1
                  )
                }
              />
            )}
            {item.type === "grid" && <Grid rows={3} columns={3} />}
          </View>
        )}
      />
    );
  };

  async function handleSaveMatchData() {
    try {
      // on peut ajouter des fields si necessaire
      const validationFields = [
        { field: "ScoutName", value: newMatchData.ScoutName },
        { field: "MatchNumber", value: newMatchData.MatchNumber },
        { field: "Alliance Points", value: newMatchData.TotalPointsAlliance },
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

  const PositionTypeItem = Object.keys(MatchModel.Position).map((key) => ({
    label: MatchModel.Position[key],
    value: MatchModel.Position[key],
  }));

  const ObjectiveTypeItem = Object.keys(MatchModel.Objective).map((key) => ({
    label: MatchModel.Objective[key],
    value: MatchModel.Objective[key],
  }));

  const SpeedTypeItem = Object.keys(MatchModel.Speed).map((key) => ({
    label: MatchModel.Speed[key],
    value: MatchModel.Speed[key],
  }));

  const AwareTypeItem = Object.keys(MatchModel.Aware).map((key) => ({
    label: MatchModel.Aware[key],
    value: MatchModel.Aware[key],
  }));

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
      label: "Auto Game Piece 1",
      key: "AutoGamePiece1",
      value: newMatchData.AutoGamePiece1,
      type: "number",
    },
    {
      label: "Auto Game Piece 2",
      key: "AutoGamePiece2",
      value: newMatchData.AutoGamePiece2,
      type: "number",
    },
    {
      label: "Auto Game Piece 3",
      key: "AutoGamePiece3",
      value: newMatchData.AutoGamePiece3,
      type: "number",
    },
    {
      label: "Auto Game Piece 4",
      key: "AutoGamePiece4",
      value: newMatchData.AutoGamePiece4,
      type: "number",
    },
    {
      label: "Auto Position",
      key: "AutoPosition",
      value: newMatchData.AutoPosition,
      type: "dropdown",
      droptype: PositionTypeItem,
    },
    {
      label: "Auto Mobility",
      key: "AutoMobility",
      value: newMatchData.AutoMobility,
      type: "boolean",
    },
    {
      label: "Auto Objective 1",
      key: "AutoObjective1",
      value: newMatchData.AutoObjective1,
      type: "dropdown",
      droptype: ObjectiveTypeItem,
    },
    {
      label: "Auto Objective 2",
      key: "AutoObjective2",
      value: newMatchData.AutoObjective2,
      type: "dropdown",
      droptype: ObjectiveTypeItem,
    },
    {
      label: "Auto Robot Falls",
      key: "AutoRobotFalls",
      value: newMatchData.AutoRobotFalls,
      type: "boolean",
    },
  ];

  const TeleopData = [
    {
      label: "Average Cycle time",
      key: "CycleTime",
      value: newMatchData.CycleTime.toString(),
      type: "timer",
    },
    {
      label: "Grid",
      key: "GamePiecesGrid",
      value: newMatchData.GamePiecesGrid,
      type: "grid",
    },
    {
      label: "Number of dropped game pieces",
      key: "DroppedGamePiece",
      value: newMatchData.DroppedGamePiece,
      type: "number",
    },
  ];

  const EndGameData = [
    {
      label: "Objective 1",
      key: "EndGameObjective1",
      value: newMatchData.EndGameObjective1,
      type: "dropdown",
      droptype: ObjectiveTypeItem,
    },
    {
      label: "Objective 2",
      key: "EndGameObjective2",
      value: newMatchData.EndGameObjective2,
      type: "dropdown",
      droptype: ObjectiveTypeItem,
    },
  ];

  const PerformanceData = [
    {
      label: "Comment",
      key: "Comment",
      value: newMatchData.Comment,
      type: "text",
    },
    {
      label: "Total Points Alliance",
      key: "TotalPointsAlliance",
      value: newMatchData.TotalPointsAlliance,
      type: "number",
    },
    {
      label: "Ranking Points Alliance",
      key: "RankingPointsAlliance",
      value: newMatchData.RankingPointsAlliance,
      type: "number",
    },
    {
      label: "Links",
      key: "AllianceObjective1",
      value: newMatchData.AllianceObjective1,
      type: "number",
    },
    {
      label: "Coopertition",
      key: "AllianceObjective2",
      value: newMatchData.AllianceObjective2,
      type: "boolean",
    },
    {
      label: "Won Match",
      key: "WonMatch",
      value: newMatchData.WonMatch,
      type: "boolean",
    },
    {
      label: "Teleop Status 1",
      key: "TeleopStatus1",
      value: newMatchData.TeleopStatus1,
      type: "boolean",
    },
    {
      label: "Teleop Status 2",
      key: "TeleopStatus2",
      value: newMatchData.TeleopStatus2,
      type: "boolean",
    },
    {
      label: "Teleop Status 3",
      key: "TeleopStatus3",
      value: newMatchData.TeleopStatus3,
      type: "boolean",
    },
    {
      label: "Teleop Status 4",
      key: "TeleopStatus4",
      value: newMatchData.TeleopStatus4,
      type: "boolean",
    },
    {
      label: "Teleop Status 5",
      key: "TeleopStatus5",
      value: newMatchData.TeleopStatus5,
      type: "dropdown",
      droptype: SpeedTypeItem,
    },
    {
      label: "Teleop Status 6",
      key: "TeleopStatus6",
      value: newMatchData.TeleopStatus6,
      type: "dropdown",
      droptype: AwareTypeItem,
    },
    {
      label: "Cubes",
      key: "TeleopGamePiece1",
      value: newMatchData.TeleopGamePiece1,
      type: "number",
    },
    {
      label: "Cones",
      key: "TeleopGamePiece2",
      value: newMatchData.TeleopGamePiece2,
      type: "number",
    },
    {
      label: "N/A",
      key: "TeleopGamePiece3",
      value: newMatchData.TeleopGamePiece3,
      type: "number",
    },
    {
      label: "N/A",
      key: "TeleopGamePiece4",
      value: newMatchData.TeleopGamePiece4,
      type: "number",
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
      <ProgressSteps
        completedProgressBarColor="#1E1E1E"
        activeStepIconBorderColor="#1E1E1E"
        completedStepIconColor="#1E1E1E"
        activeStepIconColor="#F6EB14"
        activeLabelColor="#1E1E1E"
        completedCheckColor="#F6EB14"
        activeStep={currentStep}
      >
        <ProgressStep
          label="Info"
          onNext={this.onNextStep}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
          nextBtnTextStyle={buttonTextStyle}
          previousBtnTextStyle={buttonTextStyle}
        >
          <View>{content({ data: InfoData })}</View>
        </ProgressStep>
        <ProgressStep
          label="Auto"
          onNext={this.onNextStep}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
          nextBtnTextStyle={buttonTextStyle}
          previousBtnTextStyle={buttonTextStyle}
        >
          <View style={{}}>
            <View>{content({ data: AutoData })}</View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Teleop"
          onNext={this.onNextStep}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
          nextBtnTextStyle={buttonTextStyle}
          previousBtnTextStyle={buttonTextStyle}
        >
          <View style={{}}>
            <View>{content({ data: TeleopData })}</View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="EndGame"
          onNext={this.onNextStep}
          onPrevious={this.onPrevStep}
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
          onPrevious={this.onPrevStep}
          onSubmit={handleSaveMatchData}
          scrollViewProps={this.defaultScrollViewProps}
          nextBtnTextStyle={buttonTextStyle}
          previousBtnTextStyle={buttonTextStyle}
        >
          <View style={{}}>
            <View>{content({ data: PerformanceData })}</View>
          </View>
        </ProgressStep>
      </ProgressSteps>
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
