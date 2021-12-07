import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {vacAppUrl} from '../../baseAPIUrl';
import {Dropdown, FilledButton} from '../../components';

const initialState = {
  boxID: '',
  boxType: '',
  createdBy: '',
};

const CreateNewBoxScreen = () => {
  const {t} = useTranslation(['common', 'packing']);
  const isFocused = useIsFocused();
  const [box, setBox] = useState(initialState);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await AsyncStorage.getItem('userId');
        if (data) {
          const curEmp = JSON.parse(data);
          setBox({...box, createdBy: curEmp.empID.trim()});
        } else {
          alert(t('please_login_and_try_again', {ns: 'packing'}));
        }
      } catch (error) {
        alert(error);
      }
    };

    if (isFocused) getCurrentUser();
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.post(`${vacAppUrl}/boxid/`, box);
      if (data) {
        setBox({...box, boxID: data.boxId});
        setIsLoading(false);
        setIsGenerated(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onGenerate = () => {
    if (box.boxType === '') {
      alert(t('please_choose_box_type', {ns: 'packing'}));
    } else {
      Alert.alert(
        t('create_new_box', {ns: 'packing'}),
        t('confirm_to_create_box', {ns: 'packing'}),
        [
          {
            text: t('cancel'),
            onPress: () => {
              return null;
            },
          },
          {
            text: t('confirm'),
            onPress: handleGenerate,
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <Dropdown
          label={t('choose_box_type', {ns: 'packing'})}
          selectedValue={box.boxType}
          onValueChange={itemValue => {
            setBox({...box, boxType: itemValue});
            setIsGenerated(false);
          }}
          items={[{name: 'Mass Production'}, {name: 'Non Mass Production'}]}
        />
        <FilledButton title={t('create')} onPress={onGenerate} />
        {isLoading && !isGenerated ? (
          <ActivityIndicator size="large" color="#67AB9F" />
        ) : !isLoading && isGenerated ? (
          <Card style={{backgroundColor: 'none', marginTop: 10}}>
            <Card.Title
              titleStyle={{color: '#fff', fontSize: 17}}
              title={t('result')}
              style={{backgroundColor: '#67AB9F'}}
            />
            <Card.Content>
              <Text style={styles.textRow}>
                {t('box_id', {ns: 'packing'})}:{' '}
                <Text style={{fontWeight: 'bold'}}>{box.boxID}</Text>
              </Text>
              <Divider />
              <Text style={styles.textRow}>
                {t('box_type', {ns: 'packing'})}:{' '}
                <Text style={{fontWeight: 'bold'}}>{box.boxType}</Text>
              </Text>
              <Divider />
              <FilledButton
                style={styles.btnPrint}
                title={t('print_label', {ns: 'packing'})}
                onPress={() => {}}
              />
            </Card.Content>
          </Card>
        ) : (
          <Text></Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnPrint: {
    backgroundColor: '#1769aa',
    marginTop: 10,
  },
  textRow: {
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default CreateNewBoxScreen;
