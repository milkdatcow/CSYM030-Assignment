import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../backend/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import styles from "../style";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Save role to Firestore
      await setDoc(doc(db, "users", uid), {
        email,
        role,
        userID: uid
      });

      Alert.alert("Success", "Account created!");
      //navigation.navigate("Dashboard");
    } catch (err) {
      Alert.alert("Signup Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Text>Select Role</Text>
      <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)}>
        <Picker.Item label="Select your role" value="" enabled={false} />
        <Picker.Item label="Business Owner" value="business" />
        <Picker.Item label="Hospital Admin" value="hospital" />
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Citizen" value="citizen" />
      </Picker>
      <Button title="Create Account" onPress={handleSignUp} />
      <Text onPress={() => navigation.navigate("LoginScreen")} style={styles.link}>Already have an account? Login</Text>
    </View>
  );
};

export default Signup;
