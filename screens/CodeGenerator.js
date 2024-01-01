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
import { useIsFocused } from "@react-navigation/native";
import {
  loadMatchData,
  saveMatchScanned,
  isMatchScanned,
} from "../logic/MatchLogic";
import { isPitScanned, savePitScanned } from "../logic/PitLogic";
import Swiper from "react-native-swiper";
import * as Haptics from "expo-haptics";
import Icon from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { initialPitData } from "../Models/PitModel";

function CodeGenerator({ route }) {
  let logoFromFile = require("../assets/logo.png");
  const [currentPitData, setCurrentPitData] = useState([]);
  const [MatchModalState, setMatchModalState] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [items, setItems] = useState([]);
  const { currentTeamNumber } = route.params;
  const [loading, setLoading] = useState(true);
  const [matchCount, setMatchCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);

    const loadDataForQR = async () => {
      try {
        const pitData = await loadPitData(currentTeamNumber);
        const currentMatchCount = await loadMatchCount(currentTeamNumber);
        const PitScanState = await isPitScanned(currentTeamNumber);
        // Check if matchCount is a positive integer before proceeding
        if (Number.isInteger(currentMatchCount) && currentMatchCount > 0) {
          const loadedItems = {};
          const matchDataPromises = Array.from(
            { length: currentMatchCount },
            async (_, i) => {
              const matchData = await loadMatchData(currentTeamNumber, i + 1);
              loadedItems[`MatchData${i + 1}`] = matchData;
            }
          );
          await Promise.all(matchDataPromises);
          setIsClicked(!PitScanState);
          console.log(PitScanState);
          setMatchCount(currentMatchCount);
          setCurrentPitData(pitData);
          setItems(loadedItems);
          setLoading(false);
          //console.log(items);
        } else {
          // Handle the case where matchCount is not a positive integer
          setIsClicked(!PitScanState);
          setMatchCount(currentMatchCount);
          setCurrentPitData(pitData);
          setLoading(false);
          //console.log(items);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadDataForQR();
  }, [currentTeamNumber, isFocused]);

  if (loading) {
    return <Text>LOADING ...</Text>;
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
            <Text style={styles.boldText}>
              Match {JSON.stringify(items[matchKey].MatchNumber)}
            </Text>
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

  const handleMatchScanned = async (MatchNumber) => {
    try {
      await saveMatchScanned(currentTeamNumber, MatchNumber);

      // Continue with the rest of your code
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  const handlePitScanned = async () => {
    try {
      await savePitScanned(currentTeamNumber, true);
      setIsClicked(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getMatchScanned = async (MatchNumber) => {
    try {
      const saveMatch1 = await isMatchScanned(currentTeamNumber, MatchNumber);
      return saveMatch1;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.topContainer}>
      <Text style={styles.tittleText}>
        Pit Data for team {currentTeamNumber}
      </Text>
      {JSON.stringify(currentPitData) == JSON.stringify(initialPitData) ? (
        <Placeholder />
      ) : (
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode
            value={JSON.stringify(currentPitData, null, 2)}
            size={300}
            logo={logoFromFile}
            logoSize={75}
          />
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "baseline" }}
            onPress={() => handlePitScanned()}
          >
            <Text style={styles.scannedText}>Was Scanned</Text>
            <Icon3
              color="#1E1E1E"
              name={isClicked ? "checkbox-blank-outline" : "checkbox-marked"}
              size={30}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setMatchModalState(true)}
        style={styles.openModal}
      >
        <Text style={styles.buttonsText}>
          Match Data for team {currentTeamNumber}
        </Text>
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
          <Text style={styles.tittleText}>
            Match Data for team {currentTeamNumber}
          </Text>
        </View>
        <View style={styles.modalContainer}>
          {matchCount == 0 ? (
            <Placeholder />
          ) : (
            <SliderBox items={items}></SliderBox>
          )}
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "baseline" }}
            onPress={() => setIsClicked(!isClicked)}
          >
            <Text style={styles.scannedText}>Was Scanned</Text>
            <Icon3
              color="#1E1E1E"
              name={isClicked ? "checkbox-blank-outline" : "checkbox-marked"}
              size={30}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
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
    paddingBottom: 10,
  },

  scannedText: {
    fontWeight: "400",
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 4,
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
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
