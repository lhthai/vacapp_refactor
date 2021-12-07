import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Toggler = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon
          name="bars"
          style={{color: '#fff', marginLeft: 10, fontSize: 20}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Toggler;
