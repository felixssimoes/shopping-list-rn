import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = props => {
  return (
    <Icon.Button
      backgroundColor="transparent"
      underlayColor="#eee"
      iconStyle={styles.iconButton}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  iconButton: { marginRight: 0 },
});

export default IconButton;
