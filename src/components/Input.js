import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const Input = forwardRef(({value, label, ...props}, ref) => {
  return (
    <TextInput
      ref={ref}
      {...props}
      style={styles.input}
      value={value}
      label={label}
      mode="outlined"
      multiline={false}
    />
  );
});

export default Input;

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
    textAlign: 'left',
  },
});
