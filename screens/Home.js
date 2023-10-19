import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { saveData, loadData } from '../logic/TeamLogic';

// Example usage
const saveExampleData = async () => {
  const data = { name: 'John', age: 30 };
  await saveData('userData', data);
  console.log('Data saved.');
};

const loadExampleData = async () => {
  const data = await loadData('userData');
  if (data) {
    console.log('Loaded data:', data);
  } else {
    console.log('No data found.');
  }
};



const HomeScreen = () => {
  const navigation = useNavigation();
  const [buttonCount, setButtonCount] = useState(1);
  const navigateToTeam = () => {
    navigation.navigate("3990");
  };

  const addNewTeam = (x) => {
    setButtonCount(buttonCount + 1)
  };

  const renderButtons = () => {
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push(
        <TouchableOpacity key={i} onPress={navigateToTeam}>
          <View style={styles.button}>
            <Text style={styles.boldText}>{3990}</Text>
            <Icon name="arrow-forward-outline" size={30} color="#1E1E1E" style={styles.icon} />
          </View>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

  return (
    <View style={styles.container}>
      {renderButtons()}
      <Button title="Save Example Data" onPress={saveExampleData} />
      <Button title={{loadExampleData}} onPress={loadExampleData} />
      <FloatingButton />
    </View>
  );
  function FloatingButton() {
    const handleButtonPress = () => {
        Alert.prompt(
            'Team Number',
            'Enter the number of the team to scout:',
            (number) => {
                if (number) {
                    alert('You entered: ' + number);
                    addNewTeam(number);
                }
            },    
            'plain-text',
            '',
            'numeric',
  
        );
    }
  
    return (
        <View style={styles.floatingButton}>
            <TouchableOpacity onPress={handleButtonPress}>
                <Icon name="add" size={30} color="#F6EB14" />
            </TouchableOpacity>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#F0F5FF",
  },
  button: {
    flexDirection: "row", 
    alignItems: "center", 
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  icon: {
    marginLeft: 150, 
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
},
});

export default HomeScreen;
