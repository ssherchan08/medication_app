import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';
import {Screen, IntakesProgress, Calendar, IntakesList} from '../components';
import {pressOnIntake, setIntakesForToday} from '../actions/intakes';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';
import {signOut} from '../api/auth';
import {getUserMedsPerDay} from '../api/meds';
import {setUserData} from '../actions/user';

const HomeScreen = ({navigation}: any): React.JSX.Element => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const {user, calendar} = useSelector(state => state);

  useEffect(() => {
    setUsername(user?.username);
    const onSuccess = (intakes: any[]) => {
      dispatch(setIntakesForToday(intakes));
    };
    const onError = () => {
      Alert.alert(
        '',
        'Something wrent wrong getting your data. You will be logged out safely',
        [
          {
            text: 'OK',
            onPress: () => {
              signOut(user.username, user.password, user.token);
              dispatch(setUserData(''));
              navigation.navigate('Login');
            },
            style: 'cancel',
          },
        ],
      );
    };
    getUserMedsPerDay(
      user.userId,
      calendar?.selectedDay?.formatted,
      onSuccess,
      onError,
    );
  }, [calendar?.selectedDay?.formatted, dispatch, navigation, user]);

  useEffect(() => {
    // Always Clear pressedIntake State when focusing HomeScreen
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(pressOnIntake(''));
    });
    return unsubscribe;
  });

  const logout = () => {
    Alert.alert('', 'Are you sure you want to log out?', [
      {
        text: 'OK',
        onPress: () => {
          signOut(user.username, user.password, user.token);
          dispatch(setUserData(''));
          navigation.navigate('Login');
        },
      },
      {
        text: 'CANCEL',
        onPress: () => {},
      },
    ]);
  };

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <View style={styles.userAvatar}>
          <Icon name="user" size={30} color={colors.text.light} />
          <Text style={styles.username}>{username}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Icon name="sign-in" size={35} color={colors.text.light} />
        </TouchableOpacity>
      </View>
      <Calendar />
      <IntakesProgress />
      <IntakesList />
      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={styles.addMedicineIcon}>
        <Text style={styles.addMedicineText}>ADD MEDICINE</Text>
        <Icon name="plus" size={18} color={colors.text.dark} />
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  userAvatar: {
    marginRight: 'auto',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginLeft: 'auto',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  username: {
    color: colors.text.dark,
    fontSize: 14,
    marginTop: 5,
  },
  openDrawerButton: {
    padding: 15,
    paddingLeft: 0,
  },
  drawerContentContainer: {
    backgroundColor: colors.background.secondary,
    height: '100%',
    paddingTop: 75,
    paddingHorizontal: 25,
  },
  drawerCloseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 0,
  },
  drawerCloseIcon: {
    marginBottom: 30,
    marginLeft: -4,
  },
  addMedicineIcon: {
    backgroundColor: colors.default.tertiary,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 12,
    height: 60,
    width: '100%',
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 0.1, // IOS
    shadowRadius: 1, //IOS
    elevation: 1, // Android
  },
  addMedicineText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
});

export default HomeScreen;
