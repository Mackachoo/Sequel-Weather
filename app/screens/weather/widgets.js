import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Sun from '../../assets/weather/Sun.svg'
import Cloudy from '../../assets/weather/Cloudy.svg'
import PartlyCloudy from '../../assets/weather/PartlyCloudy.svg'
import Drizzle from '../../assets/weather/Drizzle.svg'
import Fog from '../../assets/weather/Fog.svg'
import Hail from '../../assets/weather/Hail.svg'
import Rain from '../../assets/weather/Rain.svg'
import Snow from '../../assets/weather/Snow.svg'
import Thunder from '../../assets/weather/Thunder.svg'
import Showers from '../../assets/weather/Showers.svg'


export const Temperature = ({ data }) => {
    if (data) {
        return (
            <Text style={{ textAlign: 'center', fontSize: 48, color: data.current_weather.is_day == 1 ? '#282133' : '#d5e3f5' }}> {data.current_weather.temperature} °C</Text >
        );
    }
};

export const WindSpeed = ({ data }) => {
    if (data) {
        let angle = data.current_weather.winddirection - 45;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {/* <MaterialCommunityIcons name='windsock'
                    size={24}
                    color={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'}
                /> */}
                <FontAwesome name='location-arrow'
                    size={24}
                    style={{ transform: [{ rotate: `${angle}deg` }] }}
                    color={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'}
                />
                <Text style={[{ textAlign: 'center', fontSize: 24, color: data.current_weather.is_day == 1 ? '#282133' : '#D5AC78' }]}> {data.current_weather.windspeed} mph</Text >

            </View>
        );
    }
};

export const WeatherSymbol = ({ data, size }) => {
    if (data) {
        let code = data.current_weather.weathercode
        // console.log(code);

        let symbol;
        if (code == 0) { // Sunny
            symbol = <Sun fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else if (code == 1 || code == 2) { // Partly Cloudy
            symbol = <PartlyCloudy fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else if (code == 3) { //  Cloudy
            symbol = <Cloudy fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else if (code == 45 || code <= 48) { // Fog
            symbol = <Fog fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else if (code >= 51 && code <= 55) { // Drizzle
            symbol = <Drizzle fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else if (code >= 61 && code <= 65) { // Raining
            symbol = <Rain fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else if (code >= 80 && code <= 82) { // Showers
            symbol = <Showers fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else if (code == 56 || code == 57 || code == 66 || code == 67) { // Hail
            symbol = <Hail fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else if (code >= 71 && code <= 77 || code == 85 || code == 86) { // Snow
            symbol = <Snow fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        } else { // Thunder
            symbol = <Thunder fill={data.current_weather.is_day == 1 ? '#282133' : '#D5AC78'} height={size} width={size} />;
        }

        return (<View>{symbol}</View>);

    }
}
