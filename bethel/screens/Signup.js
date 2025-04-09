import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
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
        role
      });

      Alert.alert("Success", "Account created!");
      navigation.navigate("Dashboard");
    } catch (err) {
      Alert.alert("Signup Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TextInput placeholder="Role (e.g. businessOwner, doctor, patient)" value={role} onChangeText={setRole} style={styles.input} />
      <Button title="Create Account" onPress={handleSignUp} />
      <Text onPress={() => navigation.navigate("Login")} style={styles.link}>Already have an account? Login</Text>
    </View>
  );
};

export default Signup;
