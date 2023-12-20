import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, LogBox, StatusBar} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SignupScreen from './src/screens/SignupScreen';
import {HomeScreen, MedicineDetailsScreen} from './src/screens';
import {Provider} from 'react-redux';
import store from './src/store';
import AddMedicineScreen from './src/screens/AddMedicineScreen';

const AppStack = createStackNavigator();
function App(): React.JSX.Element {
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['Selector unknown returned the root state when called']);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor={'transparent'}
          />
          <View style={{flex: 1}}>
            <AppStack.Navigator initialRouteName={'Login'}>
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
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
