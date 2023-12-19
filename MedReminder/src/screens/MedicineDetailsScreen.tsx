import React from 'react';
import {useSelector} from 'react-redux';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Screen, Form} from '../components';
import {ArrowLeftIcon} from '../icons';

const MedicineDetailsScreen = ({navigation}) => {
  const {pressedIntake} = useSelector(state => state.intakes);

  return (
    <Screen>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Medicine Details</Text>
      </View>
      <Text style={styles.medicineName}> {pressedIntake?.name}</Text>
      <Text style={styles.description}>
        If you'd like to edit, change the fields and hit the save button!
      </Text>
      <Form type="Edit" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 15,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  mainTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  medicineName: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default MedicineDetailsScreen;
