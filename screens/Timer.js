import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Timer = ({ addCycleTime, addDropPiece, addAmpPiece, addSpeakPiece, addAmpSpeakPiece }) => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;

    const resetTimer = () => {
      clearInterval(interval);
      setTimer(0);
    };

    if (selectedShape === "square") {
      resetTimer();
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      resetTimer();
    }

    return () => clearInterval(interval);
  }, [selectedShape]);

  const handleShapePress = (shape) => {
    
    setSelectedShape(shape);
  };

  const handleStopPress = () => {
    addCycleTime(timer);
  
    setSelectedShape(null);
  };

  const DropPiece = () => {
    if (selectedShape === "square") {
      addDropPiece();
      handleStopPress();
    }
  };

  const Amp = () => {
    if (selectedShape === "square") {
    addAmpPiece();
    handleStopPress();
    }
};

const Speaker = () => {
    if (selectedShape === "square") {
    addSpeakPiece();
    handleStopPress();
    }
};

const AmpSpeaker = () => {
    if (selectedShape === "square") {
    addAmpSpeakPiece();
    handleStopPress();
    }
};

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={[
            styles.shape,
            selectedShape === "square" && styles.selectedShape,
          ]}
          onPress={() => handleShapePress("square")}
        >
          <Icon name="circle-outline" size={64} color={"orange"} />
        </TouchableOpacity>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{timer} sec</Text>
        </View>
      </View>

      <View style={styles.shapesContainer}>
        <TouchableOpacity style={styles.dropButton} onPress={()=>Amp()}>
          <Text style={styles.dropButtonText}>Amp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropButton} onPress={()=>Speaker()}>
          <Text style={styles.dropButtonText}>Speaker</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropButton} onPress={()=>AmpSpeaker()}>
          <Text style={styles.dropButtonText}>Amped Speaker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropButton} onPress={()=>DropPiece()}>
          <Text style={styles.dropButtonText}>Dropped</Text>
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
  shapesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  shape: {
    width: 80,
    height: 80,
    backgroundColor: "#F0F0F0",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#A0A0A0",
    borderWidth: 1,
  },
  selectedShape: {
    backgroundColor: "lightgreen",
  },
  timerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropButton: {
    backgroundColor: "#333",
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  dropButtonText: {
    color: "#F6EB14",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Timer;
