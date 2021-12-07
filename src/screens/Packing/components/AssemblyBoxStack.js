import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import AssemblyBoxScreen from '../AssemblyBoxScreen';
import ScanBoxScreen from '../ScanBoxScreen';
import CreateNewBoxScreen from '../CreateNewBoxScreen';
import ChangeBoxTypeScreen from '../ChangeBoxTypeScreen';
import AddToBox from '../AddToBox';

const Stack = createStackNavigator();

const AssemblyBoxStack = () => {
  const {t} = useTranslation(['packing']);
  return (
    <Stack.Navigator
      initialRouteName="AssemblyBoxScreen"
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
        name="AssemblyBoxScreen"
        component={AssemblyBoxScreen}
        options={{title: t('assembly_box').toUpperCase()}}
      />
      <Stack.Screen
        name="ScanBoxScreen"
        component={ScanBoxScreen}
        options={{title: t('scan_box').toUpperCase()}}
      />
      <Stack.Screen
        name="AddToBox"
        component={AddToBox}
        options={{title: t('add_to_box').toUpperCase()}}
      />
      <Stack.Screen
        name="CreateNewBox"
        component={CreateNewBoxScreen}
        options={{title: t('create_new_box').toUpperCase()}}
      />
      <Stack.Screen
        name="ChangeBoxTypeScreen"
        component={ChangeBoxTypeScreen}
        options={{title: t('change_box_type').toUpperCase()}}
      />
    </Stack.Navigator>
  );
};

export default AssemblyBoxStack;
