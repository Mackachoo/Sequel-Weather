import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function WorkableScreen() {
    return (
        <ImageBackground source={require('../../assets/neutral.jpeg')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }}>

            <View style={styles.container}>
                <Text>Workable screen!</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

