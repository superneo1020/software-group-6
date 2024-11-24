import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = async () => {
    const feedbackList = JSON.parse(await AsyncStorage.getItem('@feedbackList')) || [];
    feedbackList.push({ feedback, date: Date.now() });
    await AsyncStorage.setItem('@feedbackList', JSON.stringify(feedbackList));
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
      />
      <Button title="Submit Feedback" onPress={handleSubmitFeedback} />
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
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
});

export default FeedbackScreen;
