import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BlurView } from "expo-blur";
import { LineChart } from 'react-native-chart-kit';


export const WorkableGraph = ({ data, parameters }) => {
    if (data) {
        // console.log(parameters);
        results = Array(24).fill(0);
        for (let i = 0; i < 24; i++) {
            if (data.hourly.temperature_2m[i] >= parameters.minTemperature && parameters.minTemperature) {
                results[i]++;
            }
            if (data.hourly.temperature_2m[i] <= parameters.maxTemperature && parameters.maxTemperature) {
                results[i]++;
            }
            if (data.hourly.windspeed_10m[i] <= parameters.windspeed && parameters.windspeed) {
                results[i]++;
            }
        }

        numParams = 0;
        for (var key in parameters) {
            if (parameters[key]) {
                numParams++
            }
        }

        console.log(results);
        results = results.map((element) => element * 2 / numParams - 1);
        console.log(results);


        const line = {
            labels: data.hourly.time.map((val) => { // Formats time correctly and removes every odd entry
                time = (val.split("T")[1]).split(":")[0];

                return Number(time.substr(time.length - 1)) % 2 == 0 ? time : "";
            }).slice(0, 24),
            datasets: [
                {
                    data: results,
                    strokeWidth: 2,
                    color: (opacity = 1) => data.current_weather.is_day == 1 ? `rgba(220, 50, 70, ${opacity})` : `rgba(200, 80, 70, ${opacity})`,

                },
                { data: [-1], withDots: false },
                { data: [1], withDots: false },

            ],

        };


        return (
            <BlurView intensity={45} tint='dark' style={[styles.blur, { flexDirection: 'column', backgroundColor: data.current_weather.is_day == 1 ? 'rgba(233, 192, 160, 0.6)' : 'rgba(40, 33, 51, 0.6)' }]}>
                <Text style={{ paddingHorizontal: 20, paddingTop: 10, color: data.current_weather.is_day == 1 ? '#282133' : '#D5AC78' }}>Temperature Today</Text>
                <LineChart
                    data={line}
                    width={Dimensions.get("window").width * 0.8} // from react-native
                    height={200}
                    withInnerLines={false}
                    chartConfig={{
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 1) => data.current_weather.is_day == 1 ? '#282133' : '#D5AC78',
                    }}
                    bezier
                    style={{
                        marginRight: 10,
                        marginTop: 10,
                    }}
                />

            </BlurView>);
    }
}

const styles = StyleSheet.create({
    blur: {
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 2,

    },
});

