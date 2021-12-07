import React, {useState} from 'react';
import axios from 'axios';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {TextInput, Card} from 'react-native-paper';
import {FilledButton, Input, Dropdown, Loading} from '../components';
import {vacAppUrl} from '../baseAPIUrl';
import {useTranslation} from 'react-i18next';

const MoldTemperature = () => {
  const {t} = useTranslation(['common', 'moldtemp']);
  const [batchcode, setBatchcode] = useState('');
  const [product, setProduct] = useState('');
  const [wc, setWC] = useState('');
  const [values, setValues] = useState([]);
  const [results, setResults] = useState([]);
  const [renderInput, setRenderInput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSpecs = async (product, wc) => {
    setIsLoading(true);
    try {
      const {data} = await axios.get(
        `${vacAppUrl}/MoldTempSpecs/${product}/${wc}`,
      );
      setRenderInput(data);
    } catch (error) {
      alert(error.response.data.message);
      setBatchcode('');
      setProduct('');
    }
    setIsLoading(false);
  };

  const batchcodeExists = async (batchcode, wc) => {
    let result = false;
    try {
      const {data} = await axios.get(
        `${vacAppUrl}/MoldTempHis/${batchcode}/${wc}`,
      );
      if (data.status === 'SUCCESS' && data.message === 'Exist') {
        result = true;
      }
    } catch (error) {
      alert(error.response.data.message);
    }
    return result;
  };

  const handleChangeText = async text => {
    let arr = text.split(',');
    if (arr.length === 8) {
      setBatchcode(arr[1]);
      setProduct(arr[2]);
      if (wc !== '') {
        if ((await batchcodeExists(arr[1], wc)) === false) {
          getSpecs(arr[2], wc);
        } else {
          alert(t('batchcodeHasData', {ns: 'moldtemp'}));
          setBatchcode('');
          setProduct('');
        }
      }
    } else {
      setBatchcode('');
      setProduct('');
      setRenderInput([]);
    }
    setValues([]);
    setResults([]);
  };

  const handleSubmit = async () => {
    if (batchcode === '') {
      alert(t('plsScanSeri', {ns: 'moldtemp'}));
    } else if (wc === '') {
      alert(t('plsChooseStation', {ns: 'moldtemp'}));
    } else if (
      !checkValidValues(values) ||
      values.length < renderInput.length
    ) {
      alert(t('missPoint', {ns: 'moldtemp'}));
    } else if (
      !checkValidResult(results) ||
      results.length < renderInput.length
    ) {
      alert(t('tempOutOfSpec', {ns: 'moldtemp'}));
    } else {
      {
        try {
          const {data} = await axios.post(`${vacAppUrl}/MoldTempHis/`, {
            batchcode,
            wc,
            values,
            results,
          });
          if (data.status === 'SUCCESS') {
            alert(data.message);
          }
          setRenderInput(data);
        } catch (error) {
          alert(error.response.data.message);
        }
        setValues([]);
        setResults([]);
        setBatchcode('');
        setProduct('');
      }
    }
  };

  const checkValidValues = arr => {
    let result = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '' || arr[i] === undefined) result = false;
    }
    return result;
  };

  const checkValidResult = arr => {
    let result = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '' || arr[i] === undefined || arr[i] === 'FAIL')
        result = false;
    }
    return result;
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Input
        value={batchcode}
        label={t('serial_number')}
        autoFocus
        onChangeText={text => {
          handleChangeText(text);
        }}
      />
      <Dropdown
        label={t('chooseStation', {ns: 'moldtemp'})}
        selectedValue={wc}
        onValueChange={async (itemValue, itemIndex) => {
          setWC(itemValue);
          if (itemValue !== '' && batchcode !== '') {
            // getSpecs(product, itemValue);
            if ((await batchcodeExists(batchcode, itemValue)) === false) {
              getSpecs(product, itemValue);
            } else {
              alert(t('batchcodeHasData', {ns: 'moldtemp'}));
              setRenderInput([]);
            }
          }
          setValues([]);
          setResults([]);
        }}
        items={[{name: 'Layup'}, {name: 'Demolding'}]}
      />
      {renderInput.length > 0 ? (
        <Card style={{backgroundColor: 'none'}}>
          <Card.Title title={t('position', {ns: 'moldtemp'})} />
          <Card.Content>
            {renderInput.map((item, idx) => (
              <View key={idx} style={styles.positionView}>
                <TextInput
                  style={styles.positionInput}
                  value={values[idx]}
                  keyboardType="numeric"
                  label={item.position}
                  requi
                  mode="outlined"
                  multiline={false}
                  onChangeText={text => {
                    values[idx] = text;
                    setValues(values);
                    let tempResult = [...results];
                    if (text >= item.min && text <= item.max && text !== '') {
                      tempResult[idx] = 'PASS';
                    } else {
                      tempResult[idx] = 'FAIL';
                    }
                    setResults(tempResult);
                  }}
                />
                <Text
                  style={[
                    styles.positionText,
                    results[idx] === 'PASS'
                      ? styles.resultPass
                      : styles.resultFail,
                  ]}>
                  {results[idx]}
                </Text>
              </View>
            ))}
            <FilledButton title="Submit" onPress={handleSubmit} />
          </Card.Content>
        </Card>
      ) : (
        <Text></Text>
      )}
      <Loading loading={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  positionView: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  positionInput: {
    height: 40,
    width: '80%',
  },
  positionText: {
    fontWeight: 'bold',
    width: '20%',
    textAlign: 'center',
  },
  resultPass: {
    color: '#67AB9F',
  },
  resultFail: {
    color: 'red',
  },
});

export default MoldTemperature;
