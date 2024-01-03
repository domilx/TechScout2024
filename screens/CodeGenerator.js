import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import * as Haptics from "expo-haptics";
import { useIsFocused } from "@react-navigation/native";
import { encodePitData } from "../logic/EncodingLogic";
import { loadPitData, isPitScanned, savePitScanned } from "../logic/PitLogic";
import { loadMatchCount, loadTeamData, loadTeams, saveMatchCount } from "../logic/TeamLogic";
import { loadMatchData, saveMatchScanned, isMatchScanned } from "../logic/MatchLogic";
import { initialPitData } from "../Models/PitModel";

function CodeGenerator({ route }) {
  const [currentPitData, setCurrentPitData] = useState([]);
  const [MatchModalState, setMatchModalState] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchCount, setMatchCount] = useState(0);
  const isFocused = useIsFocused();
  const [isClickedArray, setIsClickedArray] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    setLoading(true);

    const loadDataForQR = async () => {
      try {
        const pitData = await loadPitData(route.params.currentTeamNumber);
        const currentMatchCount = await loadMatchCount(route.params.currentTeamNumber);
        const PitScanState = await isPitScanned(route.params.currentTeamNumber);
        const initialIsClickedArray = await Promise.all(
          Array(currentMatchCount).fill(0).map(async (_, i) => {
            const matchNumber = i;
            return await isMatchScanned(route.params.currentTeamNumber, matchNumber);
          })
        );

        if (Number.isInteger(currentMatchCount) && currentMatchCount > 0) {
          const loadedItems = {};
          const matchDataPromises = Array.from(
            { length: currentMatchCount },
            async (_, i) => {
              const matchData = await loadMatchData(route.params.currentTeamNumber, i + 1);
              loadedItems[`MatchData${i + 1}`] = matchData;
            }
          );
          await Promise.all(matchDataPromises);
          setIsClicked(!PitScanState);
          setMatchCount(currentMatchCount);
          setCurrentPitData(pitData);
          setItems(loadedItems);
          setIsClickedArray(initialIsClickedArray);
          setLoading(false);
        } else {
          setIsClicked(!PitScanState);
          setMatchCount(currentMatchCount);
          setCurrentPitData(pitData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadDataForQR();
  }, [route.params.currentTeamNumber, isFocused]);

  if (loading) {
    return <Text>LOADING ...</Text>;
  }

  const MatchItem = ({ matchData, isClicked, onWasScanned }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.boldText}>
          Match {JSON.stringify(matchData.MatchNumber)}
        </Text>
        <QRCode
          value={JSON.stringify(matchData, null, 2)}
          size={300}
          logo={require("../assets/logo.png")}
          logoSize={75}
        />
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "baseline" }}
          onPress={onWasScanned}
        >
          <Text style={styles.scannedText}>Was Scanned</Text>
          <Icon3
            color="#1E1E1E"
            name={!isClicked ? "checkbox-blank-outline" : "checkbox-marked"}
            size={30}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const closeModal = () => {
    setMatchModalState(false);
    Haptics.impactAsync(Haptics.NotificationFeedbackType.Medium);
  };

  const SliderBox = ({ items }) => {
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        index={currentSlideIndex}
        onIndexChanged={(index) => setCurrentSlideIndex(index)}
      >
        {Object.keys(items).map((matchKey, index) => (
          <MatchItem
            key={index}
            matchData={items[matchKey]}
            isClicked={isClickedArray[index]}
            onWasScanned={() => handleMatchScanned(index)}
          />
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

  const handleMatchScanned = async (matchNumber) => {
    try {
      await saveMatchScanned(route.params.currentTeamNumber, matchNumber);

      const updatedIsClickedArray = [...isClickedArray];
      updatedIsClickedArray[matchNumber] = true;
      setIsClickedArray(updatedIsClickedArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePitScanned = async () => {
    try {
      await savePitScanned(route.params.currentTeamNumber, true);
      setIsClicked(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.topContainer}>
      <Text style={styles.tittleText}>
        Pit Data for team {route.params.currentTeamNumber}
      </Text>
      {JSON.stringify(currentPitData) === JSON.stringify(initialPitData) ? (
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
            logo={require("../assets/logo.png")}
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
          Match Data for team {route.params.currentTeamNumber}
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
        animationInTiming={250}
        animationOutTiming={250}
        isVisible={MatchModalState}
        onBackdropPress={closeModal}
        style={styles.modalScreen}
      >
        <View style={styles.tittleContainer}>
          <Text style={styles.tittleText}>
            Match Data for team {route.params.currentTeamNumber}
          </Text>
        </View>
        <View style={styles.modalContainer}>
          {matchCount === 0 ? <Placeholder /> : <SliderBox items={items} />}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  scannedText: {
    fontWeight: "400",
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 4,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
  placeholder: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 30,
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
  buttonsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tittleText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
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
});
