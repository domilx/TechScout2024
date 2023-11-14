import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import Icon2 from 'react-native-vector-icons/AntDesign';


function CodeGenerator({ route }) {
  let logoFromFile = require('../assets/logo.png');

  const { currentTeamNumber } = route.params;

  const [pitModels, setPitModels] = useState([]);
  const [currentTeamData, setCurrentTeamData] = useState(null);

  useEffect(() => {
    loadPitData();
  }, []);

  const loadPitData = async () => {
    try {
      const existingPitModels = await AsyncStorage.getItem('pitModels');
      const pitModels = existingPitModels ? JSON.parse(existingPitModels) : [];
      setPitModels(pitModels);
    } catch (error) {
      console.error('Error loading Pit Data:', error);
    }
  };


  const [isModalVisible, setModalVisible] = useState(false);

  const toggleContent = () => {
    setModalVisible(!isModalVisible);
  };


  const refreshData = () => {
    loadPitData();
  };

  // Store the current team's data
  useEffect(() => {
    const currentData = pitModels.find((pitData) => pitData.teamNumber === currentTeamNumber);
    setCurrentTeamData(currentData);
  }, [pitModels, currentTeamNumber]);

  return (
    <View>

      <View style={styles.topContainer}>
        <TouchableOpacity onPress={refreshData}>
          <View style={styles.loadButton}>
            <Text style={styles.buttonText}>Load QR</Text>
            <Icon2 name={'qrcode'} color={'black'} size={30} />
          </View>
        </TouchableOpacity>
      </View>


     
        {/* QR code rendering */}
        {currentTeamData && (
          <View style={styles.scrollStyle}>
            <QRCode value={JSON.stringify(currentTeamData, null, 2)} size={300} logo={logoFromFile} logoSize={75} />
          </View>
        )}
      <View style={styles.scrollStyle}>
        <TouchableOpacity onPress={toggleContent}>
          <View style={styles.dataButton}>
            <Text style={styles.buttonText}>Show Data</Text>
          </View>
        </TouchableOpacity>
      </View>

        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleContent}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>{JSON.stringify(currentTeamData, null, 2)}</Text>
              <TouchableOpacity onPress={toggleContent} style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      
    </View>
  );
}

export default CodeGenerator;



const styles = StyleSheet.create({
  topContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  loadButton: {
      width: 200, 
      flexDirection: "row",
      height: 50, 
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: "space-between", 
      alignItems: "center", 
      backgroundColor:"#F6EB14", 
      ...Platform.select({
        ios: {
          borderRadius: 10,
        },}), 
      margin: 50},

  buttonText:{
    fontSize: 24,
    fontWeight: "bold"
  },

  scrollStyle: {
    alignItems: "center",
    justifyContent: "flex-end"
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    padding: 10,
    ...Platform.select({
      ios: {
        borderRadius: 5,
      },}),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },}),
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    minWidth: 200,
    width: "auto",
    height: 50, 
    paddingHorizontal: 20,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor:"#F6EB14", 
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },}), 
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  closeButtonText: {
    color: 'white',
  },

  dataButton: {
    width: 200, 
    flexDirection: "row",
    height: 50, 
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor:"#F6EB14", 
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },}),
    margin: 50},


    
  

})