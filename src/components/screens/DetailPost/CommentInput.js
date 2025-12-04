import React, {useState} from 'react';
import {TouchableOpacity, Image, View, TextInput} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import AppStyles from '../../../AppStyles';

function CommentInput(props) {
  const {onCommentSend} = props;
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [value, setValue] = useState('');
  const isDisabled = value.length < 1;

  const onChangeText = value => {
    setValue(value);
  };

  const onSendComment = () => {
    onCommentSend(value);
    setValue('');
  };

  return (
    <View style={styles.commentInputContainer}>
      <View style={styles.commentTextInputContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={'Προσθήκη σχολίων'}
          placeholderTextColor={styles.placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          style={styles.commentTextInput}
        />
      </View>
      <TouchableOpacity
        onPress={onSendComment}
        disabled={isDisabled}
        style={styles.commentInputIconContainer}>
        <Image
          style={[
            styles.commentInputIcon,
            isDisabled ? {opacity: 0.3} : {opacity: 1},
          ]}
          source={AppStyles.iconSet.send}
        />
      </TouchableOpacity>
    </View>
  );
}

CommentInput.propTypes = {
  item: PropTypes.object,
};

export default CommentInput;
