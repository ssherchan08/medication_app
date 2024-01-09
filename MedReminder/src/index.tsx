import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginScreen,
  SignupScreen,
  HomeScreen,
  MedicineDetailsScreen,
  AddMedicineScreen,
} from './screens';
import {useSelector} from 'react-redux';

export default function Main() {
  const AppStack = createStackNavigator();
  const {userData} = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <View style={{flex: 1}}>
        <AppStack.Navigator
          initialRouteName={userData?.token ? 'Home' : 'Login'}>
          <AppStack.Screen
            name="Login"
            options={() => ({
              headerShown: false,
            })}
            component={LoginScreen}
          />
          <AppStack.Screen
            name="Signup"
            options={() => ({
              headerShown: false,
            })}
            component={SignupScreen}
          />
          <AppStack.Screen
            name="Home"
            options={() => ({
              headerShown: false,
            })}
            component={HomeScreen}
          />
          <AppStack.Screen
            name="Details"
            options={() => ({
              headerShown: false,
            })}
            component={MedicineDetailsScreen}
          />
          <AppStack.Screen
            name="Add"
            options={() => ({
              headerShown: false,
            })}
            component={AddMedicineScreen}
          />
        </AppStack.Navigator>
      </View>
    </NavigationContainer>
  );
}
