import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import MainScreen from './MainScreen';
import StartScreen from './StartScreen';

const Stack = createStackNavigator();

const WIPStockCheckStack = () => {
  const {t} = useTranslation(['common']);
  return (
    <Stack.Navigator
      initialRouteName="WIPStockCheckStartScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f60c0c',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="WIPStockCheckStartScreen"
        component={StartScreen}
        options={{
          title: t('wip_stock_check').toUpperCase(),
        }}
      />
      <Stack.Screen
        name="WIPStockCheckMainScreen"
        component={MainScreen}
        options={{
          title: t('wip_stock_check').toUpperCase(),
        }}
      />
    </Stack.Navigator>
  );
};

export default WIPStockCheckStack;
