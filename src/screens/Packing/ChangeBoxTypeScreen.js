import React, {useState} from 'react';
import axios from 'axios';
import {SafeAreaView, View, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {vacAppUrl} from '../../baseAPIUrl';
import {Input, FilledButton, Loading, Dropdown} from '../../components';

const initialState = {
  id: 0,
  boxId: '',
  boxType: '',
  createdDate: '',
  createdBy: '',
  printedDate: null,
  printedBy: null,
};

const ChangeBoxTypeScreen = () => {
  const {t} = useTranslation(['common', 'packing']);
  const [box, setBox] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const getBox = async id => {
    setIsLoading(true);
    if (id !== '') {
      try {
        const {data} = await axios.get(`${vacAppUrl}/boxid/${id}`);
        if (data) {
          setBox(data);
        }
      } catch (error) {
        if ((error.response.status = 404)) {
          alert(t('this_box_not_found', {ns: 'packing'}));
          setBox(initialState);
        } else {
          alert(error);
        }
      }
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    try {
      const {data} = await axios.put(`${vacAppUrl}/boxid/${box.id}`, box);
      if (data) {
        alert(t('update_success'));
        setBox(initialState);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onUpdate = () => {
    if (box.boxId === '' || box.boxId.length !== 7) {
      alert(t('box_id_invalid', {ns: 'packing'}));
    } else {
      if (box.boxType === '') {
        alert(t('please_choose_box_type', {ns: 'packing'}));
      } else {
        Alert.alert(
          t('confirmation'),
          `${t('confirm_to_update_box', {ns: 'packing'})} ${box.boxId}?`,
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
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <Input
          value={box.boxId}
          label={t('box_id', {ns: 'packing'})}
          autoFocus
          onChangeText={text => {
            if (text.length === 7) {
              getBox(text);
            } else {
              setBox(initialState);
            }
            setBox({...box, boxId: text});
          }}
        />
        <View>
          <Dropdown
            selectedValue={box.boxType}
            onValueChange={itemValue => setBox({...box, boxType: itemValue})}
            label={t('choose_box_type', {ns: 'packing'})}
            items={[{name: 'Mass Production'}, {name: 'Non Mass Production'}]}
          />
          <FilledButton title={t('update')} onPress={onUpdate} />
        </View>
      </View>
      <Loading loading={isLoading} />
    </SafeAreaView>
  );
};

export default ChangeBoxTypeScreen;
