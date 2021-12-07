import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Input, FilledButton, Dropdown} from '../../components';
import {vacAppUrl} from '../../baseAPIUrl';

const initialState = {
  empID: '',
  department: '',
  location: '',
  trolley: '',
};

const StartScreen = ({navigation}) => {
  const {t} = useTranslation(['common', 'wip']);
  const [item, setItem] = useState(initialState);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getLocations = async () => {
        try {
          const {data} = await axios.get(`${vacAppUrl}/locations`);
          setLocations(data);
        } catch (error) {
          console.log(error);
        }
      };

      getLocations();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getDepartments = async () => {
        try {
          const {data} = await axios.get(`${vacAppUrl}/departments`);
          setDepartments(data);
        } catch (error) {
          alert(error);
        }
      };

      getDepartments();
    });
    return unsubscribe;
  }, [navigation]);

  const handleStart = () => {
    if (item.empID === '') {
      alert(t('pls_input_emp_id', {ns: 'wip'}));
    } else if (item.department === '') {
      alert(t('pls_choose_department', {ns: 'wip'}));
    } else if (item.location === '') {
      alert(t('pls_choose_location', {ns: 'wip'}));
    } else if (item.trolley === '') {
      alert(t('pls_input_trolley', {ns: 'wip'}));
    } else {
      navigation.navigate('WIPStockCheckMainScreen', item);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={item.empID}
        label={t('employee_code', {ns: 'wip'})}
        autoFocus
        onChangeText={text => {
          setItem({...item, empID: text});
        }}
      />
      <Dropdown
        selectedValue={item.department}
        label={t('choose_department', {ns: 'wip'})}
        onValueChange={(itemValue, itemIndex) =>
          setItem({...item, department: itemValue})
        }
        items={departments}
      />
      <Dropdown
        selectedValue={item.location}
        label={t('choose_location', {ns: 'wip'})}
        onValueChange={(itemValue, itemIndex) =>
          setItem({...item, location: itemValue})
        }
        items={locations}
      />
      <Input
        value={item.trolley}
        label={t('trolley', {ns: 'wip'})}
        placeholder="1-100"
        onChangeText={text => {
          setItem({...item, trolley: text});
        }}
      />
      <FilledButton title={t('start')} onPress={handleStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
});

export default StartScreen;
