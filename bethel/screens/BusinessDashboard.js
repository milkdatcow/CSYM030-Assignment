import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "../style";

const BusinessDashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Business Dashboard</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BusinessRegistrationScreen')}
      >
        <Text style={styles.buttonText}>Register Your Business</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EmployeeManagementScreen')}
      >
        <Text style={styles.buttonText}>Manage Employees</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BusinessDashboard;
