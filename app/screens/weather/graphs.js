import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BlurView } from "expo-blur";
import { LineChart } from 'react-native-chart-kit';


export const DailyGraph = ({ data }) => {
    if (data) {
        // console.log(data.daily);
        const line = {
            labels: data.daily.time.map((val) => {
                units = val.split("-")
                return `${units[2]}/${units[1].replaceAll("0", "")}`
            }),
            datasets: [
                {
                    data: data.daily.temperature_2m_max,
                    strokeWidth: 1,
                    color: (opacity = 1) => data.current_weather.is_day == 1 ? `rgba(220, 50, 70, ${opacity})` : `rgba(200, 80, 70, ${opacity})`,

                },
                {
                    data: data.daily.temperature_2m_min,
                    strokeWidth: 2,
                    color: (opacity = 1) => data.current_weather.is_day == 1 ? `rgba(60, 120, 200, ${opacity})` : `rgba(128, 150, 200, ${opacity})`,
                },
            ],
            legend: ["Max Temp", "Min Temp"]

        };


        return (
            <BlurView intensity={45} tint='dark' style={[styles.blur, { flexDirection: 'column', backgroundColor: data.current_weather.is_day == 1 ? 'rgba(233, 192, 160, 0.6)' : 'rgba(40, 33, 51, 0.6)' }]}>
                <Text style={{ paddingHorizontal: 20, paddingTop: 10, color: data.current_weather.is_day == 1 ? '#282133' : '#D5AC78' }}>Next 7 Days</Text>
                <LineChart
                    data={line}
                    width={Dimensions.get("window").width * 0.8} // from react-native
                    height={200}
                    yAxisSuffix={'°C'}
                    chartConfig={{
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 0, // optional, defaults to 2dp
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

export const HourlyGraph = ({ data }) => {
    if (data) {
        // console.log(data.hourly);
        const line = {
            labels: data.hourly.time.map((val) => { // Formats time correctly and removes every odd entry
                time = (val.split("T")[1]).split(":")[0];

                return Number(time.substr(time.length - 1)) % 2 == 0 ? time : "";
            }).slice(0, 24),
            datasets: [
                {
                    data: data.hourly.temperature_2m.slice(0, 24),
                    strokeWidth: 2,
                    color: (opacity = 1) => data.current_weather.is_day == 1 ? `rgba(220, 50, 70, ${opacity})` : `rgba(200, 80, 70, ${opacity})`,

                },
            ],

        };


        return (
            <BlurView intensity={45} tint='dark' style={[styles.blur, { flexDirection: 'column', backgroundColor: data.current_weather.is_day == 1 ? 'rgba(233, 192, 160, 0.6)' : 'rgba(40, 33, 51, 0.6)' }]}>
                <Text style={{ paddingHorizontal: 20, paddingTop: 10, color: data.current_weather.is_day == 1 ? '#282133' : '#D5AC78' }}>Temperature Today</Text>
                <LineChart
                    data={line}
                    width={Dimensions.get("window").width * 0.8} // from react-native
                    height={200}
                    yAxisSuffix={'°C'}
                    chartConfig={{
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 0, // optional, defaults to 2dp
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

