import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Timer = ({
  addCycleTime,
  addDropPiece,
  addAmpPiece,
  addSpeakPiece,
  addAmpSpeakPiece,
}) => {
  const [timer, setTimer] = useState(0);
  const [lastThreeTimes, setLastThreeTimes] = useState([]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 0.1); // Increment by 0.1 seconds
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleActionPress = (action) => {
    const time = timer.toFixed(1);
    const updatedTimes = [time, ...lastThreeTimes.slice(0, 2)];
    setLastThreeTimes(updatedTimes);

    switch (action) {
      case "amp":
        addAmpPiece();
        addCycleTime(time);
        break;
      case "speaker":
        addSpeakPiece();
        addCycleTime(time);
        break;
      case "ampSpeaker":
        addAmpSpeakPiece();
        addCycleTime(time);
        break;
      case "drop":
        addDropPiece();
        break;
      default:
        break;
    }
    setTimer(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{timer.toFixed(1)} sec</Text>
        </View>

        <View style={styles.lastThreeTimesContainer}>
          <Text style={styles.lastThreeTimesTitle}>Previous Cycles:</Text>
          {lastThreeTimes.map((time, index) => (
            <Text key={index} style={styles.lastThreeTimesText}>
              {time} sec
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleActionPress("amp")}
        >
          <Text style={styles.actionButtonText}>Amp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleActionPress("speaker")}
        >
          <Text style={styles.actionButtonText}>Speaker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleActionPress("ampSpeaker")}
        >
          <Text style={styles.actionButtonText}>Amped Speaker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleActionPress("drop")}
        >
          <Text style={styles.actionButtonText}>Dropped</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  timerContainer: {
    marginLeft: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#333",
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  actionButtonText: {
    color: "#F6EB14",
    fontSize: 14,
    fontWeight: "bold",
  },
  lastThreeTimesContainer: {
    alignItems: "center",
    marginLeft: 10,
  },
  lastThreeTimesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8},
  lastThreeTimesText: {
    fontSize: 14,
    marginBottom: 3,
  },
  timerText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Timer;
