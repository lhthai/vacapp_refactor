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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';
import {Input, FilledButton, Loading} from '../../components';
import {vacAppUrl} from '../../baseAPIUrl';

const MainScreen = ({route}) => {
  const {t} = useTranslation(['common', 'wip']);
  const [serialNumber, setSerialNumber] = useState('');
  const [lstItems, setLstItems] = useState([]);
  const [counting, setCouting] = useState(0);
  const [lstActive, setLstActive] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {empID, department, location, trolley} = route.params;

  useEffect(() => {
    loadCouting();
    loadActiveList();
  }, []);

  const loadCouting = async () => {
    try {
      const {data} = await axios.get(
        `${vacAppUrl}/StockCheckHistories/counting`,
      );
      setCouting(data);
    } catch (error) {
      alert(error);
    }
  };

  const loadActiveList = async () => {
    try {
      const {data} = await axios.get(`${vacAppUrl}/StockCheckHistories/`);
      setLstActive(data);
    } catch (error) {
      alert(error);
    }
  };

  const handleChangeText = text => {
    let arr = text.split(',');
    if (arr.length === 8) {
      if (lstItems.includes(arr[1])) {
        Alert.alert(
          t('alert'),
          `${t('duplicate_sn', {ns: 'wip'})}: ${arr[1]}`,
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
      } else {
        if (lstActive.includes(arr[1])) {
          setLstItems([arr[1], ...lstItems]);
        } else {
          Alert.alert(
            t('alert'),
            `${t('this_sn_is_counted', {ns: 'wip'})}: ${arr[1]}`,
            [
              {
                text: 'OK',
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          );
        }
      }
      setSerialNumber('');
    } else {
      setSerialNumber(text);
    }
  };

  const handleSubmit = async () => {
    try {
      if (lstItems.length <= 0) {
        Alert.alert(t('alert'), t('list_sn_empty', {ns: 'wip'}));
      } else {
        setIsLoading(true);
        const res = await axios.put(`${vacAppUrl}/StockCheckHistories`, {
          empID,
          location,
          department,
          trolley,
          listSN: lstItems,
        });
        if (res) {
          Alert.alert(t('mesage'), t('submit_success'));
          setLstItems([]);
          loadCouting();
          loadActiveList();
        }
      }
    } catch (error) {
      Alert.alert(t('error'), error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.banner, styles.box]}>
        <Text style={{fontWeight: 'bold'}}>
          {t('total_wip_remaining', {ns: 'wip'})}: {counting} PCS
        </Text>
      </View>
      <Input
        value={serialNumber}
        label={t('serial_number')}
        autoFocus
        onChangeText={text => {
          handleChangeText(text);
        }}
        onSubmitEditing={() => {
          if (serialNumber.split(',').length > 1) {
            alert(t('qr_wrong_format', {ns: 'wip'}));
          } else {
            setLstItems([serialNumber.toUpperCase(), ...lstItems]);
          }
          setSerialNumber('');
        }}
      />
      <FilledButton title={t('submit')} onPress={handleSubmit} />
      {lstItems.length > 0 ? (
        <ScrollView style={[styles.banner, styles.box]}>
          <View style={styles.serialNumber}>
            <View style={styles.serialNumberText}>
              <Text style={{fontWeight: 'bold'}}>
                {t('selected', {ns: 'wip'})}: {lstItems.length} pcs
              </Text>
            </View>
          </View>
          {lstItems.map((item, idx) => (
            <View style={styles.serialNumber} key={idx}>
              <View style={styles.serialNumberText}>
                <Text>{item}</Text>
                <TouchableOpacity
                  onPress={() => {
                    let temp = lstItems.filter(sn => sn != item);
                    setLstItems(temp);
                  }}>
                  <Icon
                    name="trash"
                    size={18}
                    style={{color: '#f60c0c', marginRight: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View></View>
      )}
      <Loading loading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  banner: {
    marginVertical: 8,
    backgroundColor: '#f2f5f5',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  serialNumber: {
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  serialNumberText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default MainScreen;
