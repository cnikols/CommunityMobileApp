import { Platform, BackHandler } from 'react-native';

import React,{useState, useRef, useEffect,Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { IMConversationIconView } from '../../../../chat';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import { FriendshipConstants } from '../..';
import ActionSheet from 'react-native-actionsheet';
import { IMLocalized } from '../../../../localization/IMLocalization';
//import React, {useState, useRef, useEffect} from 'react';
import TruncateText from 'react-native-view-more-text';

import {TNTouchableIcon, TNStoryItem} from '../../../../truly-native';

//import Swiper from 'react-native-swiper';
//const {navigation} = this.props





 
function IMFriendItem(props) {
  const {
    item,
    index,
    onFriendAction,
    onFriendItemPress,
    displayActions,
    appStyles,
    followEnabled,
    //onBtnPress,
    onBackButtonPressAndroid,
    //onMoreDialogDone
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const user = item.user;
  let actionTitle = (followEnabled ?
    FriendshipConstants.localizedFollowActionTitle(item.type) :
    FriendshipConstants.localizedActionTitle(item.type)
  );

  //const { params = {} } = navigation.state;

  
  const moreRef = useRef();
  
  const onMorePress = () => {
   // if (otherReactionsVisible) {
   //   setOtherReactionsVisible(false);
   //   return;
   // }
    moreRef.current.show();
  };

  var name = "No name";
  if (user.firstName && user.lastName) {
    name = user.firstName + ' ' + user.lastName;
  } else if (user.fullname) {
    name = user.fullname;
  } else if (user.firstName) {
    name = user.firstName;
  }
 // const moreArray = [IMLocalized('Αποστολή μηνύματος')];
 const moreArray = [IMLocalized('Αφαίρεση γείτονα')];
  
  moreArray.push(IMLocalized('Επιστροφή'));
 
  class IMFriendItem extends Component {
    static navigationOptions = ({ screenProps, navigation }) => {
      let appStyles = navigation.state.params.appStyles;
      let currentTheme = appStyles.navThemeConstants[screenProps.theme];
}
};


const onBtnPress = () => {
  
  return true;
}

const onMoreDialogDone = index => {
  
  
    if (index === moreArray.indexOf(IMLocalized('Αποστολή μηνύματος'))) {
      //onSharePost(item);
    }

    if (
     // index === moreArray.indexOf(IMLocalized('Αφαίρεση γείτονα'))
    //|| index === moreArray.indexOf(IMLocalized('Block User'))

    index === moreArray.indexOf(IMLocalized('Αφαίρεση γείτονα'))
    //|| index === moreArray.indexOf(IMLocalized('Block User'))

    ) {
      //onFriendAction(item, index);
     onFriendAction(item, moreArray[index]); //sosto 
     
     onBtnPress();
       
    }    
  };
  

  
    

 
  return (

  

    <TouchableOpacity
  
      activeOpacity={0.9}
      onPress={() => onFriendItemPress(item)}
      style={styles.friendItemContainer}>
      <View style={styles.chatIconContainer}>
        <IMConversationIconView
          style={styles.photo}
          imageStyle={styles.photo}
          participants={[user]}
          appStyles={appStyles}
        />
        {name && (<Text style={styles.name}>{name}</Text>)}
      </View>
      {displayActions && actionTitle && (
        <View style={followEnabled ? styles.addFlexContainerFollow : styles.addFlexContainer}>
          <TouchableOpacity
          // HERE IS THE FRIEND DELETE ACTION 
         //imageStyle={{ tintColor: currentTheme.fontColor }}
          iconSource={appStyles.iconSet.menuHamburger}
          appStyles={appStyles}
//prosoxi edo einai apokleismos

//onPress={() => onFriendAction(item, index)}
           // style={followEnabled ? [styles.followButton] : [styles.addButton]}>
           style={styles.photo}>
            
            <TNTouchableIcon
          onPress={onMorePress}
          imageStyle={styles.moreIcon}
          containerStyle={styles.moreIconContainer}
          iconSource={appStyles.iconSet.dots}
          appStyles={appStyles}
        />




          <ActionSheet
        ref={moreRef}
        title={IMLocalized('Περισσότερα')}
        options={moreArray}
        //destructiveButtonIndex={moreArray.indexOf('Delete Post')}
        cancelButtonIndex={moreArray.length - 1}
        onPress={onMoreDialogDone}
      />

<TNTouchableIcon
          onPress={onFriendItemPress}
          imageStyle={{position:'absolute', top:-47, left:-40}}
          containerStyle={styles.moreIconContainer}
          iconSource={appStyles.iconSet.letter}
          appStyles={appStyles}
        />

          </TouchableOpacity>


         


        </View>



)}
     <View style={styles.divider} />
    </TouchableOpacity>
  );



}

  

IMFriendItem.propTypes = {
  onFriendAction: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  actionIcon: PropTypes.bool,
  item: PropTypes.object,
  index: PropTypes.number,
  onBtnPress: PropTypes.func,
  
  
};

IMFriendItem.defaultProps = {
  displayActions: true,
};


export default IMFriendItem;
