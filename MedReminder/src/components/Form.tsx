import React, {useState, useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Platform,
  StyleSheet,
  LogBox,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {enUS} from 'date-fns/locale';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {MEDICINE_TYPES, MEDICINE_DAYS} from '../constants';
import colors from '../utils/colors';
import {Text} from 'react-native';
import CustomButton from './CustomButton';
import CheckBox from '@react-native-community/checkbox';
import {CustomInput} from '.';
import {addMedicine, deleteMedicine, editMedicine} from '../api/meds';
import {editIntake} from '../redux/reducers/intakesSlice';

const Form = ({type = 'Add'}) => {
  const initialAddState = {
    amount: '',
    dose: '',
    medType: '',
    name: '',
    reminder: '',
    reminderDays: [],
    takenOn: [],
    user: 0,
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pressedIntake} = useSelector((state: any) => state.intakes);
  const initialState = useMemo(() => {
    return type === 'Add' ? initialAddState : pressedIntake;
  }, []);
  const [formState, setFormState] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dropDownPickerVisible, setDropDownPickerVisible] = useState(false);
  const [dropDownPickerItems, setDropDownPickerItems] =
    useState(MEDICINE_TYPES);
  const {userData} = useSelector(state => state.user);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    formState.user = JSON.parse(userData.userId);
    // Compare the current values with the initialState and check for empty values
    // If there have been NO updates made or there is at least one empty value, disable the button
    // When there is at least one update and NO empty value, enable the button for the user to submit the changes
    const comparedValues = [];
    const emptyValues = [];
    for (let key in formState) {
      // Check for empty and not updated arrays in the formstate (except the takenOn-Array)
      if (Array.isArray(formState[key]) && key !== 'takenOn') {
        emptyValues.push(formState[key].length === 0);
        comparedValues.push(
          formState[key].toString() === initialState[key].toString(),
        );
        // Check for empty and not updated strings in the formstate
      } else if (typeof formState[key] === 'string') {
        emptyValues.push(formState[key] === '');
        comparedValues.push(formState[key] === initialState[key]);
      }
    }
    const hasUpdatedValues = comparedValues.some(value => value === false);
    const hasEmptyValues = emptyValues.some(value => value === true);
    setButtonDisabled(!hasUpdatedValues || hasEmptyValues);
  }, [formState, initialState, userData.userId]);

  const submitForm = async () => {
    if (type === 'Add') {
      const onAddSuccess = () => {
        dispatch(editIntake(formState));
        Alert.alert(
          'Medicine added!',
          'You can return to Home by clicking on "Ok"',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Home');
              },
              style: 'cancel',
            },
          ],
        );
      };
      const onAddFailure = () =>
        Alert.alert('Something went wrong. Please try again');
      addMedicine(formState, onAddSuccess, onAddFailure);
    } else if (type === 'Edit') {
      const onEditSuccess = () => {
        dispatch(editIntake(formState));
        Alert.alert(
          'Medicine updated!',
          'You can return to Home by clicking on "Ok"',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('Home'),
              style: 'cancel',
            },
          ],
        );
      };
      const onEditFailure = () =>
        Alert.alert('Something went wrong. Please try again');
      editMedicine(pressedIntake.id, formState, onEditSuccess, onEditFailure);
    }
  };

  const onDeleteMedicine = () => {
    const onDeleteSuccess = () => {
      dispatch(editIntake(formState));
      Alert.alert(
        'Medicine deleted!',
        'You can return to Home by clicking on "Ok"',
        [
          {
            text: 'Ok',
            onPress: () => {
              navigation.navigate('Home');
            },
            style: 'cancel',
          },
        ],
      );
    };
    const onDeleteFailure = () =>
      Alert.alert('Something went wrong. Please try again');
    deleteMedicine(formState.id, onDeleteSuccess, onDeleteFailure);
  };

  const handleDatePickerConfirm = (date: Date) => {
    const formattedTimeString =
      Platform.OS === 'ios'
        ? date?.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            formatMatcher: 'basic',
          })
        : format(date, 'hh:mm a', {locale: enUS}).toUpperCase();
    setFormState({...formState, reminder: formattedTimeString});
    hideDatePicker();
  };

  const showDatePicker = () => setDatePickerVisible(true);

  const hideDatePicker = () => setDatePickerVisible(false);

  const selectReminderDay = (day: any) => {
    const isAdded =
      formState?.reminderDays.findIndex((addedDay: any) => addedDay === day) !==
      -1;
    if (isAdded) {
      return setFormState({
        ...formState,
        reminderDays: formState.reminderDays.filter(
          (addedDay: any) => addedDay !== day,
        ),
      });
    }
    setFormState({
      ...formState,
      reminderDays: formState.reminderDays.concat(day),
    });
  };

  return (
    <ScrollView
      // bounces={false}
      style={{width: '100%'}}
      showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal: 10}}>
        {/* *** NAME *** */}
        <Text style={styles(false).inputLabel}>Name* (e.g. Ibuprofen)</Text>
        <CustomInput
          style={styles(false).inputContainer}
          placeholder="Name"
          value={formState.name}
          onChange={name => setFormState({...formState, name})}
        />
        {/* *** TYPE *** */}
        <Text style={styles(false).inputLabel}>Type*</Text>
        <DropDownPicker
          placeholderStyle={styles(false).placeholderStyle}
          arrowIconStyle={styles(false).arrowIconStyle}
          textStyle={styles(false).dropDownPickerText}
          dropDownContainerStyle={styles(false).dropDownPickerContainer}
          style={styles(false).dropDownPicker}
          value={formState.medType}
          setItems={setDropDownPickerItems}
          open={dropDownPickerVisible}
          setOpen={setDropDownPickerVisible}
          items={dropDownPickerItems}
          setValue={val => setFormState({...formState, medType: val()})}
        />
        {/* *** DOSE *** */}
        <Text style={styles(false).inputLabel}>Dose* (e.g. 100mg)</Text>
        <CustomInput
          style={styles(false).inputContainer}
          placeholder="Dose"
          value={formState.dose}
          onChange={dose => setFormState({...formState, dose})}
        />
        {/* *** AMOUNT *** */}
        <Text style={styles(false).inputLabel}>Amount* (e.g. 3)</Text>
        <CustomInput
          style={styles(false).inputContainer}
          placeholder="Amount"
          keyboardType="numeric"
          value={formState.amount}
          onChange={amount => setFormState({...formState, amount})}
        />
        {/* *** REMINDER TIME *** */}
        <Text style={styles(false).inputLabel}>Time*</Text>
        {formState.reminder ? (
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles(false).reminder}>
            <Text style={{fontSize: 16}}>{formState.reminder}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles(false).addReminderBtn}>
            <Text style={{fontSize: 26, fontWeight: '600'}}>+</Text>
          </TouchableOpacity>
        )}
        <DateTimePickerModal
          textColor="black"
          display="spinner"
          isVisible={datePickerVisible}
          locale="en_US"
          mode="time"
          onConfirm={handleDatePickerConfirm}
          onCancel={hideDatePicker}
        />
        {/* *** REMINDER DAY *** */}
        <Text style={styles(false).inputLabel}>Days*</Text>
        <View style={styles(false).checkBoxContainerStyle}>
          {MEDICINE_DAYS.map(day => {
            const isChecked = formState?.reminderDays.find(
              (addedDay: any) => addedDay === day.value,
            )
              ? true
              : false;
            return (
              <View style={styles(isChecked).checkBoxStyle}>
                <CheckBox
                  boxType="square"
                  animationDuration={0.1}
                  value={isChecked}
                  tintColor={colors.inputField.default}
                  tintColors={{
                    true: colors.text.light,
                    false: colors.inputField.default,
                  }}
                  onCheckColor={colors.text.light}
                  onFillColor={colors.inputField.default}
                  onTintColor={colors.inputField.default}
                  onValueChange={() => selectReminderDay(day.value)}
                />
                <Text style={styles(isChecked).checkBoxTextStyle}>
                  {day.title}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* *** SUBMIT BUTTON *** */}
      <CustomButton
        disabled={buttonDisabled}
        title="Save Medicine"
        onPress={submitForm}
        style={{marginBottom: 25}}
      />
      {/* *** DELETE AREA *** */}
      {type === 'Edit' && (
        <View style={styles(false).deleteContainer}>
          <Text style={styles(false).deleteTitle}>Attention!</Text>
          <Text style={styles(false).deleteDescription}>
            Once deleted, your medicine can't be restored again!
          </Text>
          <CustomButton
            onPress={onDeleteMedicine}
            title="Delete Medicine"
            style={styles(false).deleteBtn}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = (isChecked = false) =>
  StyleSheet.create({
    inputLabel: {
      fontSize: 18,
      width: '100%',
      marginLeft: 8,
      marginTop: 5,
      color: colors.text.dark,
      fontFamily: 'bold',
      fontWeight: '400',
    },
    reminder: {
      width: '100%',
      alignItems: 'center',
      marginLeft: 8,
      marginTop: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 7,
      paddingVertical: 14,
      paddingHorizontal: 10,
      backgroundColor: colors.inputField.default,
      borderColor: colors.greys.light2,
    },
    addReminderBtn: {
      marginLeft: 8,
      marginTop: 10,
      marginBottom: 20,
      borderRadius: 12,
      height: 48,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.secondary,
      shadowOffset: {height: 1, width: 1}, // IOS
      shadowOpacity: 0.1, // IOS
      shadowRadius: 1, //IOS
      elevation: 1, // Android
    },
    inputContainer: {
      marginTop: 10,
      width: '100%',
      height: 50,
    },
    dropDownPicker: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 8,
      backgroundColor: colors.inputField.default,
      borderColor: colors.inputField.default,
    },
    dropDownPickerText: {
      fontFamily: '400',
      fontSize: 16,
      color: colors.text.dark,
    },
    dropDownPickerContainer: {
      marginLeft: 5,
      marginTop: 5,
      backgroundColor: colors.inputField.default,
      borderColor: colors.inputField.default,
      borderTopColor: colors.text.light,
    },
    arrowIconStyle: {
      // color: colors.text.light,
    },
    placeholderStyle: {
      color: colors.text.light,
    },
    deleteContainer: {
      padding: 25,
      borderWidth: 2,
      marginBottom: 30,
      borderStyle: 'dashed',
      width: '100%',
      borderColor: colors.text.red,
    },
    deleteTitle: {
      textAlign: 'center',
      marginBottom: 15,
      fontWeight: 'bold',
      color: colors.text.red,
      fontSize: 20,
    },
    deleteDescription: {
      textAlign: 'center',
      marginBottom: 25,
      color: colors.text.red,
    },
    deleteBtn: {
      backgroundColor: colors.text.red,
      borderColor: colors.text.red,
      borderWidth: 1,
      fontFamily: '400',
    },
    checkBoxContainerStyle: {
      marginBottom: 30,
      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    checkBoxStyle: {
      marginVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkBoxTextStyle: {
      color: isChecked ? colors.text.dark : colors.text.light,
      fontFamily: isChecked ? '400' : 'regular',
      fontSize: 18,
      marginLeft: 14,
      fontWeight: '400',
    },
  });

export default Form;
