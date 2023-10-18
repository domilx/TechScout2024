
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import PitModel from '../Models/pit';
import DropDownPicker from 'react-native-dropdown-picker';

function Pits({ navigation }) {


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


    // DropDown picker 
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: '1 year', value: '1'},
      {label: '2 years', value: '2'},
      {label: '3 years', value: '3'}
    ]);

  const pitModelNames = Object.keys(PitModel);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top', paddingTop: 30, backgroundColor: '#F0F5FF' }}>

<ScrollView>
  <Text>Pit fields....</Text>

    <View style={styles.container}>
      <TextInput style={styles.input} placeholder={pitModelNames[0]} />
      <TextInput style={styles.input} placeholder={pitModelNames[1]} />
      
    {/* DropDown picker - driver experience*/}
    <DropDownPicker
    style={styles.dropDown}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />

    {/* First game piece counter */}
    <View style={styles.counters}>
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
    </View>



  
      <TouchableOpacity>  
        <View style={{width: 200, height: 60, justifyContent: "center", alignItems: "center", 
        backgroundColor:"#F6EB14", borderRadius: "10", margin: 50}}>
          <Text style={{fontSize: "30", fontWeight: "bold"}}>SAVE</Text>
        </View>
      </TouchableOpacity>

      </View>
      </ScrollView>
    </View>

    );
  }

  const styles = StyleSheet.create({

    text:{
      fontSize: 18,
      fontWeight: "bold", 
      textAlign: 'center',
    },

    container: {
      flex: 1,
      paddingTop: 30,
      justifyContent: 'top',
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: 300,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 5,
      borderWidth: 2,
      
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


  });


export default Pits;