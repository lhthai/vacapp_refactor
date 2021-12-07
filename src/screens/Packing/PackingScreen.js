import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

import AssemblyBoxStack from './components/AssemblyBoxStack';
import DisassemblyBoxStack from './components/DisassemblyBoxStack';

const Tab = createBottomTabNavigator();

const PackingScreen = () => {
  const {t} = useTranslation(['packing']);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen
          name="AssemblyBoxStack"
          component={AssemblyBoxStack}
          options={{
            tabBarLabel: t('assembly_box'),
            tabBarLabelStyle: {
              fontSize: 13,
            },
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="box" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="DisassemblyBoxStack"
          component={DisassemblyBoxStack}
          options={{
            tabBarLabel: t('disassembly_box'),
            tabBarLabelStyle: {
              fontSize: 13,
            },
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="box-open" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default PackingScreen;
