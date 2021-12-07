import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Sidebar from './Sidebar';
import MainMenuStack from '../screens/MainMenu/MainMenuStack';

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={props => <Sidebar {...props} />}>
      <Drawer.Screen
        name="MainMenuStack"
        options={{drawerLabel: 'Main Menu'}}
        component={MainMenuStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
