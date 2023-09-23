import React, { useMemo, useState } from 'react';
import { Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import { WorkableGraph } from './graphs';

export default function WorkableScreen() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);

    const fetchWeather = async () => {
        try {
            // Fetch weather data from your Firebase function
            const response = await fetch(
                `http://127.0.0.1:5001/sequel-weather-91f3d/us-central1/getWeatherAtLocation?address=${location}`,
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

    // Parameters
    const [minTemperature, setMinTemperature] = useState(null);
    const [maxTemperature, setMaxTemperature] = useState(null);
    const [requiredCodes, setRequiredCodes] = useState(null);
    const [bannedCodes, setBannedCodes] = useState(null);
    const [windspeed, setWindspeed] = useState(null);


    const ParametersForm = useMemo(() => {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.parameters}>
                    <Text style={{ color: '#E6D2B9' }}>Temperature:</Text>
                    <TextInput
                        style={{ padding: 10, height: 40, color: '#E6D2B9' }}
                        placeholder="Minimum"
                        placeholderTextColor='#E6D2B9'
                        onChangeText={(text) => setMinTemperature(text)}
                        value={minTemperature}
                    />
                    <Text style={{ color: '#E6D2B9' }}>{'<'}</Text>
                    <TextInput
                        style={{ padding: 10, height: 40, color: '#E6D2B9' }}
                        placeholder="Maximum"
                        placeholderTextColor='#E6D2B9'
                        onChangeText={(text) => setMaxTemperature(text)}
                        value={maxTemperature}
                    />
                </View>
                <View style={styles.parameters}>
                    <Text style={{ color: '#E6D2B9' }}>Max Windspeed:</Text>
                    <TextInput
                        style={{ padding: 10, height: 40, color: '#E6D2B9' }}
                        placeholder="Km/h"
                        placeholderTextColor='#E6D2B9'
                        onChangeText={(text) => setWindspeed(text)}
                        value={windspeed}
                    />
                </View>

            </View >
        );
    }, [location]);

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
            <ImageBackground source={require('../../assets/neutral.png')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }}>
                <View style={[styles.container, { gap: 20 }]}>
                    {LocationForm}
                    <WorkableGraph data={weather} parameters={{ minTemperature, maxTemperature, windspeed }} />
                    <BlurView intensity={45} tint='dark' style={[styles.blur, { flexDirection: 'column' }]}>
                        <Text style={{ fontSize: 20, color: '#E6D2B9' }}>Workable in {location}</Text>
                        {ParametersForm}
                    </BlurView>
                </View>
            </ImageBackground>
        );
    } else {
        return (
            <ImageBackground source={require('../../assets/neutral.png')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }}>
                <View style={[styles.container]}>
                    {LocationForm}
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
        alignItems: 'center'
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
    parameters: {
        flexDirection: 'row',
        width: Dimensions.get("window").width * 0.8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
    }
});

