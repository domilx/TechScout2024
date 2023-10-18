import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FloatingButton() {
    const handleButtonPress = () => {
        Alert.prompt(
            'Enter Text',
            'Please enter some text:',
            (text) => {
                if (text) {
                    alert('You entered: ' + text);
                }
            }
        );
    }

    return (
        <View style={styles.floatingButton}>
            <TouchableOpacity onPress={handleButtonPress}>
                <Icon name="add" size={30} color="#F6EB14" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 25,
        backgroundColor: '#1E1E1E',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
});
