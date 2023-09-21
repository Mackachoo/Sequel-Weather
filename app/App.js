import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeatherScreen from './screens/weather/Weather';
import LocationScreen from './screens/location/Location';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen name="Weather" options={{
          headerTitle: 'Sequel Weather',
          tabBarLabel: 'Weather',
          tabBarIcon: (state) => (
            <MaterialCommunityIcons
              name="weather-partly-rainy"
              size={24}
              color={state.focused ? "#006600" : "#8e8e93"}
            />),
        }} component={WeatherScreen} />
        <Tab.Screen name="Locations" options={{
          headerTitle: 'Sequel Weather',
          tabBarLabel: 'Locations',
          tabBarIcon: (state) => (
            <Entypo
              name="location"
              size={24}
              color={state.focused ? "#006600" : "#8e8e93"}
            />),
        }} component={LocationScreen} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



