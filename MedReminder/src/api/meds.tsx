import {Alert} from 'react-native';
import {DELETE, GET, GETWITHTOKEN, POST} from './axios';
import {convertKeys} from '../utils/keyConverter';

// export const getUser = async (
//     onSuccessHandler = () => {},
//     onErrorHandler = () => {},
//   ) => {
//     try {
//       const currentUserData = await GET('hello/');
//       if (currentUserData?.data) {
//         // User Data will be passed as an argument to access it in the handler function
//         return onSuccessHandler(currentUserData?.data);
//       }
//       throw new Error();
//     } catch (error) {
//       onErrorHandler();
//     }
//   };

/**
 * *****************************
 * **** Adds a new medicine ****
 * *****************************
 * @param {Object} newMedicine - New Medicine that should be added to the User's reminders Array
 * @param {Function} onSuccessHandler - Function that runs when the medicine got added successfully
 * @param {Function} onErrorHandler - Function that runs when something went wrong adding the medicine
 * @returns {Void} - Nothing
 * @throws {String} - Error message if something went wrong adding the medicine
 */
export const addMedicine = async (
  newMedicine = {},
  onSuccessHandler = () => {},
  onErrorHandler = () => {},
) => {
  try {
    const response = await POST('meds/add/', convertKeys(newMedicine));
    if (response.data) {
      onSuccessHandler();
    } else {
      onErrorHandler();
    }
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
};

export const deleteMedicine = async (
  medId: number,
  onSuccessHandler = () => {},
  onErrorHandler = () => {},
) => {
  try {
    const response = await DELETE('meds/delete', medId);
    console.log(response.status);
    if (response.status === 204) {
      onSuccessHandler();
    } else {
      onErrorHandler();
    }
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
};

export const getMedicinesOfUser = async (
  token: string,
  onSuccess = () => {},
  onError = () => {},
) => {
  try {
    const response = await GETWITHTOKEN('meds/user-medicine-list/', token);
    // console.log(response.data);
    if (response.data) {
      onSuccess(response.data);
    } else {
      onError();
    }
  } catch (error) {
    console.log(error);
    onError();
  }
};
