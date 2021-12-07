import React, {useState, createRef} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet} from 'react-native';
import {FilledButton, Input} from '../components';
import {vacAppUrl} from '../baseAPIUrl';
import {useTranslation} from 'react-i18next';

const SignInScreen = ({navigation}) => {
  const {t} = useTranslation(['common', 'signin']);
  const [empID, setEmpID] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = createRef();

  const handleSignIn = async () => {
    if (empID.trim().length !== 7) {
      alert(t('emp_id_empty', {ns: 'signin'}));
    } else {
      if (password === '') {
        alert(t('pass_empty', {ns: 'signin'}));
      } else {
        try {
          const {data} = await axios.post(`${vacAppUrl}/authentication/`, {
            empID,
            password,
          });
          if (data.employee) {
            await AsyncStorage.setItem('userId', JSON.stringify(data.employee));
            navigation.replace('DrawerNavigationRoutes');
          } else {
            alert(t('invalid_sign_in', {ns: 'signin'}));
          }
        } catch (error) {
          alert(error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={empID}
        label={t('employee_id', {ns: 'signin'})}
        autoFocus
        onChangeText={text => {
          if (text.trim().length === 7) {
            passwordRef.current.focus();
          }
          setEmpID(text.trim());
        }}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <Input
        ref={passwordRef}
        value={password}
        label={t('password', {ns: 'signin'})}
        secureTextEntry={true}
        onChangeText={text => {
          if (text.split('\t').length > 0) {
            setPassword(text.trim());
          } else {
            setPassword(text);
          }
        }}
      />
      <FilledButton title={t('sign_in')} onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});

export default SignInScreen;
