import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import SignInScreen from './src/screens/SignInScreen';
import SettingScreen from './src/screens/Setting/SettingScreen';
import DrawerNavigation from './src/components/DrawerNavigation';

const Stack = createStackNavigator();

const SignIn = () => {
  return (
    <Stack.Navigator initialRouteName="SignInScreen">
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const {t} = useTranslation(['common']);
  return (
    <Stack.Navigator initialRouteName="DrawerNavigationRoutes">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerStyle: {
            backgroundColor: '#f60c0c',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: t('sign_in').toUpperCase(),
        }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerStyle: {
            backgroundColor: '#f60c0c',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: t('settings').toUpperCase(),
        }}
      />
      <Stack.Screen
        name="DrawerNavigationRoutes"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default App;
