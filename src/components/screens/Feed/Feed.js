import React, { useRef } from 'react';
import { FlatList, View, ActivityIndicator, Dimensions } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { Viewport } from '@skele/components';
import FeedItem from '../../FeedItem/FeedItem';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import IMCameraModal from '../../../Core/camera/IMCameraModal';
import TNMediaViewerModal from '../../../Core/truly-native/TNMediaViewerModal';
import { TNEmptyStateView } from '../../../Core/truly-native';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import { IMNativeFBAdComponentView } from '../../../Core/ads/facebook';
import AppStyles from '../../../AppStyles';

const HEIGHT = Dimensions.get('window').height;

function Feed(props) {
  const {
    onCommentPress,
    feed,
    user,
    isCameraOpen,
    onCameraClose,
    onUserItemPress,
    onFeedUserItemPress,
    isMediaViewerOpen,
    feedItems,
    onMediaClose,
    onMediaPress,
    selectedMediaIndex,
    onReaction,
    onLikeReaction,
    onOtherReaction,
    loading,
    handleOnEndReached,
    isFetching,
    onSharePost,
    onDeletePost,
    onUserReport,
    onFeedScroll,
    willBlur,
    selectedFeedIndex,
    shouldReSizeMedia,
    feedRef,
    onEmptyStatePress,
    adsManager
  } = props;

  const styles = useDynamicStyleSheet(dynamicStyles);
  const mediaLayouts = useRef([]);

  const onImagePost = source => {

    // fullStoryRef.current.postStory(story);
    // console.log(source);
  };

  const getItemLayout = (data, index) => ({
    length: feed.length,
    offset: HEIGHT * 0.55 * index,
    index,
  });

  const renderItem = ({ item, index }) => {
    let shouldUpdate = false;
    if (item.shouldUpdate) {
      shouldUpdate = item.shouldUpdate;
    }
    if (item.isAd) {
      return (
        <IMNativeFBAdComponentView adsManager={adsManager} />
      );
    }
    return (
      <FeedItem
        key={index + ''}
        onUserItemPress={onFeedUserItemPress}
        item={item}
        feedIndex={index}
        onCommentPress={onCommentPress}
        onMediaPress={onMediaPress}
        shouldReSizeMedia={shouldReSizeMedia}
        onReaction={onReaction}
        onLikeReaction={onLikeReaction}
        onOtherReaction={onOtherReaction}
        iReact={item.iReact}
        shouldUpdate={shouldUpdate}
        userReactions={item.userReactions}
        onSharePost={onSharePost}
        onDeletePost={onDeletePost}
        onUserReport={onUserReport}
        user={user}
        willBlur={willBlur}
        shouldDisplayViewAllComments={true}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          mediaLayouts.current[index] = layout.x;
        }}
      />
    );
  };

  const renderListHeader = () => {
    return null;
  };

  const renderListFooter = () => {
    if (isFetching) {
      return <ActivityIndicator style={{ marginVertical: 7 }} size="small" />;
    }
    return null;
  };

  const renderEmptyComponent = () => {
    if (!feed) {
      return null;
    }
    const emptyStateConfig = {
      title: IMLocalized("Καλωσήρθες στη γειτονιά!"),
      description: IMLocalized("Κάνε την πρώτη σου ανάρτηση!"),
      buttonName: IMLocalized("Προσθήκη ανάρτησης"),
      onPress: onEmptyStatePress,
    };

    return (
      <TNEmptyStateView
        style={styles.emptyStateView}
        emptyStateConfig={emptyStateConfig}
        appStyles={AppStyles}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.feedContainer}>
        <ActivityIndicator style={{ marginTop: 15 }} size="small" />
      </View>
    );
  }

  return (
    <View style={styles.feedContainer}>
      <Viewport.Tracker>
        <FlatList
          ref={ref => {
            if (feedRef) {
              feedRef.current = ref;
            }
          }}
          scrollEventThrottle={16}
          onScroll={onFeedScroll}
          showsVerticalScrollIndicator={false}
          getItemLayout={getItemLayout}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={renderEmptyComponent}
          data={feed}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={handleOnEndReached}
        />
      </Viewport.Tracker>
      <IMCameraModal
        isCameraOpen={isCameraOpen}
        onImagePost={onImagePost}
        onCameraClose={onCameraClose}
      />
      <TNMediaViewerModal
        mediaItems={feedItems}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      />
    </View>
  );
  // }
}

Feed.propTypes = {
  feedItems: PropTypes.array,
  onMediaClose: PropTypes.func,
  onCommentPress: PropTypes.func,
  onUserItemPress: PropTypes.func,
  onCameraClose: PropTypes.func,
  isCameraOpen: PropTypes.bool,
  isMediaViewerOpen: PropTypes.bool,
  onFeedUserItemPress: PropTypes.func,
  onMediaPress: PropTypes.func,
  selectedMediaIndex: PropTypes.number,
  onLikeReaction: PropTypes.func,
  onOtherReaction: PropTypes.func,
};

export default Feed;
