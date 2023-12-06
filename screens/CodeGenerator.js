import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import Icon2 from "react-native-vector-icons/AntDesign";
import { encodePitData } from "../logic/EncodingLogic";
import { loadPitData } from "../logic/PitLogic";
import { loadMatchCount, loadTeamData, loadTeams, saveMatchCount } from "../logic/TeamLogic";
import { loadMatchData } from "../logic/MatchLogic";
/*function CodeGeneratorRaph({ route }) {
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


  // Store the current team's data
  useEffect(() => {
    const currentData = pitModels.find((pitData) => pitData.teamNumber === currentTeamNumber);
    setCurrentTeamData(currentData);
  }, [pitModels, currentTeamNumber]);

  const refreshData = async () => {
    loadPitData();
  };

  const [encodedData, setEncodedData] = useState([]);
  const [displayQR, setDisplayQR] = useState(false);
  const handleEncoding = async () => {
    try {
      await refreshData();
      const encodedData = await encodePitData(currentTeamData);
      await setEncodedData(encodedData);
      await AsyncStorage.setItem('encodedData', JSON.stringify(encodedData));
      setDisplayQR(true);
      // console.log(Object.keys(JSON.stringify(currentTeamData, 2, null)).length)
      // console.log(Object.keys(JSON.stringify(encodePitData, 2, null)).length)
    } catch (error) {
      console.error('Error encoding or saving data:', error);
    }
  };
  


  return (
    

    <View>

    {currentTeamData === undefined ? (
      <Text>No data found for Team {currentTeamNumber} </Text>
    ): (
      <View>    

        <View style={styles.topContainer}>
          <TouchableOpacity onPress={handleEncoding}>
            <View style={styles.loadButton}>
              <Text style={styles.buttonText}>Load QR</Text>
              <Icon2 name={'qrcode'} color={'black'} size={30} />
            </View>
          </TouchableOpacity>
        </View>

        {displayQR ? (
            <View style={styles.scrollStyle}>
              <QRCode value={JSON.stringify(encodedData, null, 2)} size={300} logo={logoFromFile} logoSize={75} />
            </View>
             
        ):(
          <Text>Press to Generate QR code</Text>
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
      )}
    </View>
  );
}*/

function CodeGeneratorDebug({ route }) {
  useEffect(() => {
    handlshowdata();
  }, []);
  const { currentTeamNumber } = route.params;
  const [currentTeamData, setCurrentTeamData] = useState([]);

  const handlshowdata = async () => {
    setCurrentTeamData(await loadPitData(currentTeamNumber));
  };

  return (
    <View>
      <Button title="updateData" onPress={handlshowdata} />
      <Text>{currentTeamNumber}</Text>
      <Text>{JSON.stringify(currentTeamData)}</Text>
    </View>
  );
}

function CodeGenerator({ route }) {
  let logoFromFile = require("../assets/logo.png");
  const { currentTeamNumber } = route.params;
  const [currentTeamData, setCurrentTeamData] = useState([]);
  const [currentMatchData, setCurrentMatchData] = useState([]);
  const [displayQR, setDisplayQR] = useState(false);
  const [handle3, setHandle3] = useState(0);
  useEffect(() => {
    loadDataForQR();
    
  }, []);

  const handle = async () => {
    saveMatchCount(currentTeamNumber);
    setHandle3(await loadMatchCount(currentTeamNumber));

  }
  const loadDataForQR = async () => {
    setCurrentTeamData(await loadPitData(currentTeamNumber));
    setCurrentMatchData(await loadMatchData(currentTeamNumber, 1));
    setHandle3(await loadMatchCount(currentTeamNumber));
    console.log(await loadTeams());
    };

  const LoadQR = () => {
    setDisplayQR(true);
  }

  return (
    <View>
    {currentTeamData === undefined ? (
      <Text>No data found for Team {currentTeamNumber} </Text>
    ): (
      <ScrollView>    

        <View style={styles.topContainer}>
          <TouchableOpacity onPress={LoadQR}>
            <View style={styles.loadButton}>
              <Text style={styles.buttonText}>Load QR</Text>
              <Icon2 name={'qrcode'} color={'black'} size={30} />
            </View>
          </TouchableOpacity>
          {displayQR ? (
          <View style={styles.scrollStyle}>
              <QRCode value={JSON.stringify(currentTeamData, null, 2)} size={300} logo={logoFromFile} logoSize={75} />
              <Text>             </Text>
              <QRCode value={JSON.stringify(currentMatchData, null, 2)} size={300} logo={logoFromFile} logoSize={75} />
              <Text>{JSON.stringify(currentTeamData)}</Text>
              <Text>{JSON.stringify(currentMatchData)}</Text>
              <Text>             </Text>
              <Text> {JSON.stringify(handle3)}</Text>
              <Button title="addMatch" onPress={handle} />
              
            </View>):(<View></View>)}
        </View>
        </ScrollView>
      )}
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
    backgroundColor: "#F6EB14",
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
    }),
    margin: 50,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  scrollStyle: {
    alignItems: "center",
    justifyContent: "flex-end",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    padding: 10,
    ...Platform.select({
      ios: {
        borderRadius: 5,
      },
    }),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
    }),
    padding: 20,
    alignItems: "center",
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
    backgroundColor: "#F6EB14",
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
    }),
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  closeButtonText: {
    color: "white",
  },

  dataButton: {
    width: 200,
    flexDirection: "row",
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6EB14",
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
    }),
    margin: 50,
  },
});
