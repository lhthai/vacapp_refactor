import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';
import {vacAppUrl} from '../../baseAPIUrl';
import {FilledButton, Input, Loading} from '../../components';

const AddToBox = ({route}) => {
  const {t} = useTranslation(['common', 'packing']);
  const {boxData} = route.params;
  const [serialNumber, setSerialNumber] = useState('');
  const [lstSerialNumber, setLstSerialNumber] = useState([]);
  const [lstProducts, setLstProducts] = useState([]);
  const [tempCurrentProducts, setTempCurrentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    setTempCurrentProducts(boxData.curProduct);
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const data = await AsyncStorage.getItem('userId');
      if (data) {
        setCurrentUser(JSON.parse(data).empID);
      } else {
        alert(t('please_login_and_try_again', {ns: 'packing'}));
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = text => {
    let arr = text.split(',');
    if (arr.length === 8) {
      let batchcode = arr[1];
      let product = arr[2];
      if (lstSerialNumber.includes(batchcode)) {
        alert(t('duplicate_sn', {ns: 'packing'}));
      } else {
        if (boxData.curProduct.length > 0) {
          if (tempCurrentProducts.includes(product)) {
            setLstSerialNumber([...lstSerialNumber, batchcode]);
            setLstProducts([...lstProducts, product]);
          } else {
            Alert.alert(
              t('confirmation'),
              `${product} ${t('product_isnt_exist_in_box', {ns: 'packing'})}`,
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
                    setLstSerialNumber([...lstSerialNumber, batchcode]);
                    setLstProducts([...lstProducts, product]);
                    setTempCurrentProducts([...tempCurrentProducts, product]);
                  },
                },
              ],
              {cancelable: false},
            );
          }
        } else {
          if (lstSerialNumber.length === 0) {
            setLstSerialNumber([...lstSerialNumber, batchcode]);
            setLstProducts([...lstProducts, product]);
            setTempCurrentProducts([...tempCurrentProducts, product]);
          } else {
            if (tempCurrentProducts.includes(product)) {
              setLstSerialNumber([...lstSerialNumber, batchcode]);
              setLstProducts([...lstProducts, product]);
            } else {
              Alert.alert(
                t('confirmation'),
                `${product} ${t('product_isnt_exist_in_box', {ns: 'packing'})}`,
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
                      setLstSerialNumber([...lstSerialNumber, batchcode]);
                      setLstProducts([...lstProducts, product]);
                      setTempCurrentProducts([...tempCurrentProducts, product]);
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }
        }
      }
    }
  };

  const handleDelete = (id, index) => {
    setLstSerialNumber(lstSerialNumber.filter((item, idx) => item !== id));
    setLstProducts(
      lstProducts.filter((item, idx) => {
        if (idx !== index) return item;
      }),
    );
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.post(`${vacAppUrl}/boxdetail/`, {
        boxID: boxData.boxID,
        batchcode: lstSerialNumber,
        product: lstProducts,
        createdBy: currentUser,
      });
      if (data.status === 'SUCCESS') {
        alert(t('update_success'));
        setLstSerialNumber([]);
        setLstProducts([]);
      } else if (data.status === 'FAIL') {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, padding: 8}}>
        <Input value={boxData.boxID} label={t('box_id')} disabled />
        <Input
          value={serialNumber}
          label={t('serial_number')}
          autoFocus
          onChangeText={text => {
            handleChange(text);
          }}
        />
        <FilledButton title={t('update')} onPress={handleUpdate} />
        {lstSerialNumber.length > 0 ? (
          <ScrollView style={{marginTop: 10}}>
            <Card style={{backgroundColor: 'none'}}>
              <Card.Title
                titleStyle={{color: '#fff', fontSize: 17}}
                title={`${t('list_serial_number', {ns: 'packing'})}: ${
                  lstSerialNumber.length
                } pcs`}
                style={{backgroundColor: '#67AB9F'}}
              />
              <Card.Content>
                {lstSerialNumber.map((item, index) => (
                  <View key={index}>
                    <View style={styles.textRow}>
                      <Text>{item}</Text>
                      <TouchableOpacity
                        onPress={() => handleDelete(item, index)}>
                        <Icon
                          name="trash"
                          size={18}
                          style={{color: '#f60c0c'}}
                        />
                      </TouchableOpacity>
                    </View>
                    <Divider />
                  </View>
                ))}
              </Card.Content>
            </Card>
          </ScrollView>
        ) : (
          <Text></Text>
        )}
      </View>
      <Loading loading={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default AddToBox;
