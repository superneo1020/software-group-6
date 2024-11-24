import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const RestaurantMenuManagementScreen = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const storedMenuItems = await AsyncStorage.getItem('@menuItems');
      if (storedMenuItems) {
        setMenuItems(JSON.parse(storedMenuItems));
      }
    };

    fetchMenuItems();
  }, []);

  const saveMenuItems = async (items) => {
    await AsyncStorage.setItem('@menuItems', JSON.stringify(items));
  };

  const handleAddItem = () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please enter both name and price.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      image: imageUri,
    };

    const updatedMenuItems = [...menuItems, newItem];
    setMenuItems(updatedMenuItems);
    saveMenuItems(updatedMenuItems);

    setName('');
    setPrice('');
    setImageUri('');
  };

  const handleDeleteItem = (id) => {
    const updatedMenuItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedMenuItems);
    saveMenuItems(updatedMenuItems);
  };

  const handleEditItem = (item) => {
    setName(item.name);
    setPrice(item.price.toString());
    setImageUri(item.image);
    setEditingItemId(item.id);
  };

  const handleUpdateItem = () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please enter both name and price.');
      return;
    }

    const updatedMenuItems = menuItems.map(item =>
      item.id === editingItemId ? { ...item, name, price: parseFloat(price), image: imageUri } : item
    );

    setMenuItems(updatedMenuItems);
    saveMenuItems(updatedMenuItems);

    setName('');
    setPrice('');
    setImageUri('');
    setEditingItemId(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Access the correct property for the image URI
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
      <Button
        title={editingItemId ? "Update Item" : "Add Item"}
        onPress={editingItemId ? handleUpdateItem : handleAddItem}
      />
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
            <View style={styles.detailsContainer}>
              <Text>{item.name} - ${item.price ? item.price.toFixed(2) : 'N/A'}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEditItem(item)} />
                <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  detailsContainer: {
    flex: 1,
  },
});

export default RestaurantMenuManagementScreen;
