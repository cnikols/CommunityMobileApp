import PropTypes from 'prop-types';
import React from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import dynamicStyles from './styles';

function DrawerItem(props) {
  const {onPress, source, title} = props;
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <TouchableOpacity onPress={onPress} style={styles.btnClickContain}>
      <View style={styles.btnContainer}>
        <Image source={source} style={styles.btnIcon} />
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

DrawerItem.prototype = {
  onPress: PropTypes.func.isRequired,
  source: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default DrawerItem;
