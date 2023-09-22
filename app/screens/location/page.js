import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LocationScreen() {
    return (
        <View style={styles.container}>
            <Text>Location screen!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6F1FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

