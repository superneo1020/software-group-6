import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationSelectionScreen = () => {
  const navigation = useNavigation();

  const handleCustomerRegistration = () => {
    navigation.navigate('RegisterCus');
  };

  const handleRestaurantRegistration = () => {
    navigation.navigate('RegisterRes');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Registration Type</Text>
      <View style={styles.buttonContainer}>
        <Button title="Customer Registration" onPress={handleCustomerRegistration} color="#4CAF50" /> {/* Green button */}
        <Button title="Restaurant Registration" onPress={handleRestaurantRegistration} color="#2196F3" /> {/* Blue button */}
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
    textAlign: 'center', // Center the title
  },
  buttonContainer: {
    width: '100%', // Ensure buttons take full width
  },
});

export default RegistrationSelectionScreen;