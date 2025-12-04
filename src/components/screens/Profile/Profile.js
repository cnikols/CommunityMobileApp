import React, { useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import { TNStoryItem } from '../../../Core/truly-native';
import FeedItem from '../../FeedItem/FeedItem';
import ProfileButton from './ProfileButton';
import dynamicStyles from './styles';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../../Core/truly-native';
import AppStyles from '../../../AppStyles';
import FriendCard from './FriendCard';
import {TNActivityIndicator, TNMediaViewerModal} from '../../../Core/truly-native';

function Profile(props) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {
    onMainButtonPress,
    recentUserFeeds,
    user,
    mainButtonTitle,
    
    isMediaViewerOpen,
    feedItems,
    onMediaClose,
    selectedMediaIndex,
    removePhoto,
    startUpload,
    uploadProgress,
    loading,
    handleOnEndReached,
    isFetching,
    isOtherUser,
    onEmptyStatePress,
    onSubButtonTitlePress,
    subButtonTitle,
    displaySubButton,
    onCommentPress,
    friends,
    onMediaPress,
    onReaction,
    onDeletePost,
    onSharePost,
    loggedInUser,
    willBlur,
    onFriendItemPress
  } = props;

  const updatePhotoDialogActionSheet = useRef();
  const photoUploadDialogActionSheet = useRef();

  const onProfilePicturePress = () => {
    if (isOtherUser) {
      return;
    }
    updatePhotoDialogActionSheet.current.show();
  };



  const onUpdatePhotoDialogDone = index => {
    if (index === 0) {
      photoUploadDialogActionSheet.current.show();
    }

    if (index === 1) {
      removePhoto();
    }
  };

  const onPhotoUploadDialogDone = index => {
    if (index === 0) {
      onLaunchCamera();
    }

    if (index === 1) {
      onOpenPhotos();
    }
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then(image => {
      const source = image.path;

      startUpload(source);
    });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      const source = image.path;

      startUpload(source);
    });
  };

  const renderItem = ({item, index}) => {
    let shouldUpdate = false;
    if (item.shouldUpdate) {
      shouldUpdate = item.shouldUpdate;
    }
    return (
      <FeedItem
        item={item}
        index={index}
        onUserItemPress={onFeedUserItemPress}
        onCommentPress={onCommentPress}
        onMediaPress={onMediaPress}
        onReaction={onReaction}
        onSharePost={onSharePost}
        onDeletePost={onDeletePost}
        user={loggedInUser}
        willBlur={willBlur}
      />
    );
  }

  renderListFooter = () => {
    if (loading) {
      return null;
    }
    if (isFetching) {
      return <ActivityIndicator style={{ marginVertical: 7 }} size="small" />;
    }
    return null;
  };
 
  const renderListHeader = () => {
    return (
      
      <View style={styles.subContainer}>
        
        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 2,

  }}
/>


        <TNStoryItem
          item={user}
          imageStyle={styles.userImage}
          imageContainerStyle={styles.userImageContainer}
          containerStyle={styles.userImageMainContainer}
          activeOpacity={1}
          title={true}
          onPress={onProfilePicturePress}
          textStyle={styles.userName}
          appStyles={AppStyles}
        />

        
      <ProfileButton style={{ backgroundColor:'black'   }} title={mainButtonTitle} onPress={onMainButtonPress} />
      
        <Image style={{height:17, width:17, position:'relative', top:-25, left:79}} source={require('../../../../assets/icons/editicon.png')} />
        
        
        
        { friends && friends.length > 0 && (
          <Text style={styles.FriendsTitle}>{'Friends'}</Text>
        )}
        { friends && friends.length > 0 && (
          <View style={styles.FriendsContainer}>
              {friends.length > 0 &&
                friends.map(item => (
                  <FriendCard
                    onPress={() => onFriendItemPress(item)}
                    key={item.id}
                    item={item}
                  />
                ))}
          </View>
        )}
        

        {loading && (
          <View style={styles.container}>
            <ActivityIndicator
              style={{ marginTop: 15, alignSelf: 'center' }}
              size="small"
            />
          </View>
        )}
      </View>

      
    );
  };

  const renderEmptyComponent = () => {
    var emptyStateConfig = {
      title: IMLocalized("Δεν υπάρχουν αναρτήσεις"),
      description: IMLocalized(" Δεν υπάρχουν ακόμη αναρτήσεις σε αυτό το προφίλ. Όλες οι αναρτήσεις εμφανίζονται πιο κάτω."),
    };
    if (!isOtherUser) {
      emptyStateConfig = {
        ...emptyStateConfig,
        buttonName: IMLocalized("Ανέβασε το πρώτο σου post!"),
        onPress: onEmptyStatePress,
      }
    }
    return (
      <TNEmptyStateView
        emptyStateConfig={emptyStateConfig}
        appStyles={AppStyles}
        style={{marginTop: 20, marginBottom: 10}}
      />
    );
  }
  return (
   
   
   <View style={styles.container}>
   
   <View style = {styles.lineStyleL} />

   <View style = {styles.lineStyleR} />
   
      <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
      {recentUserFeeds && (
        <FlatList
          scrollEventThrottle={16}
          data={recentUserFeeds}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
          horizontal={false}
          onEndReached={handleOnEndReached}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
        />
      )}
      {recentUserFeeds == null && <TNActivityIndicator appStyles={AppStyles} />}
      <TNMediaViewerModal
        mediaItems={feedItems}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      />
   
      <ActionSheet
        ref={updatePhotoDialogActionSheet}
        title={IMLocalized("Φωτογραφία προφίλ")}
        options={[IMLocalized('Αλλαγή φωτογραφίας'), IMLocalized('Αφαίρεση'), IMLocalized('Επιστροφή')]}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={onUpdatePhotoDialogDone}
      />
      <ActionSheet
        ref={photoUploadDialogActionSheet}
        title={IMLocalized("Επιλογή φωτογραφίας")}
        options={[IMLocalized('Κάμερα'), IMLocalized('Βιβλιοθήκη'), IMLocalized('Επιστροφή')]}
        cancelButtonIndex={2}
        onPress={onPhotoUploadDialogDone}
   
        
   />
   

   
   
    </View>
  );
}

Profile.propTypes = {
  onCommentPress: PropTypes.func,
  startUpload: PropTypes.func,
  removePhoto: PropTypes.func,
  onMainButtonPress: PropTypes.func,
  onSubButtonTitlePress: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onFeedUserItemPress: PropTypes.func,
  user: PropTypes.object,
  friends: PropTypes.array,
  mainButtonTitle: PropTypes.string,
  
  subButtonTitle: PropTypes.string,
  feedItems: PropTypes.array,
  onMediaClose: PropTypes.func,
  isMediaViewerOpen: PropTypes.bool,
  onMediaPress: PropTypes.func,
  displaySubButton: PropTypes.bool,
  selectedMediaIndex: PropTypes.number,
  uploadProgress: PropTypes.number,
  
};

export default Profile;
