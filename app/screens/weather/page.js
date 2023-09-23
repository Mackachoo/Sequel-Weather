import React, { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Temperature, WeatherSymbol, WindSpeed } from './widgets';
import { BlurView } from 'expo-blur';

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
                    color={'#282133'}
                />
            </Pressable>
        );
    }

    if (weather) {
        return (
            <ImageBackground source={weather.current_weather.is_day == 1 ? require('../../assets/day.png') : require('../../assets/night.png')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }}>
                <View style={[styles.container]}>
                    <BlurView intensity={45} tint='dark' style={styles.blur}>
                        <View>
                            <Temperature data={weather} />
                            <WindSpeed data={weather} />
                        </View>
                        <WeatherSymbol data={weather} size={100} />
                    </BlurView>
                    <RefreshButton />
                </View>
            </ImageBackground>
        );
    } else {
        return (
            <ImageBackground source={require('../../assets/neutral.jpeg')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }}>
                <View style={[styles.container]}>
                    <BlurView intensity={45} tint='dark' style={styles.blur}>
                        <Text style={{ fontSize: 24, }}>No Weather Data</Text>
                    </BlurView>
                    <RefreshButton />
                </View>
            </ImageBackground>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    blur: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 2,

    },
});

