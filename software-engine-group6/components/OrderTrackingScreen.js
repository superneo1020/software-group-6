import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeOrderStatus, updateOrderStatus } from './OrderStatusUtils';

const OrderTrackingScreen = () => {
  const [orderStatus, setOrderStatus] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const storedOrderStatus = await AsyncStorage.getItem('@orderStatus');
      if (storedOrderStatus) {
        const orders = JSON.parse(storedOrderStatus);
        setOrderStatus(initializeOrderStatus(orders));
      }
    };

    fetchOrderStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStatus(prevStatus => updateOrderStatus(prevStatus));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    const storedOrderStatus = await AsyncStorage.getItem('@orderStatus');
    if (storedOrderStatus) {
      setOrderStatus(JSON.parse(storedOrderStatus));
    }
    Alert.alert('Updated', 'Order status updated!');
  };

  useEffect(() => {
    if (orderStatus.some(status => status.status === 'Delivered')) {
      Alert.alert('Order Delivered', 'Your order has been delivered.');
    }
  }, [orderStatus]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Tracking</Text>
      <FlatList
        data={orderStatus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.status} - ETA: {item.remainingTime} minutes</Text>
          </View>
        )}
      />
      <Button title="Refresh" onPress={handleRefresh} />
      <Button title="Back to Main Menu" onPress={() => navigation.navigate('MainMenu')} />
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
  orderItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
  },
});

export default OrderTrackingScreen;

