import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';

export default function ProfileButton(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {containerStyle, titleStyle, title, onPress, disabled} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style = {{ margin:5, }}
      //style={[styles.profileSettingsButtonContainer, containerStyle]}
      >
      
      <Text style={{fontWeight:'bold', color:'#1396cc'}}>{title}</Text>
    </TouchableOpacity>
  );
}

ProfileButton.propTypes = {
  onPress: PropTypes.func,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  activeOpacity: PropTypes.number,
};
