import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RadioButton} from 'react-native-paper';

const CustomRadioButton = ({title, value, checked, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RadioButton
        value={value}
        color="#67AB9F"
        status={checked === value ? 'checked' : 'unchecked'}
        onPress={onPress}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title: {
    marginTop: 8,
    marginLeft: 10,
  },
});
