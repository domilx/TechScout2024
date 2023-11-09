
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Vibration, StyleSheet, ScrollView, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PitModel from '../screens/pitModel';
import DropDownPicker from 'react-native-dropdown-picker';



DropDownPicker.setListMode("MODAL");


function Pits({ navigation }) {

  
  // Model saving logic
  const [newPitData, setNewPitData] = useState(PitModel); // Save the data using PitModel model

  
  // save pit data to Async Storage
    const savePitData = async () => {
      try {
        const existingPitModels = await AsyncStorage.getItem('pitModels');
        
        const pitModels = existingPitModels ? JSON.parse(existingPitModels) : [];
  
        // Add the new Pit Model instance to the array
        pitModels.push(newPitData);
        // Retourner les nouveaux models dans le AsyncStorage
        await AsyncStorage.setItem('pitModels', JSON.stringify(pitModels));
        
        alert('Data saved to AsyncStorage');
        Vibration.vibrate()
      } catch (error) {
        console.error('Error saving Pit Data:', error);
      }
    };

  // dropdown selection rendering options 
  const [DriveTypeOpen, setDriveTypeOpen] = useState(false);
  const [DriveMotorOpen, setDriveMotorOpen] = useState(false);
  const [DriverExperienceOpen, setDriverExperienceOpen] = useState(false);

  // True or false switches -- setting state and pushing to the model
    // first game piece
    const [isGamePiece1, setIsGamePiece1] = useState(true);
  
    const toggleGamePiece1 = () => {
      setIsGamePiece1((previousState) => !previousState);
      setNewPitData({ ...newPitData, GamePiece1: isGamePiece1 })
      
    };
  
    // second game piece
    const [isGamePiece2, setIsGamePiece2] = useState(true);
    const toggleGamePiece2 = () => {
      setIsGamePiece2((previousState) => !previousState);
      setNewPitData({ ...newPitData, GamePiece2: isGamePiece2 })
    };

    // auto objectives
    const [isAutoObj1, setIsAutoObj1] = useState(true);
  
    const toggleAutoObj1 = () => {
      setIsAutoObj1((previousState) => !previousState);
      setNewPitData({ ...newPitData, AutoObj1: isAutoObj1 })
    };

    const [isAutoObj2, setIsAutoObj2] = useState(true);
  
    const toggleAutoObj2 = () => {
      setIsAutoObj2((previousState) => !previousState);
      setNewPitData({ ...newPitData, AutoObj2: isAutoObj2 })
    };

    // End game objective 1 
    const [isEndGameObj1, setisEndGameObj1] = useState(true);
  
    const toggleEndGameObj1 = () => {
      setisEndGameObj1((previousState) => !previousState);
      setNewPitData({ ...newPitData, EndGameObj1: isEndGameObj1 })
    };

    // End game objective 2 
    const [isEndGameObj2, setisEndGameObj2] = useState(true);
  
    const toggleEndGameObj2 = () => {
      setisEndGameObj2((previousState) => !previousState);
      setNewPitData({ ...newPitData, EndGameObj2: isEndGameObj2 })
    };

  // DropDown selector item values
  const [DriveType, setDriveType] = useState(null);
  const [driveTypes, setType] = useState([
    {label: 'Swerve', value: 'Swerve'},
    {label: 'Tank 4 wheel', value: 'Tank 4 wheel'},
    {label: 'Tank 6 wheel', value: 'Tank 6 wheel'},
    {label: 'Tank 8 wheel', value: 'Tank 8 wheel'},
    {label: 'Other', value: 'Other'}
  ]);

  const [DriveMotor, setDriveMotor] = useState(null);
  const [driveMotors, setMotor] = useState([
    {label: 'FALCON', value: 'FALCON'},
    {label: 'NEO', value: 'NEO'},
    {label: 'KRAKEN', value: 'KRAKEN'},
    {label: 'CIM', value: 'CIM'},
    {label: 'MINI CIM', value: 'MINI CIM'}
  ]);



  const [DriverExperience, setDriverExperience] = useState(null);
  const [Experiences, setExperience] = useState([
    {label: '1 year', value: '1'},
    {label: '2 years', value: '2'},
    {label: '3 years', value: '3'},
    {label: '4 years', value: '4'},
  ]);



  // counters for game piece scoring
    const [PieceOneCount, setPieceOneCount] = useState(0);
    const increment1 = () => {
      setPieceOneCount(PieceOneCount + 1);
    };
    const decrement1 = () => {
      if (PieceOneCount > 0 ){
        setPieceOneCount(PieceOneCount - 1);
      }
    };




    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top', paddingTop: 30, backgroundColor: '#F0F5FF' }}>

<ScrollView
  showsHorizontalScrollIndicator = {false}
  showsVerticalScrollIndicator = {false}
  keyboardDismissMode = {"on-drag"}
>
      <Text style = {styles.text}>Team Scouting</Text>
      <View style = {styles.subViews}>
        

          <TextInput
        keyboardType='number-pad'
        maxLength={4}
        style = {styles.input}
        placeholder="Team Number"
        value={newPitData.teamNumber}
        onChangeText={(text) => setNewPitData({ ...newPitData, teamNumber: text.toString() })}
        />

            <TextInput
        style = {styles.input}
        placeholder="Team Name"
        value={newPitData.teamName}
        onChangeText={(text) => setNewPitData({ ...newPitData, teamName: text })}
        />
      </View>

      <Text style = {styles.text}>Robot Scouting</Text>
      <View style = {styles.subViews}>
        
            <TextInput
          style = {styles.input}
          maxLength={3}
          keyboardType='number-pad'
          placeholder="Robot Width"
          value={newPitData.RobotWidth}
          onChangeText={(text) => setNewPitData({ ...newPitData, RobotWidth: text.toString() })}
          />

        <TextInput
          style = {styles.input}
          maxLength={3}
          keyboardType='number-pad'
          placeholder="Robot Length"
          value={newPitData.RobotLength}
          onChangeText={(text) => setNewPitData({ ...newPitData, RobotLength: text })}
          />
        <TextInput
          style = {styles.input}
          keyboardType='decimal-pad'
          placeholder="Robot Weight"
          value={newPitData.RobotWeight}
          onChangeText={(text) => setNewPitData({ ...newPitData, RobotWeight: text })}
          />

        <TextInput
          style = {styles.inputMultiLine}
          multiline={true}
          placeholder="Scout Notes"
          value={newPitData.ScoutNotes}
          onChangeText={(text) => setNewPitData({ ...newPitData, ScoutNotes: text.toString() })}
          />
      </View>
      
      {/* DropDown selector debug */}
      <Text style = {styles.text}>DropDown Selectors</Text>
      <View style = {styles.subViews}>
            {/* Drive base type selection */}
            <DropDownPicker
            containerStyle={styles.dropDownContainer}
            placeholder='Select a Drivebase Type'
            modalTitle="Select a Drivebase Type"
            closeAfterSelecting = {false}
            itemSeparator={true}
            modalProps={{
              animationType: "fade"
            }}
            // Styles
            modalContentContainerStyle={styles.modalContentContainerStyle}
            modalTitleStyle={styles.modalTitleStyle}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            selectedItemLabelStyle={styles.selectedItemLabelStyle}
            listItemLabelStyle={styles.listItemLabelStyle}
            placeholderStyle={styles.placeholderStyle}

            // input handling
            zIndex={3000}
            zIndexInverse={1000}
            open={DriveTypeOpen}
            value={DriveType}
            items={driveTypes}
            setOpen={setDriveTypeOpen}
            setValue={setDriveType}
            setItems={setType}
            onChangeValue={(DriveType) => setNewPitData({ ...newPitData, DriveType: DriveType })}

          />
            {/* Drive base type selection */}
            <DropDownPicker
            containerStyle={styles.dropDownContainer}
            placeholder='Select a Drivebase Motor Type'
            modalTitle="Select a Drivebase Motor Type"
            closeAfterSelecting = {false}
            modalProps={{
              animationType: "fade"
       
            }}
            // Styles
            modalContentContainerStyle={styles.modalContentContainerStyle}
            modalTitleStyle={styles.modalTitleStyle}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            selectedItemLabelStyle={styles.selectedItemLabelStyle}
            listItemLabelStyle={styles.listItemLabelStyle}
            placeholderStyle={styles.placeholderStyle}

            zIndex={2000}
            zIndexInverse={2000}
            open={DriveMotorOpen}
            value={DriveMotor}
            items={driveMotors}
            setOpen={setDriveMotorOpen}
            setValue={setDriveMotor}
            setItems={setMotor}
            onChangeValue={(DriveMotor) => setNewPitData({ ...newPitData, DriveMotors: DriveMotor })}
          />

            {/* Driver experience selection */}
            <DropDownPicker
            containerStyle={styles.dropDownContainer}
            placeholder="Select the Driver's Experience"
            modalTitle="Select the Driver's Experience"
            closeAfterSelecting = {false}
            modalProps={{
              animationType: "fade"
       
            }}
            // Styles
            modalContentContainerStyle={styles.modalContentContainerStyle}
            modalTitleStyle={styles.modalTitleStyle}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            selectedItemLabelStyle={styles.selectedItemLabelStyle}
            listItemLabelStyle={styles.listItemLabelStyle}
            placeholderStyle={styles.placeholderStyle}

            zIndex={1000}
            zIndexInverse={3000}
            open={DriverExperienceOpen}
            value={DriverExperience}
            items={Experiences}
            setOpen={setDriverExperienceOpen}
            setValue={setDriverExperience}
            setItems={setExperience}
            onChangeValue={(DriverExperience) => setNewPitData({ ...newPitData, DriverExperience: DriverExperience })}
          />
      </View>

      <Text style={styles.text}>Toggle Switches</Text>
      <View style = {styles.switchContainer}>
        <Text>Game Piece 1 ability</Text>
        <Switch
          trackColor={{ false: 'gray', true: 'green' }}
          thumbColor={isGamePiece1 ? 'white' : 'white'}
          ios_backgroundColor="red"
          onValueChange={toggleGamePiece1}
          value={!isGamePiece1}
          
        />
      </View>
      <View style = {styles.switchContainer}>
        <Text>Game Piece 2 ability</Text>
        <Switch
          trackColor={{ false: 'gray', true: 'green' }}
          thumbColor={isGamePiece2 ? 'white' : 'white'}
          ios_backgroundColor="red"
          onValueChange={toggleGamePiece2}
          value={!isGamePiece2}
          
        />
      </View>
      
      <View style = {styles.switchContainer}>
        <Text>Auto Objective 1 ability</Text>
        <Switch
          trackColor={{ false: 'gray', true: 'green' }}
          thumbColor={isAutoObj1 ? 'white' : 'white'}
          ios_backgroundColor="red"
          onValueChange={toggleAutoObj1}
          value={!isAutoObj1}
          
        />
      </View>

      <View style = {styles.switchContainer}>
        <Text>Auto Objective 2 ability</Text>
        <Switch
          trackColor={{ false: 'gray', true: 'green' }}
          thumbColor={isAutoObj2 ? 'white' : 'white'}
          ios_backgroundColor="red"
          onValueChange={toggleAutoObj2}
          value={!isAutoObj2}
          
        />
      </View>

      <View style = {styles.switchContainer}>
        <Text>End Game Objective 1 ability</Text>
        <Switch
          trackColor={{ false: 'gray', true: 'green' }}
          thumbColor={isEndGameObj1 ? 'white' : 'white'}
          ios_backgroundColor="red"
          onValueChange={toggleEndGameObj1}
          value={!isEndGameObj1}
          
        />
      </View>

      <View style = {styles.switchContainer}>
        <Text>End Game Objective 2 ability</Text>
        <Switch
          trackColor={{ false: 'gray', true: 'green' }}
          thumbColor={isEndGameObj2 ? 'white' : 'white'}
          ios_backgroundColor="red"
          onValueChange={toggleEndGameObj2}
          value={!isEndGameObj2}
          
        />
      </View>


      <TouchableOpacity onPress={savePitData}>  
        <View style={styles.saveButton}>
          <Text style={styles.text}>Save to Async</Text>
        </View>
      </TouchableOpacity>




    {/* Counter example */}
    {/* <View style={styles.counters}>
      <Text style={styles.text}>Counter: {PieceOneCount}</Text>
      <View style = {{flexDirection: "row", justifyContent: "center"}}>

        <TouchableOpacity onPress={decrement1}>
        <View style={styles.counterButton}>
          <Text style={styles.counterButtonText}>-</Text>
        </View>
      </TouchableOpacity>

        <TouchableOpacity onPress={increment1}>
        <View style={styles.counterButton}>
          <Text style={styles.counterButtonText}>+</Text>
        </View>
      </TouchableOpacity>

      </View>
    </View> */}




      </ScrollView>
    </View>

    );
  }

  const styles = StyleSheet.create({

    text:{
      fontSize: 20,
      fontWeight: "bold", 
      textAlign: 'left',
      margin: 10
    },
    

    container: {
      flex: 1,
      paddingTop: 30,
      justifyContent: 'top',
      alignItems: 'center',
    },


    dropDown: {
      height: 40,
      width: 300,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 5,
      borderWidth: 2,
    },

    counters: {
      width: 300,
      height: 120,
      paddingTop: 10,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 5,
      borderWidth: 2,
    },

    counterButton: {
      backgroundColor: "#00AA44",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      width: 100,
      height: 50,
      margin: 10,
      justifyContent: "center"
    },

    counterButtonText: {
      fontSize: 40,
      fontWeight: "bold"

    },

    subViews:{
      width: 350,
      alignContent: "center",
      alignItems: "center",
      borderWidth: 2,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      borderWidth: 3,
    },

    switchContainer:{
      flexDirection: "row",
      justifyContent: "space-between",
      width: 300,
      alignContent: "center",
      textAlign: "left",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 15,
      marginLeft: 10,
      paddingLeft: 30,
      paddingRight: 10,
      transform: [{ scale: 1.2}],
    },
    
    input: {
      fontSize: 16,
      fontWeight: "bold",
      height: 35,
      width: "100%",
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      paddingLeft: 10,
      borderRadius: 5,
      borderWidth: 2,
      
    },
    inputMultiLine: {
      fontSize: 16,
      fontWeight: "bold",
      maxHeight: 200,
      minHeight: 35,
      width: "100%",
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      paddingLeft: 10,
      borderRadius: 5,
      borderWidth: 2,
      
    },

    saveButton: {
      width: 200, 
      height: 50, 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor:"#F6EB14", 
      borderRadius: "10", 
      margin: 50},

    // DropDown picker Prop styles
    dropDownContainer: { 
      width: "95%", 
      backgroundColor: 'lightgray',
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 10,
      margin: 5
    },

    modalContentContainerStyle: {
      backgroundColor: "white"
    },

    modalTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },
    selectedItemContainerStyle: {
      backgroundColor: "#5edb76"
    },
    selectedItemLabelStyle:{
      fontWeight: "bold",
      fontSize: 20,
    },
    placeholderStyle: {
      color: "grey",
      fontWeight: "bold",
      fontSize: 16
    },
  
  });


export default Pits;





