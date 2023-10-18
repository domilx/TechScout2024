import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FloatingButton() {
    const handleButtonPress = () => {
        Alert.prompt(
            'Team Number',
            'Enter the number of the team to scout:',
            (number) => {
                if (number) {
                    alert('You entered: ' + number);
                }
            },    
            'plain-text',
            '',
            'numeric',
            4

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


