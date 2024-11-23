import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

// Import images from assets folder
import pizzaImage from '../assets/Pizza.png';
import burgerImage from '../assets/burger.png';
import pastaImage from '../assets/pasta.png';
import noodlesImage from '../assets/noodles.png';

const menuItems = [
  { id: '1', name: 'Pizza', price: 8.99, image: pizzaImage },
  { id: '2', name: 'Burger', price: 5.99, image: burgerImage },
  { id: '3', name: 'Pasta', price: 7.99, image: pastaImage },
  { id: '4', name: 'Noodles', price: 6.99, image: noodlesImage },
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
            <Image source={item.image} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text>{item.name} - ${item.price.toFixed(2)}</Text>
              <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
            </View>
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
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
});

export default MenuScreen;


