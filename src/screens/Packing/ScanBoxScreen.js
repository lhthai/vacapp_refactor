import React, {useState} from 'react';
import axios from 'axios';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Input, FilledButton, Loading} from '../../components';
import {vacAppUrl} from '../../baseAPIUrl';

const initialState = {
  boxID: '',
  boxType: '',
  batchcode: [],
  curProduct: [],
};

const ScanBoxScreen = ({navigation}) => {
  const {t} = useTranslation(['common', 'packing']);
  const [boxData, setBoxData] = useState(initialState);
  const [boxID, setBoxID] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentInBox = async boxID => {
    setIsLoading(true);
    try {
      const {data} = await axios.get(
        `${vacAppUrl}/boxdetail/getcurrentbox/${boxID}`,
      );
      if (data) {
        setBoxData(data);
      }
    } catch (error) {
      if ((error.response.status = 404)) {
        alert(t('this_box_not_found', {ns: 'packing'}));
      } else {
        alert(error);
      }
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 8}}>
        <Input
          value={boxID}
          label={t('box_id', {ns: 'packing'})}
          autoFocus
          onChangeText={text => {
            if (text.trim().length === 7) {
              getCurrentInBox(text.trim());
            }
            setBoxID(text.trim());
          }}
        />
        <FilledButton
          title={t('add_to_box', {ns: 'packing'})}
          onPress={() => {
            if (!boxData.boxID || boxData.boxID === '') {
              alert(t('box_id_invalid', {ns: 'packing'}));
            } else {
              navigation.navigate('AddToBox', {
                boxData: boxData,
              });
            }
          }}
        />
        <ScrollView style={{marginTop: 10}}>
          {boxData.batchcode.length > 0 ? (
            <Card style={{backgroundColor: 'none'}}>
              <Card.Title
                titleStyle={{color: '#fff', fontSize: 17}}
                title={`${t('currently_in_box', {ns: 'packing'})}: ${
                  boxData.batchcode.length
                } pcs`}
                style={{backgroundColor: '#67AB9F'}}
              />
              <Card.Content>
                {boxData.batchcode.map((item, index) => (
                  <View key={index}>
                    <Text style={styles.textRow}>{item}</Text>
                    <Divider />
                  </View>
                ))}
              </Card.Content>
            </Card>
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      </View>
      <Loading loading={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    fontSize: 16,
  },
});

export default ScanBoxScreen;
