import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

const BillingScreen = () => {
  const { getTotalAmount } = useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState('0.00');
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTotalAmount = () => {
      const total = getTotalAmount();
      setTotalAmount(total.toFixed(2));
    };

    fetchTotalAmount();
  }, [getTotalAmount]);

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv) {
      Alert.alert('Payment', 'Payment completed successfully!');
      navigation.navigate('OrderTracking');
    } else {
      Alert.alert('Error', 'Please enter all card details.');
    }
  };

  const renderCardForm = () => (
    <View style={styles.cardForm}>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
        secureTextEntry
      />
      <Button title="Complete Payment" onPress={handlePayment} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billing</Text>
      <Text style={styles.amount}>Total Amount: ${totalAmount}</Text>
      <Text style={styles.paymentTitle}>Payment Options:</Text>
      {!showCardForm ? (
        <View style={styles.paymentOptions}>
          <Button title="Visa" onPress={() => setShowCardForm(true)} />
          <Button title="Mastercard" onPress={() => setShowCardForm(true)} />
          <Button title="PayPal" onPress={() => setShowCardForm(true)} />
        </View>
      ) : (
        renderCardForm()
      )}
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
  amount: {
    fontSize: 18,
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  cardForm: {
    width: '100%',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default BillingScreen;





