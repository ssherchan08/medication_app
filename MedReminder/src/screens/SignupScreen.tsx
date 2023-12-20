import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {Screen, CustomInput, CustomButton} from '../components';
import colors from '../utils/colors';
import {logIn, signUp} from '../api/auth';
import {useDispatch} from 'react-redux';
import {setUserData} from '../actions/user';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
};

const SignupScreen = ({navigation}: any): React.JSX.Element => {
  const [formState, setFormState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (!formState.username) {
        Alert.alert('Your UserName is required');
        setIsLoading(false);
      } else if (!formState.email) {
        Alert.alert('Your Email is required');
        setIsLoading(false);
      } else if (!formState.password) {
        Alert.alert('Your Password is required');
        setIsLoading(false);
      } else if (!formState.confirmedPassword) {
        Alert.alert('You must confirm your password');
        setIsLoading(false);
      } else if (formState.password !== formState.confirmedPassword) {
        Alert.alert('Your passwords need to match');
        setIsLoading(false);
      } else {
        signUp(formState.username, formState.password, formState.email)
          .then(async data => {
            if (data.data) {
              Alert.alert('', 'You have been registered succesfully!', [
                {
                  text: 'OK',
                  onPress: () => {
                    logIn(formState.username, formState.password).then(
                      async res => {
                        if (res.data) {
                          dispatch(
                            setUserData({
                              username: res?.data?.username,
                              password: formState.password,
                              userId: res?.data?.id,
                              token: res?.data?.token,
                            }),
                          );
                          navigation.navigate('Home');
                        } else {
                          Alert.alert('Email or Password is wrong');
                        }
                        setIsLoading(false);
                      },
                    );
                  },
                },
              ]);
            } else {
              Alert.alert(
                'An error occured or the Email is already registered',
              );
            }
            setIsLoading(false);
          })
          .catch(() => {
            Alert.alert('An error occured or the Email is already registered');
          });
      }
    }, 2000);
  };

  return (
    <Screen>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.subTitle}>Sign up for a free account</Text>
          <CustomInput
            style={styles.input}
            placeholder="Username"
            value={formState.username}
            onChange={username => setFormState({...formState, username})}
            leftIcon={'user'}
          />
          <CustomInput
            style={styles.input}
            placeholder="Your Email"
            value={formState.email}
            onChange={email => setFormState({...formState, email})}
            leftIcon={'envelope'}
          />
          <CustomInput
            style={styles.input}
            placeholder="Your Password"
            value={formState.password}
            onChange={password => setFormState({...formState, password})}
            leftIcon={'lock'}
          />
          <CustomInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formState.confirmedPassword}
            onChange={confirmedPassword =>
              setFormState({...formState, confirmedPassword})
            }
            leftIcon={'lock'}
          />
          <CustomButton
            style={{marginTop: 40}}
            loading={isLoading}
            onPress={handleSignUp}
            title="Sign up"
          />
          <View style={styles.signInContainer}>
            <Text>Already have an account?&nbsp;</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.logInText}>Log In!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    marginTop: 85,
    fontSize: 20,
    marginBottom: 50,
    fontWeight: '600',
    color: colors.text.light,
  },
  signInContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
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
  logInText: {
    color: colors.default.secondary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
