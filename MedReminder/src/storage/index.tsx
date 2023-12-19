import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeStringData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const storeObjectData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const getStringData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (e) {
    // error reading value
    return false;
  }
};

export const getObjectData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return false;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    // error reading value
    return false;
  }
};
