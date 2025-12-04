import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './styles';

function FriendCard(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {
    onPress,
    containerStyle,
    imageStyle,
    item,
    titleStyle,
    activeOpacity,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[styles.friendCardContainer, containerStyle]}>
      <FastImage
        style={[styles.friendCardImage, imageStyle]}
        source={{uri: item.profilePictureURL}}
      />
      {item.firstName && (
        <Text style={[styles.friendCardTitle, titleStyle]}>
          {item.firstName}
        </Text>
      )}
    </TouchableOpacity>
  );
}

FriendCard.propTypes = {
  onPress: PropTypes.func,
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  item: PropTypes.object,
  activeOpacity: PropTypes.number,
};

export default FriendCard;
