import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../backend/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import styles from "../style";

const BusinessRegistration = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [location, setLocation] = useState('');

  const handleRegister = async () => {
    if (!businessName || !businessType || !contactInfo || !location) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      await addDoc(collection(db, 'businesses'), {
        businessName,
        businessType,
        contactInfo,
        location,
        userID: uid,
        createdAt: new Date()
      });
      Alert.alert('Success', 'Business registered successfully!');
      setBusinessName('');
      setBusinessType('');
      setContactInfo('');
      setLocation('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to register business');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Business Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <Picker
        selectedValue={businessType}
        onValueChange={(itemValue) => setBusinessType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Business Type..." value="" />
        <Picker.Item label="Retail" value="retail" />
        <Picker.Item label="Service" value="service" />
        <Picker.Item label="Manufacturing" value="manufacturing" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Contact Info (email or phone)"
        value={contactInfo}
        onChangeText={setContactInfo}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <Button title="Register Business" onPress={handleRegister} />
    </ScrollView>
  );
};

export default BusinessRegistration