import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "./PlusButton";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToTeam = () => {
    navigation.navigate("3990");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToTeam}>
        <View style={styles.button}>
          <Text style={styles.boldText}>Team 3990</Text>
          <Icon name="arrow-forward-outline" size={30} color="#1E1E1E" style={styles.icon} />
        </View>
      </TouchableOpacity>
      <FloatingButton />
    </View>
  );
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
});

export default HomeScreen;
