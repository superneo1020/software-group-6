import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './components/CartContext';
import LoginScreen from './components/LoginScreen.js';
import MainMenuScreen from './components/MainMenuScreen.js';
import MenuScreen from './components/MenuScreen.js';
import RegistrationSelectionScreen from './components/RegistrationSelectionScreen.js';
import CustomerRegistrationScreen from './components/CustomerRegistrationScreen.js';
import RestaurantRegistrationScreen from './components/RestaurantRegistrationScreen.js';
import OrderScreen from './components/OrderScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Register" component={RegistrationSelectionScreen} />
        <Stack.Screen name="RegisterCus" component={CustomerRegistrationScreen} />
        <Stack.Screen name="RegisterRes" component={RestaurantRegistrationScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}
