import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import Icon2 from "react-native-vector-icons/AntDesign";
import { encodePitData } from "../logic/EncodingLogic";
import { loadPitData } from "../logic/PitLogic";
import {
  loadMatchCount,
  loadTeamData,
  loadTeams,
  saveMatchCount,
} from "../logic/TeamLogic";
import { useIsFocused } from '@react-navigation/native';
import { loadMatchData } from "../logic/MatchLogic";
import Swiper from "react-native-swiper";
import * as Haptics from "expo-haptics";
import Icon from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { initialMatchData } from "../Models/MatchModel";
import { initialPitData } from "../Models/PitModel";
function CodeGenerator({ route }) {
  let logoFromFile = require("../assets/logo.png");
  const [currentPitData, setCurrentPitData] = useState([]);
  const [MatchModalState, setMatchModalState] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [items, setItems] = useState([]);
  const {currentTeamNumber} = route.params;
  const [loading, setLoading] = useState(true);
  const [matchCount, setMatchCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    const loadDataForQR = async () => {
      try {
        const pitData = await loadPitData(currentTeamNumber);
        const currentMatchCount = await loadMatchCount(currentTeamNumber);
        //setMatchCount(await loadMatchCount(currentTeamNumber));
        const loadedItems = {};
        if (Number.isInteger(currentMatchCount) && currentMatchCount > 0) {
          const matchDataPromises = Array.from({ length: matchCount }, async (_, i) => {
            const matchData = await loadMatchData(currentTeamNumber, i + 1);
            loadedItems[`MatchData${i + 1}`] = matchData;
          });
          await Promise.all(matchDataPromises);
        }
        setMatchCount(currentMatchCount);
        setCurrentPitData(pitData);
        setItems(loadedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
  
    loadDataForQR();
  }, [currentTeamNumber, isFocused]);
  
  if (loading) {
    return <Text></Text>;
  }

  const closeModal = () => {
    setMatchModalState(false);
    Haptics.impactAsync(Haptics.NotificationFeedbackType.Medium);
  };

  const SliderBox = ({ items }) => {
    return (
      <Swiper style={styles.wrapper} loop={false}>
  {Object.keys(items).map((matchKey, index) => (
    <View key={index} style={styles.slide}>
      <QRCode
        value={JSON.stringify(items[matchKey], null, 2)}
        size={300}
        logo={logoFromFile}
        logoSize={75}
      />
    </View>
  ))}
</Swiper>

    );
  };
  const Placeholder = () => {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.boldText}>Nothing Saved</Text>
      </View>
    );
  };

  return (
    <View style={styles.topContainer}>
      <TouchableOpacity onPress={() => setIsClicked(!isClicked)}>

      
        <Text style={styles.tittleText}>
          Pit Data{" "}
          {JSON.stringify(currentPitData) == JSON.stringify(initialPitData) ? ":" :  <Icon3
            color="#1E1E1E"
            name={isClicked ? "checkbox-blank-outline" : "checkbox-marked"}
            size={30}
            style={styles.iconStyle}
          />}
         
        </Text>
      </TouchableOpacity>
      {JSON.stringify(currentPitData) == JSON.stringify(initialPitData) ? <Placeholder /> : <QRCode
        value={JSON.stringify(currentPitData, null, 2)}
        size={300}
        logo={logoFromFile}
        logoSize={75}
      />}
      

      <TouchableOpacity
        onPress={() => setMatchModalState(true)}
        style={styles.openModal}
      >
        <Text style={styles.buttonsText}>QR for Matches </Text>
        <Icon
          name={"arrow-forward"}
          color={"#1E1E1E"}
          size={30}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={MatchModalState}
        onBackdropPress={closeModal}
        style={styles.modalScreen}
      >
        <View style={styles.tittleContainer}>
          <Text style={styles.tittleText}>Matches</Text>
        </View>
        <View style={styles.modalContainer}>
        {matchCount == 0 ? <Placeholder /> : <SliderBox items={items}></SliderBox>}
        </View>
        <View style={styles.returnContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
            <Icon
              name={"arrow-back-outline"}
              color={"#1E1E1E"}
              size={30}
              style={styles.iconStyle}
            />
            <Text style={styles.buttonsText}>QR for Pitscouting</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

function CodeGeneratorDebug({ route }) {
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
  };
  const loadDataForQR = async () => {
    setCurrentTeamData(await loadPitData(currentTeamNumber));
    setCurrentMatchData(await loadMatchData(currentTeamNumber, 1));
    setHandle3(await loadMatchCount(currentTeamNumber));
    console.log(await loadTeams());
  };

  const LoadQR = () => {
    setDisplayQR(true);
  };

  return (
    <View>
      {currentTeamData === undefined ? (
        <Text>No data found for Team {currentTeamNumber} </Text>
      ) : (
        <ScrollView>
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={LoadQR}>
              <View style={styles.loadButton}>
                <Text style={styles.buttonText}>Load QR</Text>
                <Icon2 name={"qrcode"} color={"black"} size={30} />
              </View>
            </TouchableOpacity>
            {displayQR ? (
              <View style={styles.scrollStyle}>
                <QRCode
                  value={JSON.stringify(currentTeamData, null, 2)}
                  size={300}
                  logo={logoFromFile}
                  logoSize={75}
                />
                <Text> </Text>
                <QRCode
                  value={JSON.stringify(currentMatchData, null, 2)}
                  size={300}
                  logo={logoFromFile}
                  logoSize={75}
                />
                <Text>{JSON.stringify(currentTeamData)}</Text>
                <Text>{JSON.stringify(currentMatchData)}</Text>
                <Text> </Text>
                <Text> {JSON.stringify(handle3)}</Text>
                <Button title="addMatch" onPress={handle} />
              </View>
            ) : (
              <View></View>
            )}
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
    flex: 1,
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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
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
  popup: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: "95%",
    backgroundColor: "#F6EB14",

    borderWidth: 2,
    borderRadius: 10,
    borderColor: "",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  placeholder: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 30,
  },

  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 25,
    backgroundColor: "#1E1E1E",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalScreen: {
    backgroundColor: "white",
    margin: 0,
  },

  modalContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  tittleContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },

  returnContainer: {
    height: 200,
    width: "100%",
    paddingBottom: 100,
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  closeModal: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6EB14",
  },
  openModal: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6EB14",
    marginTop: 50,
  },

  iconStyle: {
    marginRight: 10,
  },

  buttons: {
    marginTop: 20,
    width: 200,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6EB14",
  },

  buttonsText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  tittleText: {
    fontSize: 42,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
