import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToAsyncStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    //
  }
};

export const loadFromAsyncStorage = async (key: string) => {
  try {
    const serializedValue = await AsyncStorage.getItem(key);
    return serializedValue != null ? JSON.parse(serializedValue) : null;
  } catch (error) {
    //
  }
};

export const removeFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};
