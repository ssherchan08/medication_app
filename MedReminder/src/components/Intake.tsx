import React from 'react';
import {useDispatch} from 'react-redux';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {renderMedicineIcon} from '../utils/renderMedicineIcon';
import colors from '../utils/colors';
import {pressOnIntake} from '../redux/reducers/intakesSlice';

const DefaultIntake = ({name, amount, medType, dose, reminder}) => {
  return (
    <>
      {renderMedicineIcon(medType)}
      <View style={{marginLeft: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>
          {name}
        </Text>
        <Text>
          {amount} {`${medType}${amount > 1 ? 's' : ''}`}, {dose}
        </Text>
      </View>
      <View style={styles.defaultIntakeReminder}>
        <Text style={{fontWeight: 'bold'}}>{reminder}</Text>
      </View>
    </>
  );
};

const Intake = ({id, name, amount, medType, dose, reminder, reminderDays}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const subComponentProps = {
    name,
    amount,
    medType,
    dose,
    reminder,
    reminderDays,
  };

  const storeProps = {
    id,
    name,
    amount,
    medType,
    dose,
    reminder,
    reminderDays,
    takenOn: [],
  };

  const handleOnPress = async () => {
    dispatch(pressOnIntake(storeProps));
    navigation.navigate('Details');
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.intakeContainer}>
        <DefaultIntake {...subComponentProps} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  intakeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 12,
    borderColor: colors.background.secondary,
    borderWidth: 3,
    borderRadius: 12,
  },
  defaultIntakeReminder: {
    marginLeft: 'auto',
    backgroundColor: colors.background.secondary,
    padding: 10,
    borderRadius: 10,
  },
});

export default Intake;
