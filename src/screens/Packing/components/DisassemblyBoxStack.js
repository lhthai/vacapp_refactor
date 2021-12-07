import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import DisassemblyBoxScreen from '../DisassemblyBoxScreen';

const Stack = createStackNavigator();

const DisassemblyBoxStack = () => {
  const {t} = useTranslation(['packing']);
  return (
    <Stack.Navigator
      initialRouteName="DisassemblyBox"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f60c0c',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 23,
        },
      }}>
      <Stack.Screen
        name="DisassemblyBox"
        component={DisassemblyBoxScreen}
        options={{title: t('disassembly_box').toUpperCase()}}
      />
    </Stack.Navigator>
  );
};

export default DisassemblyBoxStack;
