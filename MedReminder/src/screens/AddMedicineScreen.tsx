import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {ArrowLeftIcon} from '../icons';
import {Screen, Form} from '../components/';
import {useNavigation} from '@react-navigation/core';

const AddMedicineScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Add Medicine</Text>
      </View>
      <Text style={styles.medicineTitle}>New Medicine</Text>
      <Text style={styles.description}>
        Fill out the fields and hit the Save Button to add it!
      </Text>
      <Form type="Add" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 15,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  mainTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 20,
  },
  medicineTitle: {
    marginBottom: 10,
    fontWeight: '400',
    fontSize: 18,
  },
  description: {
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default AddMedicineScreen;
