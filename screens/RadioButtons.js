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
export const ExtraNotes = ({
  columnTitles,
  onPress,
  saveButtons,
  value,
}) => {
  // Initialize state for each row separately
  const [selectedButtonsRow1, setSelectedButtonsRow1] = useState(value.slice(0, 5));
  const [selectedButtonsRow2, setSelectedButtonsRow2] = useState(value.slice(5));

  const generateButtons = () => {
    const buttons = [];

    // Row with 5 columns
    const row1 = [];
    for (let j = 0; j < 5; j++) {
      const index = j;
      row1.push(
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleButtonPressRow1(index)}
        >
          <Icon
            name={
              selectedButtonsRow1.includes(index)
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={32}
            color={"#333"}
          />
        </TouchableOpacity>
      );
    }
    buttons.push(
      <View key={0} style={styles.rowContainer}>
        {row1}
      </View>
    );

    // Row with 3 columns
    const row2 = [];
    for (let j = 0; j < 3; j++) {
      const index = j + 5;
      row2.push(
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleButtonPressRow2(index)}
        >
          <Icon
            name={
              selectedButtonsRow2.includes(index)
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={32}
            color={"#333"}
          />
        </TouchableOpacity>
      );
    }
    buttons.push(
      <View key={1} style={styles.rowContainer}>
        {row2}
      </View>
    );

    return buttons;
  };

  const handleButtonPressRow1 = (index) => {
    const isSelected = selectedButtonsRow1.includes(index);
    let newSelectedButtons;

    if (isSelected) {
      newSelectedButtons = selectedButtonsRow1.filter((item) => item !== index);
    } else {
      newSelectedButtons = [...selectedButtonsRow1, index];
    }

    setSelectedButtonsRow1(newSelectedButtons);
    handleButtonPress(newSelectedButtons); // Call the common handler
  };

  const handleButtonPressRow2 = (index) => {
    const isSelected = selectedButtonsRow2.includes(index);
    let newSelectedButtons;

    if (isSelected) {
      newSelectedButtons = selectedButtonsRow2.filter((item) => item !== index);
    } else {
      newSelectedButtons = [...selectedButtonsRow2, index];
    }

    setSelectedButtonsRow2(newSelectedButtons);
    handleButtonPress(newSelectedButtons); // Call the common handler
  };

  const handleButtonPress = (newSelectedButtons) => {
    saveButtons([...selectedButtonsRow1, ...selectedButtonsRow2]); // Save the combined selected buttons
    console.log([...selectedButtonsRow1, ...selectedButtonsRow2]);

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
  };

  const renderColumnTitles = () => (
    <View style={styles.columnTitleContainer2}>
      <Text style={styles.columnTitle1}>
        {columnTitles}
      </Text>
    </View>
  );

  return (
    <View style={styles.subViews}>
      <View style={styles.counterContainer}>
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
  button: {
    marginRight: 10,
    marginLeft: 20,
    marginBottom: 5,
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
  columnTitleContainer2: {
    flexDirection: "center",
    marginBottom: 10,
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
  columnTitle1: {
    justifyContent: "flex-end", 
    marginRight: 10,
    marginLeft: 10,
    fontWeight: "bold",
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