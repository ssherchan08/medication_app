import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {takeMedicine} from '../api/firebase';
import {takeNewMedicine} from '../actions/user';
import {pressOnIntake} from '../actions/intakes';
import {CheckmarkIcon, ClockIcon, InfoIcon} from '../icons';
import {renderMedicineIcon} from '../utils/renderMedicineIcon';
import colors from '../utils/colors';

/*
 **********************************
 **** PRESSED INTAKE COMPONENT ****
 **********************************
 */

const PressedIntake = ({id, name, amount, type, dose, setTaken}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {calendar} = useSelector(state => state);

  const setTakenStates = () => {
    setTaken(true);
    // Trigger the taken event globally
    // Other components can subscribe to that global event
    dispatch(takeNewMedicine(id));
  };

  const handleOnTake = () => {
    const formattedSelectedDay =
      calendar?.selectedDay?.date?.toLocaleDateString('en-US');
    // takeMedicine(formattedSelectedDay, id, setTakenStates, () =>
    //   Alert.alert('Something went wrong. Please try again!'),
    // );
    dispatch(pressOnIntake(''));
  };

  return (
    <View style={styles.pressedIntakeContainer}>
      <TouchableOpacity
        onPress={handleOnTake}
        style={{marginRight: 'auto', marginLeft: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>TAKE</Text>
      </TouchableOpacity>
      <View style={styles.pressedIntakeCenter}>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>
            {name}
          </Text>
          <Text>
            {amount} {`${type}${parseInt(amount) > 1 ? 's' : ''}`}, {dose}
          </Text>
        </View>
        {renderMedicineIcon(type)}
      </View>
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => navigation.navigate('')}>
        <InfoIcon />
      </TouchableOpacity>
    </View>
  );
};

/*
 **********************************
 **** DEFAULT INTAKE COMPONENT ****
 **********************************
 */

const DefaultIntake = ({taken, name, amount, type, dose, reminder}) => {
  return (
    <>
      {taken ? (
        <CheckmarkIcon style={{marginRight: 20}} />
      ) : (
        <ClockIcon style={{marginRight: 20}} />
      )}
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>
          {name}
        </Text>
        <Text>
          {amount} {`${type}${parseInt(amount) > 1 ? 's' : ''}`}, {dose}
        </Text>
      </View>
      <View style={styles.defaultIntakeReminder}>
        <Text style={{fontWeight: 'bold'}}>{reminder}</Text>
      </View>
      {renderMedicineIcon(type)}
    </>
  );
};

/*
 **********************************
 **** MAIN INTAKE COMPONENT ****
 **********************************
 */

const Intake = ({
  id,
  takenOn,
  name,
  amount,
  type,
  dose,
  reminder,
  reminderDays,
  notificationId,
}) => {
  const {calendar, intakes} = useSelector(state => state);
  const dispatch = useDispatch();
  const [taken, setTaken] = useState(null);

  const subComponentProps = {
    id,
    name,
    amount,
    type,
    dose,
    reminder,
    reminderDays,
    setTaken,
    taken,
    notificationId,
  };

  const storeProps = {
    id,
    takenOn,
    name,
    amount,
    type,
    dose,
    notificationId,
    reminder,
    reminderDays,
  };

  const handleOnPress = () => {
    dispatch(pressOnIntake(storeProps));
  };

  const isAlreadyTaken = (intakeId: any, takenOnArray: any[]) => {
    if (!intakeId || !takenOnArray) {
      return false;
    }
    // Check if the currently selected date is in the takenOnArray
    // to evaluate if the medicine have already been taken or not
    return takenOnArray?.find(
      (date: any) =>
        date === calendar?.selectedDay?.date?.toLocaleDateString('en-US'),
    );
  };

  useEffect(() => {
    setTaken(isAlreadyTaken(id, takenOn));
    dispatch(pressOnIntake(''));
  }, []);

  return (
    <TouchableWithoutFeedback onLongPress={handleOnPress}>
      <View style={styles.intakeContainer}>
        {intakes.pressedIntake.id === id ? (
          <PressedIntake {...subComponentProps} />
        ) : (
          <DefaultIntake {...subComponentProps} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  intakeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  pressedIntakeContainer: {
    backgroundColor: colors.background.secondary,
    width: '100%',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressedIntakeCenter: {
    backgroundColor: colors.background.primary,
    width: '60%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 'auto',
  },
  defaultIntakeReminder: {
    marginLeft: 'auto',
    marginRight: 10,
    backgroundColor: colors.background.secondary,
    padding: 10,
    borderRadius: 10,
  },
});

export default Intake;
