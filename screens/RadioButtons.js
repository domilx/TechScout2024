import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const RadioButtonGrid = ({
  horizontalAmount,
  verticalAmount,
  columnTitles,
  rowTitles,
}) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const toggleRadioButton = (index) => {
    setSelectedButtons((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((selected) => selected !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const generateButtons = () => {
    const buttons = [];
    for (let i = 0; i < verticalAmount; i++) {
      const row = [];
      for (let j = 0; j < horizontalAmount; j++) {
        const index = i * horizontalAmount + j;
        row.push(
          <View key={index} style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => toggleRadioButton(index)}>
              <Icon
                name={
                  selectedButtons.includes(index)
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={32}
                color={"#333"}
              />
            </TouchableOpacity>
          </View>
        );
      }
      buttons.push(
        <View key={i} style={styles.rowContainer}>
          <Text style={styles.rowTitle}>{rowTitles[i]}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {row}
          </View>
        </View>
      );
    }
    return buttons;
  };

  const renderColumnTitles = () => {
    return (
      <View style={styles.columnTitleContainer}>
        {columnTitles.map((title, index) => (
          <Text key={index} style={styles.columnTitle}>
            {title}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderColumnTitles()}
      {generateButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  columnTitleContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  columnTitle: {
    marginRight: 10,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  rowTitle: {
    marginRight: 10,
  },
});

export default RadioButtonGrid;
