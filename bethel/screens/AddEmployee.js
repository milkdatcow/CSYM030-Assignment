import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db, auth } from '../backend/Firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import styles from '../style';

const AddEmployee = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleAdd = async () => {
    if (!fname || !lname || !email || !role) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert('Error', 'User profile not found');
        return;
      }

      const userData = userSnap.data();
      const businessId = userData.businessId;

      if (!businessId) {
        Alert.alert('Error', 'You are not linked to a business');
        return;
      }

      // Step 1: Add employee
      const employeeDocRef = await addDoc(collection(db, 'employees'), {
        fname,
        lname,
        email,
        role,
        businessId,
        createdAt: new Date(),
      });

      // Step 2: Add employeeId to employee document
      await updateDoc(employeeDocRef, {
        employeeId: employeeDocRef.id,
      });

      // Step 3: Update user's record (if it exists)
      const usersQuery = query(
        collection(db, 'users'),
        where('email', '==', email)
      );
      const userQuerySnapshot = await getDocs(usersQuery);

      if (!userQuerySnapshot.empty) {
        const matchedUserDoc = userQuerySnapshot.docs[0];
        await updateDoc(doc(db, 'users', matchedUserDoc.id), {
          businessId,
          role,
          employeeId: employeeDocRef.id,
        });
      }

      Alert.alert('Success', 'Employee added successfully');
      setFname('');
      setLname('');
      setEmail('');
      setRole('');
    } catch (error) {
      console.error('Error adding employee: ', error);
      Alert.alert('Error', 'Failed to add employee');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Employee</Text>

      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={fname}
        onChangeText={setFname}
      />

      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={lname}
        onChangeText={setLname}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Role..." value="" enabled={false} />
          <Picker.Item label="Manager" value="manager" />
          <Picker.Item label="Staff" value="staff" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Employee</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEmployee;
