import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeatherScreen from './screens/weather/page';
import LocationScreen from './screens/location/page';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      <Tab.Navigator >
        <Tab.Screen name="Weather" options={{
          headerTitle: 'Sequel Weather',
          tabBarLabel: 'Weather',
          tabBarActiveTintColor: '#4D709E',
          tabBarInactiveTintColor: '#8BB4EB',
          tabBarIcon: (state) => (
            <MaterialCommunityIcons
              name='weather-partly-rainy'
              size={24}
              color={state.focused ? '#4D709E' : '#8BB4EB'}
            />),
        }} component={WeatherScreen} />
        <Tab.Screen name="Locations" options={{
          headerTitle: 'Sequel Weather',
          tabBarLabel: 'Locations',
          tabBarActiveTintColor: '#4D709E',
          tabBarInactiveTintColor: '#8BB4EB',
          tabBarIcon: (state) => (
            <Entypo
              name='location'
              size={24}
              color={state.focused ? '#4D709E' : '#8BB4EB'}
            />),
        }} component={LocationScreen} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}



