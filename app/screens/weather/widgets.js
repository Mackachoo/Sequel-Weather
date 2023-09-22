import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export const Temperature = ({ data }) => {
    if (data) {
        return (
            <Text style={[styles.text, { fontSize: 48, color: '#2C4669' }]}> {data.current_weather.temperature} °C</Text >
        );
    }
};

export const WindSpeed = ({ data }) => {
    if (data) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name='windsock'
                    size={24}
                    color='#4D709E'
                />
                <Text style={[styles.text, { fontSize: 24, }]}> {data.current_weather.windspeed} mph</Text >
            </View>
        );
    }
};

// const 

const styles = StyleSheet.create({
    text: {
        color: '#4D709E',
        alignItems: 'center',
    },
});

