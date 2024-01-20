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
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Ionicons";
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



export const Counter = ({ label, onToggle, OnNegToggle, value }) => (
  <View style={styles.counterContainer}>
    <Text>{label}</Text>
    <View style={styles.iconTextContainer}>
    <TouchableOpacity onPress={OnNegToggle} style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Icon1 name="remove-circle" size={30} color={"#333"} />
        </View>
      </TouchableOpacity>
      <Text style={styles.counterText}>{value}</Text>
      <TouchableOpacity onPress={onToggle} style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Icon1 name="add-circle" size={30} color={"#333"} />
        </View>
      </TouchableOpacity>
    </View>
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

export const Grid = ({ rows, columns }) => {
  const generateGrid = () => {
    const grid = [];

    for (let row = 1; row <= rows; row++) {
      const rowCells = [];
      for (let col = 1; col <= columns; col++) {
        rowCells.push(
          <TouchableOpacity key={col} style={styles.gridCell}>
            <Text>{`${row}-${col}`}</Text>
          </TouchableOpacity>
        );
      }
      grid.push(
        <View key={row} style={styles.rowContainer}>
          {rowCells}
        </View>
      );
    }

    return grid;
  };

  return <View style={styles.gridContainer}>{generateGrid()}</View>;
};

export const CustomComponent = ({ label, items, value, setValue }) => {
  return (
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
};

export const Timer = ({ setValue, dropPiece }) => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;

    const resetTimer = () => {
      clearInterval(interval);
      setTimer(0);
    };

    if (selectedShape === "square" || selectedShape === "triangle") {
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
    if (selectedShape == !null) {
      setValue(timer);
    }
    setSelectedShape(shape);
  };

  const handleStopPress = () => {
    setValue(timer);
    dropPiece();
    setSelectedShape(null);
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity
        style={[
          styles.shape,
          selectedShape === "square" && styles.selectedShape,
        ]}
        onPress={() => handleShapePress("square")}
      >
        <Icon name="cube-outline" size={64} color={"purple"} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.shape,
          selectedShape === "triangle" && styles.selectedShape,
        ]}
        onPress={() => handleShapePress("triangle")}
      >
        <Icon name="traffic-cone" size={64} color={"#FF0000"} />
      </TouchableOpacity>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timer} sec</Text>
        <TouchableOpacity style={styles.stopButton} onPress={handleStopPress}>
          <Text style={styles.stopButtonText}>Dropped</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  list: {
    backgroundColor: "#F0F0F0",
    borderRadius: "15",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 0,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginHorizontal: 20,
  },
  label: {
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#A0A0A0",
    borderRadius: 15,
    padding: 10,
    width: "100%",
    fontSize: 16,
    color: "#333",
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
    width: "100%",
    backgroundColor: "#F0F0F0",
    
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#A0A0A0",
    padding: 10,
  },
  dropdownPlaceholder: {
    color: "#A0A0A0",
  },
  dropdownSelectedText: {
    color: "#333",
  },
  dropdownInputSearch: {
    color: "#333",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    marginHorizontal: 28,
    borderRadius: 15,
    padding: 10,
    borderColor: "#A0A0A0",
    borderWidth: 1,
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
    alignItems: "flex-start",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginHorizontal: 20,
  },
  saveButton: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    margin: 20,
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
    color: "#F6EB14",
  },
  container1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
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
  timer: {
    marginLeft: 55,
    width: 80,
    height: 80,
    backgroundColor: "#F0F0F0",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#A0A0A0",
    borderWidth: 1,
  },
  gridContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  gridCell: {
    width: 80,
    height: 80,
    backgroundColor: "#F0F0F0",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#A0A0A0",
    borderWidth: 1,
  },
  timerText: {
    fontSize: 18,
    color: "#333",
  },

  stopButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  stopButtonText: {
    color: "#F6EB14",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerContainer: {
    marginLeft: 55,
    alignItems: "center",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    marginHorizontal: 28,
    borderRadius: 15,
    padding: 10,
    borderColor: "#A0A0A0",
    borderWidth: 1,
  },

  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    marginRight: 5, // Adjust this value to control the space between the icons
    
  },

  iconBackground: {
    backgroundColor: "#F6EB14", // Change this color to your desired background color
    borderRadius: 25, // Adjust this value to control the roundness of the background
    margin: 2, // Adjust this value to control the padding inside the background circle
   
  },

  counterText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 5, // Adjust this value to control the space between the text and the icons
    marginRight: 10, // Adjust this value to control the space between the text and the minus icon
  },
});
