import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../backend/Firebase';
import { collection, addDoc } from 'firebase/firestore';

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
        await addDoc(collection(db, 'employees'), {
            fname,
            lname,
            email,
            role,
        });
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
    
    
    export default AddEmployee