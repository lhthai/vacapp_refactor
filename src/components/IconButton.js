import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IconButton = ({iconName, onPress, size, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} size={size} style={{color: color}} />
    </TouchableOpacity>
  );
};

export default IconButton;
