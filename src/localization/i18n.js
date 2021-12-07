import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import commonEN from './en/common.json';
import signInEN from './en/signIn.json';
import moldTempEN from './en/moldTemp.json';
import assetEN from './en/asset.json';
import packingEN from './en/packing.json';
import wipEN from './en/wipCouting.json';

import commonVI from './vi/common.json';
import signInVI from './vi/signIn.json';
import moldTempVI from './vi/moldTemp.json';
import assetVI from './vi/asset.json';
import packingVI from './vi/packing.json';
import wipVI from './vi/wipCouting.json';

const getDefaultLang = async () => {
  try {
    const storedLang = await AsyncStorage.getItem('lang');
    if (storedLang != null) {
      i18n.changeLanguage(storedLang);
    }
  } catch (error) {}
};

getDefaultLang();

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources: {
    en: {
      common: commonEN,
      signin: signInEN,
      moldtemp: moldTempEN,
      asset: assetEN,
      packing: packingEN,
      wip: wipEN,
    },
    vi: {
      common: commonVI,
      signin: signInVI,
      moldtemp: moldTempVI,
      asset: assetVI,
      packing: packingVI,
      wip: wipVI,
    },
  },
  defaultNS: 'common',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
