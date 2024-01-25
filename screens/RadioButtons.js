import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const RadioButtonGrid = ({
  horizontalAmount,
  verticalAmount,
  columnTitles,
  rowTitles,
  label,
  onPress,
  saveButtons,
  value,
}) => {
  const [selectedButtons, setSelectedButtons] = useState(value);
  
const generateButtons = () => {
    const buttons = [];
    for (let i = 0; i < verticalAmount; i++) {
      const row = [];
      for (let j = 0; j < horizontalAmount; j++) {
        const index = i * horizontalAmount + j;
        row.push(
          <View key={index} style={{ marginRight: "20%" }}>
            <TouchableOpacity
             onPress={() => {
              const index = i * horizontalAmount + j;
              const isSelected = selectedButtons.includes(index);
              let newSelectedButtons;
            
              if (isSelected) {
                newSelectedButtons = selectedButtons.filter((item) => item !== index);
              } else {
                newSelectedButtons = [...selectedButtons, index];
              }
            
              setSelectedButtons(newSelectedButtons);
              saveButtons(newSelectedButtons); // Save the selected buttons

              const selectedCount = newSelectedButtons.length;
            
              if (selectedCount === 0) {
                onPress('TrapFailed');
              } else if (selectedCount === 1) {
                onPress('FivePoints');
              } else if (selectedCount === 2) {
                onPress('TenPoints');
              } else if (selectedCount === 3) {
                onPress('FifteenPoints');
              }
            }}
            >
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
    <View style={styles.subViews}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterContainer}>
        {renderColumnTitles()}
        {generateButtons()}
      </View>
    </View>
  );
};


export const RadioButtonGrid1 = ({
  horizontalAmount,
  verticalAmount,
  columnTitles,
  label,
  onPress,
  saveButtons,
  value,
}) => {
  const [selectedButtons, setSelectedButtons] = useState(value);
  
const generateButtons = () => {
    const buttons = [];
    for (let i = 0; i < verticalAmount; i++) {
      const row = [];
      for (let j = 0; j < horizontalAmount; j++) {
        const index = i * horizontalAmount + j;
        row.push(
          <View key={index} style={{ marginRight: 20, marginLeft: 20 }}>
            <TouchableOpacity
             onPress={() => {
              const index = i * horizontalAmount + j;
              const isSelected = selectedButtons.includes(index);
              let newSelectedButtons;
            
              if (isSelected) {
                newSelectedButtons = selectedButtons.filter((item) => item !== index);
              } else {
                newSelectedButtons = [...selectedButtons, index];
              }
            
              setSelectedButtons(newSelectedButtons);
              saveButtons(newSelectedButtons); // Save the selected buttons
              console.log(newSelectedButtons);
              const selectedCount = newSelectedButtons.length;
            
              if (selectedCount === 0) {
                onPress('TrapFailed');
              } else if (selectedCount === 1) {
                onPress('FivePoints');
              } else if (selectedCount === 2) {
                onPress('TenPoints');
              } else if (selectedCount === 3) {
                onPress('FifteenPoints');
              }
            }}
            >
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
      <View style={styles.columnTitleContainer1}>
        {columnTitles.map((title, index) => (
          <Text key={index} style={styles.columnTitle}>
            {title}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.subViews}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterContainer1}>
        {renderColumnTitles()}
        {generateButtons()}
      </View>
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
  counterContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    padding: 10,
    borderColor: "#A0A0A0",
    borderWidth: 1,
  },
  counterContainer1: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    padding: 10,
    borderColor: "#A0A0A0",
    borderWidth: 1,
  },
  columnTitleContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginRight: " 10%",
  },
  columnTitleContainer1: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: "2%",
  },
  columnTitle: {
    justifyContent: "flex-end", 
    marginRight: 10,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    color: "#555",
    alignSelf: "flex-start",  },
  rowTitle: {
    marginRight: "12%",
  },
  subViews: {
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    marginLeft: "5%",  },
});