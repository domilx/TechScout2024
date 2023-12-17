import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
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
} from "react-native";
import { SaveMatchData } from "../logic/MatchLogic.js";
import {
  loadMatchCount,
  saveCurrentMatchCount,
} from "../logic/TeamLogic.js";
import {
  initialMatchData,
  Position,
  ChargingStation,
  TBD,
  Speed,
  Aware,
} from "../Models/MatchModel";
import { Dropdown } from "react-native-element-dropdown";
import { loadPitData } from "../logic/PitLogic";
import {
  InputField,
  ToggleSwitch,
  DropDownSelector,
} from "../assets/ReusableStuff";

function Matches({ route }) {
  const { currentTeamNumber } = route.params;
  const [newMatchData, setNewMatchData] = useState(initialMatchData);
  const [matchCount, setMatchCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);


  useEffect(() => {
    const loadMatchDataOnMount = async () => {
       setMatchCount(await loadMatchCount(currentTeamNumber));
    };
    loadMatchDataOnMount();
  },);

  const setField = (field, value) => {
    setNewMatchData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setNumericField = (field, value) => {
    // Check if the value is an empty string
    const numericValue = value === "" ? "" : parseInt(value, 10);

    setNewMatchData((prevData) => ({
      ...prevData,
      [field]: numericValue,
    }));
  };

  // Setter for enum fields
  const setEnumField = (field, value) => {
    setNewMatchData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Setter for boolean fields
  const setBooleanField = (field, value) => {
    setNewMatchData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  async function handleSaveMatchData() {
    setField("TeamNumber", currentTeamNumber);
      const saveSuccess = await SaveMatchData(newMatchData, currentTeamNumber, matchCount);
  
      if (saveSuccess) {
        // Increment matchCount only if the Save operation was successful
        setMatchCount(matchCount + 1);
      }
  
  }
  

  const PositionTypeItem = Object.keys(Position).map((key) => ({
    label: Position[key],
    value: Position[key],
  }));

  const ChargingStationTypeItem = Object.keys(ChargingStation).map((key) => ({
    label: ChargingStation[key],
    value: ChargingStation[key],
  }));

  const SpeedTypeItem = Object.keys(Speed).map((key) => ({
    label: Speed[key],
    value: Speed[key],
  }));

  const AwareTypeItem = Object.keys(Aware).map((key) => ({
    label: Aware[key],
    value: Aware[key],
  }));

  const TBDItem = Object.keys(TBD).map((key) => ({
    label: TBD[key],
    value: TBD[key],
  }));

  const InfoData = [
    { key: "Scout Name", value: newMatchData.ScoutName },
    { key: "Match Number", value: newMatchData.MatchNumber.toString() },
  ];

  const AutoData = [
    { key: "AutoGamePiece1", value: newMatchData.AutoGamePiece1 },
    { key: "AutoGamePiece2", value: newMatchData.AutoGamePiece2 },
    { key: "AutoGamePiece3", value: newMatchData.AutoGamePiece3 },
    { key: "AutoGamePiece4", value: newMatchData.AutoGamePiece4 },
    { key: "AutoPosition", value: newMatchData.AutoPosition },
    { key: "AutoMobility", value: newMatchData.AutoMobility },
    { key: "AutoChargingStation", value: newMatchData.AutoChargingStation },
    { key: "AutoObjective1", value: newMatchData.AutoObjective1 },
    { key: "AutoObjective2", value: newMatchData.AutoObjective2 },
    { key: "AutoRobotFalls", value: newMatchData.AutoRobotFalls },
  ];
  const TeleopData = [
    { key: "Cycle Time", value: newMatchData.CycleTime.toString() },
    { key: "EndGameObjective1", value: newMatchData.EndGameObjective1 },
    {
      key: "DroppedGamePiece",
      value: newMatchData.DroppedGamePiece.toString(),
    },
  ];
  const PerformanceData = [
    { key: "Comment", value: newMatchData.Comment },
    { key: "TotalPointsAlliance", value: newMatchData.TotalPointsAlliance },
    { key: "RankingPointsAlliance", value: newMatchData.RankingPointsAlliance },
    { key: "AllianceObjective1", value: newMatchData.AllianceObjective1 },
    { key: "AllianceObjective2", value: newMatchData.AllianceObjective2 },
    { key: "WonMatch", value: newMatchData.WonMatch },
    { key: "TeleopStatus1", value: newMatchData.TeleopStatus1 },
    { key: "TeleopStatus2", value: newMatchData.TeleopStatus2 },
    { key: "TeleopStatus3", value: newMatchData.TeleopStatus3 },
    { key: "TeleopStatus4", value: newMatchData.TeleopStatus4 },
    { key: "TeleopStatus5", value: newMatchData.TeleopStatus5 },
    { key: "TeleopStatus6", value: newMatchData.TeleopStatus6 },
  ];

  const handleScroll = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={{ flex: 1 }}  onStartShouldSetResponderCapture={handleScroll}>
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
          onNext={this.onPaymentStepComplete}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <View style={{}}>
            <FlatList
              scrollEnabled={false}
              style={styles.container}
              data={InfoData}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <View>
                  {item.key === "Scout Name" && (
                    <InputField
                      label={item.key}
                      value={item.value}
                      onChange={(text) => setField("ScoutName", text)}

                    />
                  )}
                  {item.key === "Match Number" && (
                    <InputField
                      label={item.key}
                      value={item.value}
                      onChange={(text) => setNumericField("MatchNumber", text)}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  )}
                </View>
              )}
            />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Auto"
          onNext={this.onNextStep}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <FlatList
            scrollEnabled={false}
            style={styles.container}
            data={AutoData}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View>
                {item.key === "AutoGamePiece1" && (
                  <DropDownSelector
                    label={item.key}
                    value={item.value}
                    items={TBDItem}
                    setValue={(value) => setEnumField("AutoGamePiece1", value)}
                    
                  />
                )}
                {item.key === "AutoGamePiece2" && (
                  <InputField
                    label={item.key}
                    value={item.value}
                    onChange={(text) => setField("AutoGamePiece2", text)}
                  />
                )}
                {item.key === "AutoGamePiece3" && (
                  <InputField
                    label={item.key}
                    value={item.value}
                    onChange={(text) => setField("AutoGamePiece2", text)}
                  />
                )}
                {item.key === "AutoGamePiece4" && (
                  <InputField
                    label={item.key}
                    value={item.value}
                    onChange={(text) => setField("AutoGamePiece2", text)}
                  />
                )}
                {item.key === "AutoPosition" && (
                  <DropDownSelector
                    label={item.key}
                    value={item.value}
                    items={PositionTypeItem}
                    setValue={(text) => setEnumField("AutoPosition", text)}
                  />
                )}
                {item.key === "AutoMobility" && (
                  <ToggleSwitch
                    label={item.key}
                    value={newMatchData.RobQuest1}
                    onToggle={(newValue) =>
                      setBooleanField("AutoMobility", newValue)
                    }
                  />
                )}
                {item.key === "AutoChargingStation" && (
                  <DropDownSelector
                    label={item.key}
                    value={item.value}
                    items={ChargingStationTypeItem}
                    setValue={(value) =>
                      setEnumField("AutoChargingStation", value)
                    }
                  />
                )}
                {item.key === "AutoObjective1" && (
                  <DropDownSelector
                    label={item.key}
                    value={item.value}
                    items={TBDItem}
                    setValue={(value) => setEnumField("AutoObjective1", value)}
                  />
                )}
                {item.key === "AutoObjective2" && (
                  <DropDownSelector
                    label={item.key}
                    value={item.value}
                    items={TBDItem}
                    onChange={(value) => setEnumField("AutoObjective2", value)}
                  />
                )}
                {item.key === "AutoRobotFalls" && (
                  <ToggleSwitch
                    label={item.key}
                    value={newMatchData.RobQuest1}
                    onToggle={(newValue) =>
                      setBooleanField("AutoRobotFalls", newValue)
                    }
                  />
                )}
              </View>
            )}
          />
        </ProgressStep>
        <ProgressStep
          label="Teleop"
          onNext={this.onNextStep}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <FlatList
            scrollEnabled={false}
            style={styles.container}
            data={TeleopData}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View>
                {item.key === "Cycle Time" && (
                  <InputField
                    label={item.key}
                    value={item.value}
                    keyboardType="numeric"
                    maxLength={2}
                    onChange={(text) => setNumericField("CycleTime", text)}
                  />
                )}
                {item.key === "EndGameObjective1" && (
                  <ToggleSwitch
                    label={item.key}
                    value={newMatchData.EndGameObjective1}
                    onToggle={(newValue) =>
                      setBooleanField("EndGameObjective1", newValue)
                    }
                  />
                )}
                {item.key === "DroppedGamePiece" && (
                  <InputField
                    label={item.key}
                    value={item.value}
                    keyboardType="numeric"
                    maxLength={2}
                    onChange={(text) =>
                      setNumericField("DroppedGamePiece", text)
                    }
                  />
                )}
              </View>
            )}
          />
        </ProgressStep>
        <ProgressStep
          label="Performance"
          onPrevious={this.onPrevStep}
          
          onSubmit={() => {
            handleSaveMatchData();
            setCurrentStep(0);
           }}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <FlatList
            style={styles.container}
            data={PerformanceData}
            scrollEnabled={false}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View>
                {item.key === "Comment" && (
                  <InputField
                    label={item.key}
                    value={item.value}
                    onChange={(text) => setField("Comment", text)}
                  />
                )}
                {item.key === "TotalPointsAlliance" && (
                  <InputField
                    label={item.key}
                    value={item.value.toString()}
                    keyboardType="numeric"
                    onChange={(text) =>
                      setNumericField("TotalPointsAlliance", text)
                    }
                  />
                )}
                {item.key === "RankingPointsAlliance" && (
                  <InputField
                    label={item.key}
                    value={item.value.toString()}
                    keyboardType="numeric"
                    onChange={(text) =>
                      setNumericField("RankingPointsAlliance", text)
                    }
                  />
                )}
                {item.key === "AllianceObjective1" && (
                  <InputField
                    label={item.key}
                    value={item.value.toString()}
                    keyboardType="numeric"
                    onChange={(text) =>
                      setNumericField("AllianceObjective1", text)
                    }
                  />
                )}
                {item.key === "AllianceObjective2" && (
                  <ToggleSwitch
                    label={item.key}
                    value={item.value}
                    onToggle={(newValue) =>
                      setBooleanField("AllianceObjective2", newValue)
                    }
                  />
                )}
                {item.key === "WonMatch" && (
                  <ToggleSwitch
                    label={item.key}
                    value={item.value}
                    onToggle={(newValue) =>
                      setBooleanField("WonMatch", newValue)
                    }
                  />
                )}
                {item.key === "TeleopStatus1" && (
                  <ToggleSwitch
                    label={item.key}
                    value={item.value}
                    onToggle={(newValue) =>
                      setBooleanField("TeleopStatus1", newValue)
                    }
                  />
                )}
                {item.key === "TeleopStatus2" && (
                  <ToggleSwitch
                    label={item.key}
                    value={item.value}
                    onToggle={(newValue) =>
                      setBooleanField("TeleopStatus2", newValue)
                    }
                  />
                )}
                {item.key === "TeleopStatus3" && (
                  <ToggleSwitch
                    label={item.key}
                    value={item.value}
                    onToggle={(newValue) =>
                      setBooleanField("TeleopStatus3", newValue)
                    }
                  />
                )}
                {item.key === "TeleopStatus4" && (
                  <ToggleSwitch
                    label={item.key}
                    value={item.value}
                    onToggle={(newValue) =>
                      setBooleanField("TeleopStatus4", newValue)
                    }
                  />
                )}
                {item.key === "TeleopStatus5" && (
                  <DropDownSelector
                    label={item.key}
                    value={item.value}
                    items={SpeedTypeItem}
                    setValue={(value) => setEnumField("TeleopStatus5", value)}
                  />
                )}
                {item.key === "TeleopStatus6" && (
                  <DropDownSelector
                    label={item.key}
                    value={item.value}
                    items={AwareTypeItem}
                    setValue={(value) => setEnumField("TeleopStatus6", value)}
                  />
                )}
              </View>
            )}
          />
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
