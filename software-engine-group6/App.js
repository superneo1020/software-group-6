import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './components/CartContext';
import LoginScreen from './components/LoginScreen';
import MainMenuScreen from './components/MainMenuScreen';
import MenuScreen from './components/MenuScreen';
import CustomerRegistrationScreen from './components/CustomerRegistrationScreen';
import RestaurantRegistrationScreen from './components/RestaurantRegistrationScreen';
import OrderScreen from './components/OrderScreen';
import BillingScreen from './components/BillingScreen';
import OrderTrackingScreen from './components/OrderTrackingScreen';
import FeedbackScreen from './components/FeedbackScreen';
import OrderHistoryScreen from './components/OrderHistoryScreen';
import RegistrationSelectionScreen from './components/RegistrationSelectionScreen.js';
import RestaurantMenuManagementScreen from './components/RestaurantMenuManagementScreen';

import ReportingScreen from './components/ReportingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="RegisterCus" component={CustomerRegistrationScreen} />
          <Stack.Screen name="RegisterRes" component={RestaurantRegistrationScreen} />
          <Stack.Screen name="Register" component={RegistrationSelectionScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
           <Stack.Screen name="Billing" component={BillingScreen} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          <Stack.Screen name="RestaurantMenuManagement" component={RestaurantMenuManagementScreen} />
          <Stack.Screen name="Reporting" component={ReportingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
