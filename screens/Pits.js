import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Switch,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { savePitData } from '../logic/PitLogic';
import { initialPitData, DriveBaseType, DriveBaseMotor, DriverExperience, Stability } from '../Models/PitModel';

// Define the InputField component
const InputField = ({ label, value, onChange, keyboardType = 'default', maxLength = null }) => (
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

// Define the ToggleSwitch component
const ToggleSwitch = ({ label, onToggle, value }) => (
  <View style={styles.switchContainer}>
    <Text>{label}</Text>
    <Switch
      trackColor={{ false: 'gray', true: 'green' }}
      thumbColor={value ? 'white' : 'white'}
      onValueChange={onToggle}
      value={value}
    />
  </View>
);

// Define the DropDownSelector component
const DropDownSelector = ({ label, items, value, setValue }) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.subViews}>
      <Text style={styles.text}>{label}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        zIndex={5000}
        zIndexInverse={6000}
        containerStyle={styles.dropDownContainer}
        placeholderStyle={styles.placeholderStyle}
        modalContentContainerStyle={styles.modalContentContainerStyle}
      />
    </View>
  );
};

function Pits({ route }) {
  const { currentTeamNumber } = route.params;
  const [newPitData, setNewPitData] = useState(initialPitData);

  // Setter for text and number fields
  const setField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Setter for enum fields
  const setEnumField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  

  // Setter for boolean fields
  const setBooleanField = (field, value) => {
    setNewPitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Save function
  const handleSavePitData = async () => {
    await savePitData(newPitData, currentTeamNumber);
  };

  // Dropdown selector for DriveBaseType enum
  const driveBaseTypeItems = Object.keys(DriveBaseType).map((key) => ({
    label: DriveBaseType[key],
    value: DriveBaseType[key],
  }));

  // ... other components ...

  // FlatList data
  const data = [
    { key: 'Team Name', value: newPitData.RobTeamNm },
    { key: 'Robot Weight (lbs)', value: newPitData.RobWtlbs.toString() },
    { key: 'Drivebase Type', value: newPitData.RobDrive }, // Assuming RobDrive is the key for the Drivebase Type
    { key: 'Has Autonomy?', value: newPitData.RobQuest1.toString() },
    // Add more data items as needed
  ];

  return (
    <FlatList
    style={styles.container}
    data={data}
    keyExtractor={(item) => item.key}
    renderItem={({ item }) => (
      <View>
        {item.key === 'Team Name' && (
          <InputField
            label={item.key}
            value={item.value}
            onChange={(text) => setField('RobTeamNm', text)}
          />
        )}
        {item.key === 'Robot Weight (lbs)' && (
          <InputField
            label={item.key}
            value={item.value}
            onChange={(text) => setField('RobWtlbs', parseInt(text))}
            keyboardType="numeric"
          />
        )}
        {item.key === 'Drivebase Type' && (
          <DropDownSelector
            label={item.key}
            items={driveBaseTypeItems}
            value={item.value}
            setValue={(value) => setEnumField('RobDrive', value)}
          />
        )}
        {item.key === 'Has Autonomy?' && (
          <ToggleSwitch
            label={item.key}
            value={newPitData.RobQuest1}
            onToggle={(newValue) => setBooleanField('RobQuest1', newValue)}
          />
        )}
        {/* Add more conditions and components as needed */}
      </View>
    )}
    ListHeaderComponent={() => (
      <View>
        <Text style={styles.text}>Pit Scouting for Team {currentTeamNumber}</Text>
        {/* Add other components outside of the list header */}
      </View>
    )}
    ListFooterComponent={() => (
      <TouchableOpacity onPress={handleSavePitData}>
        <View style={styles.saveButton}>
          <Text style={styles.text}>Save Data</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    width: 100,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  subViews: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  dropDownContainer: {
    width: '90%',
    height: 40,
  },
  placeholderStyle: {
    color: 'grey',
  },
  modalContentContainerStyle: {
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#F6EB14',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },

  // DropDown picker Prop styles
  dropDownContainer: {
    width: "95%",
    backgroundColor: "lightgray",
    borderWidth: 2,
    borderColor: "black",
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
    }),
    margin: 5,
    zIndex: 5000,
  },

  modalContentContainerStyle: {
    backgroundColor: "white",
  },

  modalTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  selectedItemContainerStyle: {
    backgroundColor: "#5edb76",
  },
  selectedItemLabelStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  placeholderStyle: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Pits;
