import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainMenuScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Menu</Text>
      <View style={styles.buttonContainer}>
        <Button title="MENU" onPress={() => navigation.navigate('Menu')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Track" onPress={() => navigation.navigate('OrderTracking')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="review" onPress={() => navigation.navigate('Feedback')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="history" onPress={() => navigation.navigate('OrderHistory')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="report" onPress={() => navigation.navigate('Reporting')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="manage" onPress={() => navigation.navigate('RestaurantMenuManagement')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={() => navigation.navigate('Login')} />
      </View>
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
  buttonContainer: {
    marginVertical: 10, 
  },
});

export default MainMenuScreen;
