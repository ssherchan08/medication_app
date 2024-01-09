import {Alert} from 'react-native';
import {GET, POST, POSTWITHTOKEN} from './axios';

export const logIn = async (name = '', pwd = '') => {
  try {
    const body = {
      username: name,
      password: pwd,
    };
    return await POST('api/login/', body);
  } catch (err) {
    Alert.alert('Email or Password is wrong');
  }
};

export const signUp = async (name = '', pwd = '', email = '') => {
  try {
    const body = {
      username: name,
      password: pwd,
      email: email,
    };
    return await POST('api/register/', body);
  } catch (err) {
    Alert.alert('An error occured or the Email is already registered');
  }
};

export const signOut = async (name = '', pwd = '', token = '') => {
  try {
    const body = {
      username: name,
      password: pwd,
    };
    return await POSTWITHTOKEN('api/logout/', body, token);
  } catch (err) {
    Alert.alert('An error occured or the Email is already registered');
  }
};

// export const getUser = async (
//   onSuccessHandler = () => {},
//   onErrorHandler = () => {},
// ) => {
//   try {
//     const currentUserData = await GET('hello/');
//     if (currentUserData.exists) {
//       // User Data will be passed as an argument to access it in the handler function
//       return onSuccessHandler(currentUserData?.data);
//     }
//     throw new Error();
//   } catch (error) {
//     onErrorHandler();
//   }
// };
