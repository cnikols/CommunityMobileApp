import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import ActionSheet from 'react-native-actionsheet';
import TruncateText from 'react-native-view-more-text';
import {Viewport} from '@skele/components';
import FeedMedia from './FeedMedia';
import {TNTouchableIcon, TNStoryItem} from '../../Core/truly-native';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import { timeFormat } from '../../Core';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import Hyperlink from 'react-native-hyperlink';


const ViewportAwareSwiper = Viewport.Aware(Swiper);

const reactionIcons = ['like', 'love', 'laugh', 'surprised', 'cry', 'angry'];

function FeedItem(props) {
  const {
    item,
    onCommentPress,
    containerStyle,
    onUserItemPress,
    onMediaPress,
    onReaction,
    onSharePost,
    onDeletePost,
    onUserReport,
    user,
    willBlur,
  } = props;

  const styles = useDynamicStyleSheet(dynamicStyles);

  let defaultReaction = 'thumbsupUnfilled';
  const [postMediaIndex, setPostMediaIndex] = useState(0);
  const [inViewPort, setInViewPort] = useState(false);
  const [otherReactionsVisible, setOtherReactionsVisible] = useState(false);
  const [selectedIconName, setSelectedIconName] = useState(item.myReaction ? item.myReaction : defaultReaction);

  const [reactionCount, setReactionCount] = useState(item.reactionsCount);
  const [previousReaction, setPreviousReaction] = useState(item.myReaction); // the source of truth - coming directly from the database

  const moreRef = useRef();

  useEffect(() => {
      setSelectedIconName(item.myReaction ? item.myReaction : defaultReaction);
      setReactionCount(item.reactionsCount);
      setPreviousReaction(item.myReaction); // this only changes when database reaction changes
  }, [item]);

  const getTintColor = () => {
    if (
      selectedIconName === defaultReaction ||
      selectedIconName === 'heartUnfilled'
    ) {
      return styles.tintColor;
    }
  };

  const tintColor = getTintColor();


  const onSharePostPress = async reaction => {
    onSharePost(item);
  }
  const onReactionPress = async reaction => {
    if (reaction == null) {
      // this was a single tap on the inline icon, therefore a like or unlike
      if (item.myReaction) {
        if (otherReactionsVisible) {
          // Reactions tray is visible, so we only hide it
          setOtherReactionsVisible(false);
          return;
        }
        setSelectedIconName(defaultReaction);
        onReaction(null, item); // sending a null reaction will undo the previous action
      } else {
        setSelectedIconName('like');
        onReaction('like', item); // there were no reaction before, and there was a single tap on the inline action button
      }
      setOtherReactionsVisible(false);
      return;
    }
    // this was a reaction on the reactions tray, coming after a long press + one tap
    if (item.myReaction && item.myReaction == reaction) {
      // Nothing changes, since this is the same reaction as before
      setOtherReactionsVisible(false);
      return;
    }
    setSelectedIconName(reaction ? reaction : defaultReaction);
    setOtherReactionsVisible(false);
    onReaction(reaction, item);
  };

  const onReactionLongPress = () => {
    setOtherReactionsVisible(!otherReactionsVisible);
  };

  const onMorePress = () => {
    if (otherReactionsVisible) {
      setOtherReactionsVisible(false);
      return;
    }
    moreRef.current.show();
  };

  const didPressComment = () => {
    if (otherReactionsVisible) {
      setOtherReactionsVisible(false);
      return;
    }
    onCommentPress(item);
  };

  const moreArray = [IMLocalized(' ')];
  //const moreArray = [IMLocalized('Μοιράσου με...')];

 // 

  if (item.authorID === user.id) {
   // moreArray.push(IMLocalized('Κρύψε την ανάρτηση'));
    moreArray.push(IMLocalized('Διέγραψε την Ανάρτηση')); 
    //moreArray.push(IMLocalized('Αντιγραφή Συνδέσμου'));
  } else {
    moreArray.push(IMLocalized('Αποκλεισμός Γείτονα'));
    moreArray.push(IMLocalized('Αναφορά Ανάρτησης'));
   // moreArray.push(IMLocalized('Κρύψε την ανάρτηση'));
   // moreArray.push(IMLocalized('Αντιγραφή Συνδέσμου'));
  }

  moreArray.push(IMLocalized('Επιστροφή'));

  const onMoreDialogDone = index => {
  
    if (index === moreArray.indexOf(IMLocalized('Share Post'))) {
      onSharePost(item);
    }

    if (
      index === moreArray.indexOf(IMLocalized('Αναφορά Ανάρτησης'))
    || index === moreArray.indexOf(IMLocalized('Αποκλεισμός Γείτονα'))
    ) {
      onUserReport(item, moreArray[index]);
    }

    if (index === moreArray.indexOf(IMLocalized('Διέγραψε την Ανάρτηση'))) {
      onDeletePost(item);
    }
  };

  const inactiveDot = () => <View style={styles.inactiveDot} />;

  const activeDot = () => <View style={styles.activeDot} />;

  const renderTouchableIconIcon = (src, tappedIcon, index) => {
    return (
      <TNTouchableIcon
        key={index + ''}
        containerStyle={styles.reactionIconContainer}
        iconSource={src}
        imageStyle={styles.reactionIcon}
        onPress={() => onReactionPress(tappedIcon)}
        appStyles={AppStyles}
      />
    );
  };

  const renderViewMore = onPress => {
    return (
      <Text onPress={onPress} style={styles.moreText}>
        {IMLocalized('περισσότερα')}
      </Text>
    );
  };

  const renderViewLess = onPress => {
    return (
      <Text onPress={onPress} style={styles.moreText}>
        {IMLocalized('λιγότερα')}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={didPressComment}
      style={[styles.container, containerStyle]}>



{item.postMedia && item.postMedia.length > 0 && (
        <View style={styles.bodyImageContainer}>
          <ViewportAwareSwiper
            removeClippedSubviews={false}
            containerStyle={{flex: 1}}
            dot={inactiveDot()}
            activeDot={activeDot()}
            paginationStyle={{
              bottom: 20,
            }}
            onIndexChanged={swiperIndex => setPostMediaIndex(swiperIndex)}
            loop={false}
            onViewportEnter={() => setInViewPort(true)}
            onViewportLeave={() => setInViewPort(false)}
            preTriggerRatio={-0.6}>
            {item.postMedia.map((media, index) => (
              <FeedMedia
                key={index + ''}
                inViewPort={inViewPort}
                index={index}
                postMediaIndex={postMediaIndex}
                media={media}
                item={item}
                onImagePress={onMediaPress}
                dynamicStyles={styles}
                willBlur={willBlur}
              />
            ))}
          </ViewportAwareSwiper>
        </View>
      )}




      <View style={styles.headerContainer}>
        <TNStoryItem
          imageContainerStyle={styles.userImageContainer}
          item={item.author}
          onPress={onUserItemPress}
          appStyles={AppStyles}
        />
        <View style={styles.titleContainer}>
           <Text selectable style={{ fontWeight: 'bold', color:'#2db2e6'  }}>
              {item.author.firstName + (item.author.lastName ? ' ' + item.author.lastName : '')}
            </Text>





          <View style={styles.mainSubtitleContainer}>
            <View style={styles.subtitleContainer}>
              <Text selectable style={styles.subtitle}>{timeFormat(item.createdAt)}</Text>
            </View>
            <View style={[styles.subtitleContainer, {flex: 2}]}>
              <Text style={styles.subtitle}>{item.location}</Text>
            </View>
          </View>
        </View>
        <TNTouchableIcon
          onPress={onMorePress}
          imageStyle={styles.moreIcon}
          containerStyle={styles.moreIconContainer}
          iconSource={AppStyles.iconSet.more}
          appStyles={AppStyles}
        />
      </View>
     
     
      
      
<Hyperlink  linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 15 } }>  

  <Text selectable textStyle={styles.body}>{item.postText}</Text>
</Hyperlink>
      {otherReactionsVisible && (
        <View style={styles.reactionContainer}>
          {reactionIcons.map((icon, index) =>
            renderTouchableIconIcon(AppStyles.iconSet[icon], icon, index),
          )}
        </View>
      )}


      <View style={styles.footerContainer}>
        <TNTouchableIcon
          containerStyle={styles.footerIconContainer}
          iconSource={AppStyles.iconSet[selectedIconName]}
          imageStyle={[styles.footerIcon, tintColor]}
          renderTitle={true}
          title={reactionCount < 1 ? '' : reactionCount}
          onLongPress={() => onReactionLongPress()}
          onPress={() => onReactionPress(null)}
          appStyles={AppStyles}
        />

        
        <TNTouchableIcon
          containerStyle={styles.footerIconContainer}
          iconSource={AppStyles.iconSet.commentUnfilled}
          imageStyle={[styles.footerIcon, styles.tintColor]}
          renderTitle={true}
          title={item.commentCount < 1 ? '' : item.commentCount}
          onPress={didPressComment}
          appStyles={AppStyles}
        />
        <TNTouchableIcon
          containerStyle={styles.footerIconContainer}
          iconSource={AppStyles.iconSet.share}
          imageStyle={[styles.footerIcon, styles.tintColor]}
          renderTitle={true}
          //title={item.commentCount < 1 ? '' : item.commentCount}
          onPress={onSharePostPress}
          appStyles={AppStyles}
        />



      </View>
      <ActionSheet
        ref={moreRef}
        title={IMLocalized('Περισσότερα')}
        options={moreArray}
        destructiveButtonIndex={moreArray.indexOf('Delete Post')}
        cancelButtonIndex={moreArray.length - 1}
        onPress={onMoreDialogDone}
      />
    </TouchableOpacity>
  );
}

FeedItem.propTypes = {
  onPress: PropTypes.func,
  onOtherReaction: PropTypes.func,
  onLikeReaction: PropTypes.func,
  onUserItemPress: PropTypes.func,
  onCommentPress: PropTypes.func,
  onMediaPress: PropTypes.func,
  onSharePost: PropTypes.func,
  onDeletePost: PropTypes.func,
  item: PropTypes.object,
  shouldUpdate: PropTypes.bool,
  iReact: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FeedItem;
