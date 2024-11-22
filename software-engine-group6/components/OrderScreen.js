import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const handleAddItem = () => {
    if (item.trim() !== '' && quantity.trim() !== '') {
      const newOrder = {
        id: Math.random().toString(36).substr(2, 9),
        name: item,
        quantity: parseInt(quantity),
        totalAmount: parseFloat(totalAmount),
      };
      setOrders([...orders, newOrder]);
      setItem('');
      setQuantity('');
      setTotalAmount('');
    } else {
      Alert.alert('Error', 'Please enter valid item and quantity.');
    }
  };

  const handlePlaceOrder = async () => {
    if (orders.length > 0) {
      const orderData = {
         
        items: orders,
        totalAmount: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      };

      console.log('Order Data:', orderData);
      Alert.alert('Success', 'Order placed successfully!');
      setOrders([]);
      navigation.navigate('MainMenu');
    } else {
      Alert.alert('Error', 'Please add items to your order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Food</Text>
      <TextInput
        style={styles.input}
        placeholder="Item"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Total Amount"
        value={totalAmount}
        onChangeText={setTotalAmount}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={handleAddItem} />

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.name} - Quantity: {item.quantity} - Amount: ${item.totalAmount.toFixed(2)}</Text>
          </View>
        )}
      />

      <Button title="Place Order" onPress={handlePlaceOrder} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  orderItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default OrderScreen;
