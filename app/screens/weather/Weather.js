import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { firebase } from '@react-native-firebase/functions';


export default function WeatherScreen() {
    // const [weather, setWeather] = useState(null);

    // const fetchWeather = async () => {
    //     try {
    //         const response = await firebase.functions().httpsCallable('getWeather')();
    //         setWeather(response.data);
    //     } catch (error) {
    //         console.error("Error fetching weather data: ", error);
    //     }
    // };

    return (
        <View style={styles.container}>
            <Pressable onPress={fetchWeather} style={styles.refresh}>
                <FontAwesome
                    name='refresh'
                    size={24}
                    color={'#4D709E'}
                />
            </Pressable>
            <View style={styles.weather}>
                {/* <Text>{weather}</Text> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#E6F1FF',
        justifyContent: 'flex-start',
    },
    refresh: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        padding: 10
    },
    weather: {
        alignContent: 'center',
    }
});

