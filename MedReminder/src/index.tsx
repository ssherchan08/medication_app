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
// import {useDispatch} from 'react-redux';
// import {setUserData} from './actions/user';
// import {loadFromAsyncStorage} from './asyncStorage';

export default function Main() {
  const AppStack = createStackNavigator();
//   const dispatch = useDispatch();
//   const [containsUser, setContainsUser] = useState(false);
//   const userExists = async () => {
//     const userData = await loadFromAsyncStorage('user');
//     const uExists = userData ? true : false;
//     dispatch(setUserData(userData ? userData : ''));
//     setContainsUser(uExists);
//     console.log(containsUser);
//   };

//   useEffect(() => {
//     userExists();
//   }, []);

  return (
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
  );
}
