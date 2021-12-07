import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import {useTranslation} from 'react-i18next';

const AssemblyBoxScreen = ({navigation}) => {
  const {t} = useTranslation(['packing']);
  const NavigateButton = ({title, destination}) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(destination)}>
        <Text style={{fontSize: 15}}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <NavigateButton title={t('scan_box')} destination="ScanBoxScreen" />
        <NavigateButton
          title={t('create_new_box')}
          destination="CreateNewBox"
        />
        <NavigateButton
          title={t('change_box_type')}
          destination="ChangeBoxTypeScreen"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginTop: 16,
  },
});

export default AssemblyBoxScreen;
