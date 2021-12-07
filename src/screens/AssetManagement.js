import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Divider, Card} from 'react-native-paper';
import {Loading, Input} from '../components';
import {getAssetByID} from '../redux/actions/assetManagement';
import formatDateTime from '../utils/formatDateTime';
import {useTranslation} from 'react-i18next';

const AssetManagement = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation(['common', 'asset']);
  const isLoading = useSelector(state => state.assetManagement.isLoading);
  const item = useSelector(state => state.assetManagement.payload);
  const [assetID, setAssetID] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Input
        value={assetID}
        label={t('asset_id', {ns: 'asset'})}
        autoFocus
        onChangeText={text => {
          setAssetID(text);
        }}
        onSubmitEditing={() => dispatch(getAssetByID(assetID))}
      />
      {item && item.identificationNo !== '' ? (
        <Card style={styles.row}>
          <Card.Title
            titleStyle={{color: '#fff'}}
            title={t('asset_information', {ns: 'asset'})}
            style={{backgroundColor: '#67AB9F'}}
          />
          <Card.Content>
            <Text style={styles.textRow}>
              {t('asset_id', {ns: 'asset'})}:{' '}
              <Text style={{fontWeight: 'normal'}}>
                {item.identificationNo}
              </Text>
            </Text>
            <Divider />
            <Text style={styles.textRow}>
              {t('installation_date', {ns: 'asset'})}:{' '}
              <Text style={{fontWeight: 'normal'}}>
                {item.installationDate
                  ? formatDateTime(item.installationDate)
                  : ''}
              </Text>
            </Text>
            <Divider />
            <Text style={styles.textRow}>
              {t('asset_name', {ns: 'asset'})}:{' '}
              <Text style={{fontWeight: 'normal'}}>{item.assetName}</Text>
            </Text>
            <Divider />
            <Text style={styles.textRow}>
              {t('model', {ns: 'asset'})}:{' '}
              <Text style={{fontWeight: 'normal'}}>{item.model}</Text>
            </Text>
            <Divider />
            <Text style={styles.textRow}>
              {t('latest_maintenance_date', {ns: 'asset'})}:{' '}
              <Text>
                {item.lastPMDate ? formatDateTime(item.lastPMDate) : ''}
              </Text>
            </Text>
            <Divider />
            <Text style={styles.textRow}>
              {t('latest_calibration_date', {ns: 'asset'})}:{' '}
              <Text style={{fontWeight: 'normal'}}>
                {item.lastCalibrationDate
                  ? formatDateTime(item.lastCalibrationDate)
                  : ''}
              </Text>
            </Text>
            <Divider />
            <Text style={styles.textRow}>
              {t('latest_verification_date', {ns: 'asset'})}:{' '}
              <Text style={{fontWeight: 'normal'}}>
                {item.lastVerificationDate
                  ? formatDateTime(item.lastVerificationDate)
                  : ''}
              </Text>
            </Text>
            <Divider />
            <Text style={styles.textRow}>
              {t('location', {ns: 'asset'})}:{' '}
              <Text style={{fontWeight: 'normal'}}>{item.location}</Text>
            </Text>
            <Divider />
            <Text style={styles.textRow}>
              {t('owner', {ns: 'asset'})}:{' '}
              <Text style={{fontWeight: 'normal'}}>{item.ownerInVac}</Text>
            </Text>
            <Divider />
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
    padding: 8,
  },
  textRow: {
    padding: 10,
    fontWeight: 'bold',
  },
});

export default AssetManagement;
