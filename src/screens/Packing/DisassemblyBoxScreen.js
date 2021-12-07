import React, {useState} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {FilledButton, IconButton, Input, Loading} from '../../components';
import {vacAppUrl} from '../../baseAPIUrl';

const initialState = {
  boxID: '',
  boxType: '',
  batchcode: [],
  curProduct: [],
};

const DisassemblyBoxScreen = () => {
  const {t} = useTranslation(['common', 'packing']);
  const [boxData, setBoxData] = useState(initialState);
  const [boxID, setBoxID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lstRemove, setLstRemove] = useState([]);

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

  const handleDelete = id => {
    Alert.alert(
      t('confirmation'),
      `${t('confirm_to_remove', {ns: 'packing'})} ${id}?`,
      [
        {
          text: t('cancel'),
          onPress: () => {
            return null;
          },
        },
        {
          text: t('confirm'),
          onPress: () => {
            setBoxData({
              ...boxData,
              batchcode: boxData.batchcode.filter(item => item !== id),
            });
            setLstRemove([...lstRemove, id]);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.delete(`${vacAppUrl}/boxdetail/`, {
        data: {
          boxID: boxData.boxID,
          batchcode: lstRemove,
        },
      });
      if (res.data.status === 'SUCCESS') {
        alert(t('update_success'));
      } else if (res.data.status === 'FAIL') {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onUpdate = () => {
    Alert.alert(
      t('confirmation'),
      `${t('confirm_to_update_box')} ${boxData.boxID}?`,
      [
        {
          text: t('cancel'),
          onPress: () => {
            return null;
          },
        },
        {
          text: t('confirm'),
          onPress: handleUpdate,
        },
      ],
      {cancelable: false},
    );
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
        <FilledButton title={t('update')} onPress={onUpdate} />
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
                    <View style={styles.textRow}>
                      <Text>{item}</Text>
                      <IconButton
                        iconName="trash"
                        size={18}
                        color="#f60c0c"
                        onPress={() => handleDelete(item)}
                      />
                    </View>
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

export default DisassemblyBoxScreen;
