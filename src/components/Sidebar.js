import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Divider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const Sidebar = props => {
  const {t} = useTranslation(['common']);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      props.navigation.replace('DrawerNavigationRoutes');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.sideMenuContainer}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.logo}
          source={require('../asset/images/logo.png')}
        />
      </View>
      <View style={styles.profileHeaderLine} />

      <DrawerContentScrollView {...props} style={{padding: 0}}>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          style={{margin: 0, padding: 0}}
          icon={({color, size}) => (
            <Icon color="#f60c0c" size={size} name="gear" />
          )}
          label={({color}) => (
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: 8,
                }}>
                {t('settings')}
              </Text>
              <Divider />
            </View>
          )}
          onPress={() => props.navigation.navigate('SettingScreen')}
        />
        {/* <Divider /> */}
        <DrawerItem
          style={{margin: 0, padding: 0}}
          icon={({color, size}) => (
            <Icon color="#f60c0c" size={size} name="sign-in" />
          )}
          label={({color}) => (
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: 8,
                }}>
                {t('logout')}
              </Text>
              <Divider />
            </View>
          )}
          onPress={handleLogout}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    color: 'white',
    backgroundColor: '#FBFBFB',
  },
  profileHeader: {
    padding: 15,
    textAlign: 'center',
    elevation: 5,
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#FBFBFB',
  },
  logo: {
    width: 170,
    height: 40,
    resizeMode: 'stretch',
  },
});
