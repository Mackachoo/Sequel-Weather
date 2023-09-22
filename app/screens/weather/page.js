import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Temperature, WindSpeed } from './widgets';


export default function WeatherScreen() {
    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        try {
            // Fetch weather data from your Firebase function
            const response = await fetch(
                'http://127.0.0.1:5001/sequel-weather-91f3d/us-central1/getWeather'
            );

            if (response.ok) {
                const data = await response.json();
                // console.log('Weather Data:', data);
                setWeather(data)
            } else {
                console.error('Failed to fetch weather data');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const RefreshButton = () => {
        return (
            <Pressable style={{ margin: 20 }} onPress={fetchWeather} >
                <FontAwesome
                    name='refresh'
                    size={36}
                    color={'#4D709E'}
                />
            </Pressable>
        );
    }

    if (weather) {
        return (
            <View style={styles.container}>
                <View>
                    <Temperature data={weather} />
                    <WindSpeed data={weather} />
                </View>
                <RefreshButton />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 24, }}>No Weather Data</Text>
                <RefreshButton />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E6F1FF',
    },
});

