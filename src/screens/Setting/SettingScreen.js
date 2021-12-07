import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {CustomRadioButton} from '../../components';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const {t, i18n} = useTranslation(['common']);
  const [checked, setChecked] = useState(i18n.language);

  const setLanguage = async () => {
    try {
      await AsyncStorage.setItem('lang', i18n.language);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>{t('language')}</List.Subheader>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <CustomRadioButton
            title={t('english')}
            value="en"
            checked={checked}
            onPress={() => {
              setChecked('en');
              i18n.changeLanguage('en');
              setLanguage();
            }}
          />
          <CustomRadioButton
            title={t('vietnamese')}
            value="vi"
            checked={checked}
            onPress={() => {
              setChecked('vi');
              i18n.changeLanguage('vi');
              setLanguage();
            }}
          />
        </View>
      </List.Section>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
