import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { TNStoryItem, TNTouchableIcon } from '../../../Core/truly-native';
import IMLocationSelectorModal from '../../../Core/location/IMLocationSelectorModal/IMLocationSelectorModal';
import dynamicStyles from './styles';
import AppStyles from '../../../AppStyles';
import { IMLocalized } from '../../../Core/localization/IMLocalization';

function CreatePost(props) {
  const {
    onPostDidChange,
    onSetMedia,
    onLocationDidChange,
    user,
    inputRef,
    blurInput,
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [address, setAddress] = useState('');
  const [locationSelectorVisible, setLocationSelectorVisible] = useState(false);
  const [media, setMedia] = useState([]);
  const [mediaSources, setMediaSources] = useState([]);
  const [value, setValue] = useState('');
  const [isCameralContainer, setIsCameralContainer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const photoUploadDialogRef = useRef();
  const removePhotoDialogRef = useRef();

  const onLocationSelectorPress = () => {
    setLocationSelectorVisible(!locationSelectorVisible);
  };

  const onLocationSelectorDone = address => {
    setLocationSelectorVisible(!locationSelectorVisible);
    setAddress(address);
  };

  const onChangeLocation = address => {
    setAddress(address);
    onLocationDidChange(address);
  };

  const onChangeText = value => {
    const Post = {
      postText: value,
      commentCount: 0,
      reactionsCount: 0,
      reactions: {
        surprised: 0,
        angry: 0,
        sad: 0,
        laugh: 0,
        like: 0,
        cry: 0,
        love: 0,
      },
    };

    setValue(value);
    onPostDidChange(Post);
  };

  const onCameraIconPress = () => {
    photoUploadDialogRef.current.show();
  };

  const onPhotoUploadDialogDone = index => {
    if (index == 1) {
      onLaunchCamera();
    }

    if (index == 0) {
      onOpenPhotos();
    }
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then(image => {
      const source = image.path;
      const mime = image.mime;

      const filename =
        new Date() + '-' + source.substring(source.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? source.replace('file://', '') : source;

      setMedia([...media, { source, mime }]);
      setMediaSources([...mediaSources, { filename, uploadUri, mime }]);
      onSetMedia([...mediaSources, { filename, uploadUri, mime }]);
    });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      cropping: false,
      multiple: true,
    }).then(image => {
      const newPhotos = [];
      const sources = image.map(image => {
        const mime = image.mime;
        const filename =
          new Date() +
          '-' +
          image.path.substring(image.path.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios'
            ? image.path.replace('file://', '')
            : image.path;
        newPhotos.push({ source: image.path, mime });

        return { filename, uploadUri, mime };
      });
      setMedia([...media, ...newPhotos]);
      setMediaSources([...mediaSources, ...sources]);
      onSetMedia([...mediaSources, ...sources]);
    });
  };

  const onRemovePhotoDialogDone = index => {
    if (index === 0) {
      removePhoto();
    } else {
      setSelectedIndex(null);
    }
  };

  const onMediaPress = async index => {
    await setSelectedIndex(index);
    removePhotoDialogRef.current.show();
  };

  const removePhoto = async () => {
    const slicedMedia = [...media];
    const slicedMediaSources = [...mediaSources];
    await slicedMedia.splice(selectedIndex, 1);
    await slicedMediaSources.splice(selectedIndex, 1);
    setMedia([...slicedMedia]);
    setMediaSources([...slicedMediaSources]);
    onSetMedia([...slicedMediaSources]);
  };

  const onTextFocus = () => {
    setIsCameralContainer(false);
  };

  const onToggleImagesContainer = () => {
    blurInput();
    toggleImagesContainer();
  };

  const toggleImagesContainer = () => {
    setIsCameralContainer(!isCameralContainer);
  };

  const onStoryItemPress = item => {
    console.log('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <TNStoryItem
            onPress={onStoryItemPress}
            item={user}
            appStyles={AppStyles}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{user.firstName}</Text>
            <Text style={styles.subtitle}>{address}</Text>
          </View>
        </View>
        <View style={styles.postInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.postInput}
            onChangeText={onChangeText}
            value={value}
            multiline={true}
            onFocus={onTextFocus}
          />
        </View>
      </View>
      <View style={[styles.bottomContainer]}>
        <View style={styles.postImageAndLocationContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[
              styles.imagesContainer,
              isCameralContainer ? { display: 'flex' } : { display: 'none' },
            ]}>
            {media.map((singleMedia, index) => {
              const { source, mime } = singleMedia;

              if (mime.startsWith('image')) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onMediaPress(index)}
                    style={styles.imageItemcontainer}>
                    <FastImage
                      style={styles.imageItem}
                      source={{ uri: source }}
                    />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onMediaPress(index)}
                    style={styles.imageItemcontainer}>
                    <Video
                      source={{
                        uri: source,
                      }}
                      resizeMode={'cover'}
                      paused={true}
                      style={styles.imageItem}
                    />
                  </TouchableOpacity>
                );
              }
            })}
            <TouchableOpacity
              onPress={onCameraIconPress}
              style={[styles.imageItemcontainer, styles.imageBackground]}>
              <Image
                style={styles.addImageIcon}
                source={AppStyles.iconSet.cameraFilled}
              />
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.addTitleAndlocationIconContainer}>
            <View style={styles.addTitleContainer}>
              <Text style={styles.addTitle}>
                {!isCameralContainer
                  ? IMLocalized('Προσθήκη φωτογραφίας')
                  : IMLocalized('Προσθήκη φωτογραφίας')}
              </Text>
            </View>
            <View style={styles.iconsContainer}>
              <TNTouchableIcon
                onPress={onToggleImagesContainer}
                containerStyle={styles.iconContainer}
                imageStyle={[
                  styles.icon,
                  isCameralContainer
                    ? styles.cameraFocusTintColor
                    : styles.cameraUnfocusTintColor,
                ]}
                iconSource={AppStyles.iconSet.cameraFilled}
                appStyles={AppStyles}
              />
              <TNTouchableIcon
                containerStyle={styles.iconContainer}
                imageStyle={[styles.icon, styles.pinpointTintColor]}
                iconSource={AppStyles.iconSet.pinpoint}
                onPress={onLocationSelectorPress}
                appStyles={AppStyles}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.blankBottom} />

      <IMLocationSelectorModal
        isVisible={locationSelectorVisible}
        onCancel={onLocationSelectorPress}
        onDone={onLocationSelectorDone}
        onChangeLocation={onChangeLocation}
        appStyles={AppStyles}
      />
      <ActionSheet
        ref={photoUploadDialogRef}
        title={IMLocalized('Add photo')}
        options={[IMLocalized('Import from Library'), IMLocalized('Take Photo'), IMLocalized('Cancel')]}
        cancelButtonIndex={2}
        onPress={onPhotoUploadDialogDone}
      />
      <ActionSheet
        ref={removePhotoDialogRef}
        title={IMLocalized('Remove photo')}
        options={[IMLocalized('Remove'), IMLocalized('Cancel')]}
        destructiveButtonIndex={0}
        cancelButtonIndex={1}
        onPress={onRemovePhotoDialogDone}
      />
    </View>
  );
}

CreatePost.propTypes = {
  user: PropTypes.object,
  onPostDidChange: PropTypes.func,
  onSetMedia: PropTypes.func,
  onLocationDidChange: PropTypes.func,
  blurInput: PropTypes.func,
  inputRef: PropTypes.any,
};

export default CreatePost;
