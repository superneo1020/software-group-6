import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

const menuItems = [
  { id: '1', name: 'Pizza', price: 8.99 },
  { id: '2', name: 'Burger', price: 5.99 },
  { id: '3', name: 'Pasta', price: 7.99 },
  { id: '4', name: 'Noodles', price: 6.99 },
  // Add more items as needed
];

const MenuScreen = () => {
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert('Success', `${item.name} added to cart`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.name} - ${item.price.toFixed(2)}</Text>
            <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
          </View>
        )}
      />
      <Button title="Go to Order" onPress={() => navigation.navigate('Order')} />
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
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
});

export default MenuScreen;
