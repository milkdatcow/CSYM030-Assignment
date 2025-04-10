import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import styles from "../style";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    if (user) fetchUserData();
  }, [user]);

  //const goToBusiness = () => navigation.navigate('BusinessScreen');
  //const goToHospital = () => navigation.navigate('HospitalScreen');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Bethel City</Text>
      {userData && (
        <>
          <Text style={styles.subTitle}>Role: {userData.role}</Text>
          <Text style={styles.subTitle}>Email: {user.email}</Text>

          {userData.role === 'business' && (
            <Button title="Manage Business" onPress={goToBusiness} />
          )}
          {userData.role === 'hospital' && (
            <Button title="Manage Hospital" onPress={goToHospital} />
          )}
          {userData.role === 'citizen' && (
            <Text>Appointments coming soon...</Text>
          )}
        </>
      )}
    </View>
  );
};

export default Dashboard;