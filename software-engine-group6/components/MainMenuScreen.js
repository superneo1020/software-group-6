import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainMenuScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Menu</Text>
      <Button title="MENU" onPress={() => navigation.navigate('Menu')} />
      <Button title="Track" onPress={() => navigation.navigate('OrderTracking')} />
      <Button title="review" onPress={() => navigation.navigate('Feedback')} />
      <Button title="history" onPress={() => navigation.navigate('OrderHistory')} />
      <Button title="report" onPress={() => navigation.navigate('Reporting')} />
      <Button title="manage" onPress={() => navigation.navigate('RestaurantMenuManagement')} />
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  
});

export default MainMenuScreen;
