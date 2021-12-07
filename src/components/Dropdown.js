import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Dropdown = ({selectedValue, label, items, ...props}) => {
  return (
    <View style={styles.container}>
      <Picker {...props} style={styles.picker} selectedValue={selectedValue}>
        <Picker.Item label={label} value="" />
        {items.map((item, idx) => (
          <Picker.Item key={idx} label={item.name} value={item.name} />
        ))}
      </Picker>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#006B76',
    overflow: 'hidden',
    marginBottom: 8,
  },
  picker: {
    borderRadius: 5,
    borderWidth: 1,
  },
});
