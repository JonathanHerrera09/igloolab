import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false, gestureEnabled: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}