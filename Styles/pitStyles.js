
import {StyleSheet} from 'react-native';


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

  export default styles;