import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "../style";

const EmployeeManagement = () => {
  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Employee Management</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEmployeeScreen')}>
        <Text style={styles.buttonText}>Add Employee</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmployeeListScreen')}>
        <Text style={styles.buttonText}>Employee List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RemoveEmployeeScreen')}>
        <Text style={styles.buttonText}>Remove Employee</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateEmployeeScreen')}>
        <Text style={styles.buttonText}>Update Employee</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PayrollScreen')}>
        <Text style={styles.buttonText}>Payroll</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PerformanceScreen')}>
        <Text style={styles.buttonText}>Performance</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmployeeManagement;