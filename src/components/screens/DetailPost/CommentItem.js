import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';

function CommentItem(props) {
  const {item} = props;
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.commentItemContainer}>
      <View style={styles.commentItemImageContainer}>
        <FastImage
          style={styles.commentItemImage}
          source={{
            uri: item.profilePictureURL,
          }}
        />
      </View>
      <View style={styles.commentItemBodyContainer}>
        <View style={styles.commentItemBodyRadiusContainer}>
        
        <Text style={{ fontWeight: 'bold', color:'#2db2e6'  }}>{item.firstName + ' ' + item.lastName}</Text>
        
        
          <Text style={styles.commentItemBodySubtitle}>{item.commentText}</Text>
        </View>
      </View>
    </View>
  );
}

CommentItem.propTypes = {
  item: PropTypes.object,
};

export default CommentItem;
