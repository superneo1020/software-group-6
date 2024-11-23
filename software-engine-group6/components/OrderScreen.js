import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

const OrderScreen = () => {
  const { cart, removeFromCart, updateQuantity, getTotalAmount } = useContext(CartContext);
  const navigation = useNavigation();

  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      const orderData = {
        items: cart,
        totalAmount: getTotalAmount(),
      };

      console.log('Order Data:', orderData);
      Alert.alert('Success', 'Order placed successfully!');
      navigation.navigate('MainMenu');
    } else {
      Alert.alert('Error', 'Please add items to your order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.name} - Quantity: {item.quantity} - Amount: ${(item.price * item.quantity).toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
              <Button title="-" onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} />
              <TextInput
                style={styles.quantityInput}
                value={item.quantity.toString()}
                onChangeText={(value) => updateQuantity(item.id, parseInt(value))}
                keyboardType="numeric"
              />
              <Button title="+" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.totalAmount}>Total Amount: ${getTotalAmount().toFixed(2)}</Text>
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
  orderItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    color: 'red',
  },
  totalAmount: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default OrderScreen;
