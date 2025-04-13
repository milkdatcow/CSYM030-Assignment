import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Dashboard from './screens/Dashboard';
import BusinessRegistration from './screens/BusinessRegistration';
import EmployeeManagement from './screens/EmployeeManagement';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="SignupScreen" component={Signup} />
        <Stack.Screen name="DashboardScreen" component={Dashboard} />
        <Stack.Screen name="BusinessRegistrationScreen" component={BusinessRegistration} />
        <Stack.Screen name="EmployeeManagementScreen" component={EmployeeManagement}/>
        <Stack.Screen name="AddEmployeeScreen" component={AddEmployee} />
        <Stack.Screen name="EmployeeListScreen" component={EmployeeList} />
        <Stack.Screen name="RemoveEmployeeScreen" component={RemoveEmployee} />
        <Stack.Screen name="UpdateEmployeeScreen" component={UpdateEmployee} />
        <Stack.Screen name="PayrollScreen" component={Payroll} />
        <Stack.Screen name="PerformanceScreen" component={Performance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
