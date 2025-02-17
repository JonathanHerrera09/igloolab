import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProductList from '../screens/ProductListScreen';
import ProductFormScreen from '../screens/ProductFormScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        gestureEnabled: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'ProductList':
              iconName = 'home-outline';
              break;
            case 'ProductFormScreen':
              iconName = 'add-circle-outline';
              break;
            case 'Logout':
              iconName = 'log-out-outline';
              break;
            default:
              iconName = 'alert-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="ProductList" 
        component={ProductList} 
        options={{ title: 'Inicio' }} 
      />
      <Tab.Screen 
        name="ProductFormScreen" 
        component={ProductFormScreen}  
        options={{ title: 'Formulario' }}  
        />
      <Tab.Screen 
        name="Logout" 
        component={LogoutScreen} 
        options={{ headerShown: false }} 
        />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
