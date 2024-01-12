import React, {useState} from 'react';
import {TouchableOpacity, View, Alert, StyleSheet, Text} from 'react-native';
import colors from '../utils/colors';
import {Screen, CustomInput, CustomButton} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {logIn} from '../api/auth';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/reducers/userSlice';
import {useNavigation} from '@react-navigation/native';

const initialState = {
  username: '',
  password: '',
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formState, setFormState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (!formState.username) {
        Alert.alert('Your Username is required');
        setIsLoading(false);
      } else if (!formState.password) {
        Alert.alert('Your Password is required');
        setIsLoading(false);
      } else {
        logIn(formState.username, formState.password)
          .then(async res => {
            if (res.data) {
              const uData = {
                username: res?.data?.username,
                password: formState.password,
                userId: res?.data?.id,
                token: res?.data?.token,
              };
              // await saveToAsyncStorage('user', uData);
              dispatch(setUserData(uData));
              navigation.navigate('Home');
            } else {
              Alert.alert('Email or Password is wrong');
            }
            setIsLoading(false);
          })
          .catch(() => {
            Alert.alert('Email or Password is wrong');
          });
      }
    }, 1000);
  };

  return (
    <Screen>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View style={styles.titleView}>
            <Icon name="pills" size={50} color={colors.default.primary} />
            <Text style={styles.title}> Medication Tracker App</Text>
          </View>
          <Text style={styles.subTitle}>Sign In</Text>
          <CustomInput
            style={styles.input}
            placeholder="Enter your username"
            value={formState.username}
            onChange={username => setFormState({...formState, username})}
            leftIcon={'user'}
          />
          <CustomInput
            style={styles.input}
            placeholder="Enter your Password"
            value={formState.password}
            onChange={password => setFormState({...formState, password})}
            leftIcon={'eye'}
          />
          <CustomButton
            loading={isLoading}
            style={styles.signInButton}
            onPress={handleSignIn}
            title="Continue"
          />
          <View style={styles.signUpContainer}>
            <Text>Don't have an account?&nbsp;</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={styles.signUpText}>Sign up!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: colors.greys.lightest,
    padding: 20,
    borderRadius: 20,
  },
  title: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: '600',
    color: colors.default.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    marginTop: 60,
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
    color: colors.text.light,
  },
  signInButton: {
    marginBottom: 15,
    marginTop: 30,
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
  },
  signUpText: {
    color: colors.default.secondary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    paddingLeft: 15,
    height: 66,
    backgroundColor: colors.inputField.default,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
