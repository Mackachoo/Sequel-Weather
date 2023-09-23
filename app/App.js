import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeatherScreen from './screens/weather/page';
import WorkableScreen from './screens/workable/page';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();
const blurred = () => (
  <BlurView tint="default" intensity={10} style={StyleSheet.absoluteFill} />
)

export default function App() {
  return (
    <NavigationContainer >
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground source={require('./assets/neutral.png')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }}>
        <Tab.Navigator screenOptions={{ headerShown: false }} >
          <Tab.Screen name="Weather" options={{
            tabBarLabel: 'Weather',
            tabBarActiveTintColor: '#8E4A25',
            tabBarInactiveTintColor: '#2B2436',
            tabBarBackground: blurred,
            tabBarStyle: {
              height: 90,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 20,
            },
            tabBarIcon: (state) => (
              <MaterialCommunityIcons
                name='weather-partly-rainy'
                size={24}
                color={state.focused ? '#8E4A25' : '#2B2436'}
              />),
          }} component={WeatherScreen} />

          <Tab.Screen name="Workable" options={{
            tabBarLabel: 'Workable',
            tabBarActiveTintColor: '#8E4A25',
            tabBarInactiveTintColor: '#2B2436',
            tabBarBackground: blurred,
            tabBarStyle: {
              height: 90,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 20,
            },
            tabBarIcon: (state) => (
              <MaterialIcons
                name='timeline'
                size={24}
                color={state.focused ? '#8E4A25' : '#2B2436'}
              />),
          }} component={WorkableScreen} />

        </Tab.Navigator>
      </ImageBackground>
    </NavigationContainer>

  );
}



