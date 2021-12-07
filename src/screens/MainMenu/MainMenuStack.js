import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

// Import components
import Toggler from '../../components/Toggler';

// Import screens
import MainMenuScreen from './MainMenuScreen';
import AssetManagement from '../AssetManagement';
import MoldTemperature from '../MoldTemperature';
import WIPStockCheckStack from '../WIPStockCheck/WIPStockCheckStack';
import PackingScreen from '../Packing/PackingScreen';

const Stack = createStackNavigator();

const MainMenuStack = ({navigation}) => {
  const {t} = useTranslation(['common']);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f60c0c',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="MainMenuScreen"
        component={MainMenuScreen}
        options={{
          title: t('main_menu').toUpperCase(),
          headerLeft: () => <Toggler navigationProps={navigation} />,
        }}
      />
      <Stack.Screen
        name="AssetManagement"
        component={AssetManagement}
        options={{
          title: t('asset_management').toUpperCase(),
        }}
      />
      <Stack.Screen
        name="MoldTemperature"
        component={MoldTemperature}
        options={{
          title: t('mold_temperature').toUpperCase(),
        }}
      />
      <Stack.Screen
        name="WIPStockCheckStack"
        component={WIPStockCheckStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PackingScreen"
        component={PackingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainMenuStack;
