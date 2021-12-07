import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const FilledButton = ({title, style, onPress}) => {
  return (
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FilledButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#67AB9F',
    width: 120,
    paddingVertical: 10,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
