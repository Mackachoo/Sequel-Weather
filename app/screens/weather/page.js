import React, { useMemo, useState } from 'react';
import { Button, Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { LocalTime, Temperature, WeatherSymbol, WindSpeed } from './widgets';
import { BlurView } from 'expo-blur';
import { DailyGraph, HourlyGraph } from './graphs';

export default function WeatherScreen() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);

    const fetchWeather = async (input) => {
        try {
            loc = typeof input == 'string' ? input : location;
            // Fetch weather data from your Firebase function
            const response = await fetch(
                `https://us-central1-sequel-weather-91f3d.cloudfunctions.net/getWeatherAtLocation?address=${loc}`,
            );

            if (response.ok) {
                const data = await response.json();
                // console.log('Weather Data:', data);
                setWeather(data)
            } else {
                alert("Unknown Location\n Please try again.")
                console.error('Failed to fetch weather data');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const LocationForm = useMemo(() => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#434D59', opacity: 0.8, }}>
                <TextInput
                    style={{ padding: 10, height: 40, width: Dimensions.get("window").width * 0.8, color: '#E6D2B9' }}
                    placeholder="Enter location here..."
                    placeholderTextColor='#E6D2B9'
                    onChangeText={(text) => setLocation(text)}
                    onSubmitEditing={fetchWeather}
                    value={location}
                />

                <Pressable style={{ margin: 10 }} onPress={fetchWeather} >
                    <FontAwesome
                        name='search'
                        size={30}
                        color={'#E6D2B9'}
                    />
                </Pressable>
            </View >
        );
    }, [location]);

    if (weather) {
        return (
            <ImageBackground source={weather.current_weather.is_day == 1 ? require('../../assets/day.png') : require('../../assets/night.png')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }}>
                <ScrollView>
                    <View style={[styles.container, { gap: 20 }]}>
                        {LocationForm}
                        <BlurView intensity={45} tint='dark' style={styles.blur}>
                            <View style={{ flexDirection: 'row', }}>
                                <View>
                                    <Temperature data={weather} />
                                    <WindSpeed data={weather} />
                                </View>
                                <WeatherSymbol data={weather} size={100} />
                            </View>
                            <LocalTime data={weather} />
                        </BlurView>
                        <HourlyGraph data={weather} />
                        <DailyGraph data={weather} />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    } else {
        return (
            <ImageBackground source={require('../../assets/neutral.png')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }}>
                <View style={[styles.container]}>
                    {LocationForm}
                    <View style={{ width: 200, backgroundColor: '#434D59', opacity: 0.8, }}>
                        <Button title='Weather in London' color="#E6D2B9" onPress={() => {
                            fetchWeather("London");
                        }} />
                    </View>
                </View>
            </ImageBackground>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        flex: 1,
        gap: 20,
        alignItems: 'center',
    },
    blur: {

        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 2,
        width: Dimensions.get("window").width * 0.8,
        justifyContent: 'space-evenly'
    },
});

