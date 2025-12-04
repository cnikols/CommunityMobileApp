import React, { useEffect, useContext, useState } from "react";
import { View } from 'react-native';
import { useSelector, ReactReduxContext } from "react-redux";
import { Feed } from '../../components';
import FeedManager from '../../Core/socialgraph/feed/FeedManager';
import FriendshipTracker from '../../Core/socialgraph/friendships/firebase/tracker';
import { friendshipUtils } from '../../Core/socialgraph/friendships';
import { firebaseStorage } from '../../Core/firebase/storage';
import {
  firebasePost,
  firebaseComment,
} from '../../Core/socialgraph/feed/firebase';
import { groupBy } from '../../Core/helpers/collections';
import AppStyles from '../../AppStyles';
import styles from './styles';
import { IMLocalized } from "../../Core/localization/IMLocalization";
import { TNTouchableIcon } from '../../Core/truly-native';
import { reportingManager } from '../../Core/user-reporting';
import SocialNetworkConfig from '../../SocialNetworkConfig';
import * as FacebookAds from 'expo-ads-facebook';
import Share from 'react-native-share';


const FeedScreen = props => {
  const currentUser = useSelector(state => state.auth.user);
  const users = useSelector(state => state.auth.users);
  const friends = useSelector(state => state.friends.friends);
  const friendships = useSelector(state => state.friends.friendships);
  const mainFeedPosts = useSelector(state => state.feed.mainFeedPosts);

  const { store } = useContext(ReactReduxContext)
  const followTracker = new FriendshipTracker(store, currentUser.id || currentUser.userID, true, false, true);
  const feedManager = new FeedManager(store, currentUser.id);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFeedItems, setSelectedFeedItems] = useState([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [willBlur, setWillBlur] = useState(false);
  const [feed, setFeed] = useState(null);
  const [adsManager, setAdsManager] = useState(null);
  const [adsLoaded, setAdsLoaded] = useState(false);

  useEffect(() => {
    followTracker.subscribeIfNeeded();
    props.navigation.setParams({
      toggleCamera: toggleCamera,
      openDrawer: openDrawer,
    });
  }, []);

  useEffect(() => {
    feedManager.subscribeIfNeeded();
  }, [friends]);

  useEffect(() => {
    // FacebookAds.InterstitialAdManager.showAd("834318260403282_834371153731326")//"834318260403282_834319513736490")
    //   .then(didClick => {})
    //   .catch(error => {
    //     alert(error);
    //   });
    const placementID = SocialNetworkConfig.adsConfig && SocialNetworkConfig.adsConfig.facebookAdsPlacementID;
    if (placementID) {
      const manager = new FacebookAds.NativeAdsManager(placementID, 5);
      manager.onAdsLoaded(onAdsLoaded);
      setAdsManager(manager);
    }
  }, [1]);

  useEffect(() => {
    if (mainFeedPosts) {
      if (SocialNetworkConfig.adsConfig && adsLoaded) {
        setFeed(postsWithInsertedAdSlots(mainFeedPosts));
      } else {
        setFeed(mainFeedPosts);
      }
      setLoading(false);
      setIsFetching(false);
    }
    
  }, [mainFeedPosts]);

  

  postsWithInsertedAdSlots = (posts) => {
    if (!posts) {
      return posts;
    }
    // We insert ad slots every X posts
    const interval = SocialNetworkConfig.adsConfig.adSlotInjectionInterval;
    var adSlotPositions = []
    for (var i = interval; i < posts.length; i += interval) {
      adSlotPositions.push(i);
    }
    for (var j = adSlotPositions.length - 1; j >= 0; --j) {
      posts.splice(adSlotPositions[j], 0, {isAd: true});
    }
    return posts;
  }

  onAdsLoaded = () => {
    setAdsLoaded(true);
    if (SocialNetworkConfig.adsConfig) {
      setFeed(postsWithInsertedAdSlots(mainFeedPosts));
    }
  }

  onCommentPress = item => {
    props.navigation.navigate('FeedDetailPost', {
      item: item,
      lastScreenTitle: 'Feed',
    });
  };

  toggleCamera = () => {
    setIsCameraOpen(!isCameraOpen);
  };

  openDrawer = () => {
    props.navigation.openDrawer();
  };

  onCameraClose = () => {
    setIsCameraOpen(false);
  };

  onUserItemPress = shouldOpenCamera => {
    if (shouldOpenCamera) {
      toggleCamera();
    }
  };

  onFeedUserItemPress = async item => {
    if (item.id === currentUser.id) {
      props.navigation.navigate('FeedProfile', {
        stackKeyTitle: 'FeedProfile',
        lastScreenTitle: 'Feed',
      });
    } else {
      props.navigation.navigate('FeedProfile', {
        user: item,
        stackKeyTitle: 'FeedProfile',
        lastScreenTitle: 'Feed',
      });
    }
  };

  onMediaClose = () => {
    setIsMediaViewerOpen(false);
  };

  onMediaPress = (media, mediaIndex) => {
    setSelectedFeedItems(media);
    setSelectedMediaIndex(mediaIndex);
    setIsMediaViewerOpen(true);
  };


  onReaction = async (reaction, item) => {
    console.log(item.postText);
    feedManager.applyReaction(reaction, item, false);
    firebaseComment.handleReaction(reaction, currentUser, item, false, users);
  };

  onSharePost = async (item) => {
    let image_path='';
    let share_params={
      subject:'Κοινοποίηση από ανάρτηση Γειτονιάς',
      title:'Κοινοποίηση από ανάρτηση Γειτονιάς',
      message:item.postText,
    }
  

    if (item.postMedia && item.postMedia.length > 0) {
      console.log(item.postMedia[0].url);
      image_path = item.postMedia[0];
      share_params={
        subject:'Κοινοποίηση από ανάρτηση Γειτονιάς',
        title:'Κοινοποίηση από ανάρτηση Γειτονιάς',
        message:item.postText,
        type:'image/jpeg',
        filename:image_path.url,
        url:image_path.url
      }
      
    }

    
      
    try {
      const result = await Share.open(share_params);
    } catch (error) {
      alert(error.message);
    }
  };

  onDeletePost = async (item) => {
    console.log(item.postText);
    const res = await firebasePost.deletePost(item, true);
    if (res.error) {
      alert(res.error);
    }
  };

  onUserReport = async (item, type) => {
    reportingManager.markAbuse(currentUser.id, item.authorID, type)
  }

  handleOnEndReached = distanceFromEnd => {
    if (!this.flatlistReady) {
      return;
    }

    if (isFetching) {
      return;
    }
    if (this.fetchCallCount > 1) {
      return;
    }

    if (this.isInitialFetching) {
      return;
    }

    // this.getPosts();
  };

  onFeedScroll = () => {
    this.flatlistReady = true;
  };

  onEmptyStatePress = () => {
    props.navigation.navigate('CreatePost');
  }

  return (
    <View style={styles.container} >
      <Feed
      loading={loading}
      feed={feed}
      onCommentPress={onCommentPress}
      user={currentUser}
      isCameraOpen={isCameraOpen}
      onCameraClose={onCameraClose}
      onUserItemPress={onUserItemPress}
      onFeedUserItemPress={onFeedUserItemPress}
      isMediaViewerOpen={isMediaViewerOpen}
      feedItems={selectedFeedItems}
      onMediaClose={onMediaClose}
      onMediaPress={onMediaPress}
      selectedMediaIndex={selectedMediaIndex}
      onReaction={onReaction}
      handleOnEndReached={handleOnEndReached}
      isFetching={isFetching}
      onSharePost={onSharePost}
      onDeletePost={onDeletePost}
      onUserReport={onUserReport}
      onFeedScroll={onFeedScroll}
      shouldReSizeMedia={true}
      willBlur={willBlur}
      onEmptyStatePress={onEmptyStatePress}
      adsManager={adsManager}
     />
    </View>
    
  );
}

FeedScreen.navigationOptions = ({ screenProps, navigation }) => {
  let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
  const { params = {} } = navigation.state;

  return {
    headerTitle: IMLocalized(''),
   // headerTitle: IMLocalized('Home'),
    headerLeft: (
      <TNTouchableIcon 
      imageStyle={{  width:150 }}
        iconSource={
          AppStyles.iconSet.menuHamburgerG
        }
        onPress={
          params.openDrawer
        }
        appStyles={AppStyles}
        />
    ),
    headerRight: (
      <View style={styles.doubleNavIcon}>
        { (
          <TNTouchableIcon
            //imageStyle={{ tintColor: currentTheme.fontColor }}
            //iconSource={AppStyles.iconSet.camera}
           // iconSource={AppStyles.iconSet.search}
            //onPress={params.toggleCamera}
           
           
 onPress={() => {
  //navigation.navigate('Discover');
}}
           
            appStyles={AppStyles}
          />
        )}
        <TNTouchableIcon
         // imageStyle={{ tintColor: currentTheme.fontColor }}
          iconSource={AppStyles.iconSet.inscription}
          onPress={() => navigation.navigate('CreatePost')}
          appStyles={AppStyles}
        />
         
      </View>
    ),
    headerStyle: {
      backgroundColor: currentTheme.backgroundColor,
      borderBottomColor: currentTheme.hairlineColor,
    },
    headerTintColor: currentTheme.fontColor,
  };


};

export default FeedScreen;