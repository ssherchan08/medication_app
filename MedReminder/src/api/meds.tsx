import {DELETE, GET, GETWITHTOKEN, POST, PUT} from './axios';
import {CaseType, convertKeys} from '../utils/keyConverter';

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
    if (response.status === 204) {
      onSuccessHandler();
    } else {
      onErrorHandler();
    }
  } catch (error) {
    onErrorHandler();
  }
};

export const getMedicinesOfUser = async (
  token: string,
  onSuccess,
  onError = () => {},
) => {
  try {
    const response = await GETWITHTOKEN('meds/user-medicine-list/', token);
    if (response.data) {
      const data = convertKeys(response.data, CaseType.camel.toString());
      onSuccess(data);
    } else {
      onError();
    }
  } catch (error) {
    console.log(error);
    onError();
  }
};

export const getMedicinesDetails = async (
  medId: number,
  onSuccess,
  onError = () => {},
) => {
  try {
    const response = await GET(`meds/get-edit/${medId}`);
    if (response.data) {
      const data = convertKeys(response.data, CaseType.camel.toString());
      onSuccess(data);
    } else {
      onError();
    }
  } catch (error) {
    console.log(error);
    onError();
  }
};

export const editMedicine = async (
  medId: number,
  editedMedicine = {},
  onSuccessHandler = () => {},
  onErrorHandler = () => {},
) => {
  try {
    const response = await PUT(
      `meds/get-edit/${medId}/`,
      convertKeys(editedMedicine),
    );
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

export const getUserMedsPerDay = async (
  uId: number,
  day: any,
  onSuccessHandler,
  onErrorHandler = () => {},
) => {
  try {
    const response = await GET(
      `meds/filter-user-medicine/?user=${uId}&reminder_days__contains=${day}`,
    );
    if (response.data) {
      const data = convertKeys(response.data, CaseType.camel.toString());
      onSuccessHandler(data);
    } else {
      onErrorHandler();
    }
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
};
