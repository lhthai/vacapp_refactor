import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const initialState = {
  empID: '',
  empName: '',
  empGroup: '',
};

const MainMenuScreen = ({navigation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [currentUser, setCurrentUser] = useState(initialState);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await AsyncStorage.getItem('userId');
        if (data) {
          const curEmp = JSON.parse(data);
          setCurrentUser({
            ...currentUser,
            empID: curEmp.empID.trim(),
            empName: curEmp.employeeName.trim(),
            empGroup: curEmp.empGroup.trim(),
          });
        } else {
          setCurrentUser(initialState);
        }
      } catch (error) {
        alert(error);
      }
    };

    if (isFocused) getCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.banner, styles.box]}>
        <Image
          style={styles.logo}
          source={require('../../asset/images/logo.png')}
        />
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={styles.version}>Version: 1.002</Text>
          <Text style={{marginLeft: 'auto', marginRight: 5}}>
            {currentUser ? currentUser.empID : ''}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, styles.box]}
            onPress={() => navigation.navigate('WIPStockCheckStack')}>
            <Icon name="boxes" size={30} style={styles.cardIcon} />
            <Text style={styles.cardText}>{t('wip_stock_check')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.box]}
            onPress={() => navigation.navigate('AssetManagement')}>
            <Icon name="money-check-alt" size={30} style={styles.cardIcon} />
            <Text style={styles.cardText}>{t('asset_management')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.box]}
            onPress={() => navigation.navigate('MoldTemperature')}>
            <Icon name="thermometer-half" size={30} style={styles.cardIcon} />
            <Text style={styles.cardText}>{t('mold_temperature')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.box]}
            onPress={() => {
              if (!currentUser || currentUser.empID === '') {
                navigation.navigate('SignIn');
              } else {
                if (currentUser.empGroup === '9501') {
                  navigation.navigate('PackingScreen');
                } else {
                  alert(t('no_auth'));
                }
              }
            }}>
            <Icon name="box" size={30} style={styles.cardIcon} />
            <Text style={styles.cardText}>{t('packing')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.box]}></TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.box]}></TouchableOpacity>
        </View>
      </ScrollView>
      <View style={[styles.footer, styles.box]}>
        <Text style={{textAlign: 'center', fontSize: 12}}>
          Copyright &copy; Action Composites Hightech Industries
        </Text>
        <Text style={{textAlign: 'center', fontSize: 12}}>
          Developed by IT Department
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    margin: 5,
    marginBottom: 5,
  },
  version: {
    fontSize: 12,
    marginTop: 3,
    marginLeft: 3,
  },
  logo: {
    width: 150,
    height: 30,
    resizeMode: 'stretch',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: 0,
  },
  card: {
    width: 100,
    height: 100,
    marginBottom: 8,
    alignItems: 'center',
  },
  box: {
    padding: 5,
    backgroundColor: '#f2f5f5',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardIcon: {
    color: '#f60c0c',
    marginVertical: 10,
  },
  cardText: {
    color: '#f60c0c',
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    marginHorizontal: 8,
    fontSize: 12,
  },
});

export default MainMenuScreen;
