import {Platform, Dimensions, I18nManager} from 'react-native';
import {DynamicValue} from 'react-native-dark-mode';
import TNColor from './Core/truly-native/TNColor';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const colorSet = {
  //mainThemeBackgroundColor: new DynamicValue('#ffffff', '#121212'),
 // mainThemeBackgroundColor: new DynamicValue('#f4f8fb', '#6d6f6e'),
  mainThemeBackgroundColor: new DynamicValue('#ffffff', '#6d6f6e'),
 
  //mainThemeForegroundColor: '#3875e8',
  mainThemeForegroundColor: '#2db2e6',
  mainTextColor: new DynamicValue('#151723', '#ffffff'),
  
  mainSubtextColor: new DynamicValue('#7e7e7e', '#f5f5f5'),
  hairlineColor: new DynamicValue('#e0e0e0', '#222222'),
  grey0: TNColor('#eaeaea'),
  grey3: TNColor('#e6e6f2'),
  grey6: TNColor('#d6d6d6'),
  grey9: TNColor('#939393'),
  tint: new DynamicValue('#3068CC', '#3068CC'),
  facebook: new DynamicValue('#4267b2', '#4267b2'),
  grey: new DynamicValue('grey', 'grey'),
  whiteSmoke: new DynamicValue('#f5f5f5', '#222222'),
  
  
  headerTintColor: new DynamicValue('#000000', '#ffffff'),
  bottomTintColor: new DynamicValue('grey', 'lightgrey'),
  mainButtonColor: new DynamicValue('#e8f1fd', '#062246'),
  subButtonColor: new DynamicValue('#eaecf0', '#20242d'),
};

const navThemeConstants = {
  light: {
  //  backgroundColor: '#fff',
  backgroundColor: '#f4f8fb',
    fontColor: '#000',
    activeTintColor: '#3875e8',
    inactiveTintColor: '#ccc',
    hairlineColor: '#e0e0e0',
  },
  dark: {
    backgroundColor: '#000',
    fontColor: '#fff',
    activeTintColor: '#3875e8',
    inactiveTintColor: '#888',
    hairlineColor: '#222222',
  },
  main: '#3875e8',
};

const imageSet = {
  chat: require('../assets/images/chat0.png'),
  file: require('../assets/images/file.png'),
  like: require('../assets/images/like.png'),
  notification: require('../assets/images/notification.png'),
  photo: require('../assets/images/photo.png'),
  pin: require('../assets/images/pin.png'),
   
  //synomilies: require('../assets/images/synomilies.png'),


};

const iconSet = {
  logo: require("../assets/images/app-logo.png"),
  userAvatar: require('./CoreAssets/default-avatar.jpg'),
  backArrow: require('./CoreAssets/arrow-back-icon.png'),
  menuHamburger: require('../assets/icons/menu-hamburger.png'),
  menuHamburgerChat: require('../assets/icons/menu-hamburger-chat.png'),
  menuHamburgerG: require('../assets/icons/menu-hamburgerG.png'),
  homeUnfilled: require('../assets/icons/home-unfilled.png'),
  homefilled: require('../assets/icons/home-filled.png'),
  search: require('../assets/icons/search-icon.png'),
  magnifier: require('../assets/icons/magnifier.png'),
  commentUnfilled: require('../assets/icons/comment-unfilled.png'),
  commentUnfilled_: require('../assets/icons/comment-unfilled_.png'),
  commentFilled: require('../assets/icons/comment-filled.png'),
  friendsUnfilled: require('../assets/icons/friends-unfilled.png'),
  friendsFilled: require('../assets/icons/friends-filled.png'),
  profileUnfilled: require('../assets/icons/profile-unfilled.png'),
  profileFilled: require('../assets/icons/profile-filled.png'),
  camera: require('../assets/icons/camera.png'),
  cameraFilled: require('../assets/icons/camera-filled.png'),
  inscription: require('../assets/icons/inscription.png'),
  more: require('../assets/icons/more.png'),
  send: require('../assets/icons/send.png'),
  pinpoint: require('../assets/icons/pinpoint.png'),
  checked: require('../assets/icons/checked.png'),
  bell: require('../assets/icons/bell.png'),
  surprised: require('../assets/icons/wow.png'),
  laugh: require('../assets/icons/crylaugh.png'),
  cry: require('../assets/icons/crying.png'),
  thumbsupUnfilled: require('../assets/icons/thumbsup-unfilled.png'),
  heartUnfilled: require('../assets/icons/heart-unfilled.png'),
  like: require('../assets/icons/blue-like.png'),
  love: require('../assets/icons/red-heart.png'),
  angry: require('../assets/icons/anger.png'),
  cameraRotate: require('../assets/icons/camera-rotate.png'),
  libraryLandscape: require('../assets/icons/library-landscape.png'),
  playButton: require('../assets/icons/play-button.png'),
  logout: require('../assets/icons/logout-drawer.png'),
  facebook: require('../assets/icons/facebook.png'),
  apple: require('../assets/icons/apple.png'),
  google: require('../assets/icons/google.png'),
  share: require('../assets/icons/share.png'),
  editicon: require('../assets/icons/editicon.png'),
  removefriend: require('../assets/icons/removefriend.png'),
  dots: require('../assets/icons/dots.png'), 
  letter: require('../assets/icons/letter.png'),
  //geitones: require('../assets/icons/geitones.png'), 
  //geitonas: require('../assets/icons/geitonas.png'),
   
};

const fontFamily = {
  boldFont: '',
  semiBoldFont: '',
  regularFont: '',
  mediumFont: '',
  lightFont: '',
  extraLightFont: '',
};

const fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20,
};

const loadingModal = {
  color: '#FFFFFF',
  size: 20,
  overlayColor: 'rgba(0,0,0,0.5)',
  closeOnTouch: false,
  loadingType: 'Spinner', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
};

const sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 25,
};

const styleSet = {
  menuBtn: {
    container: {
      backgroundColor: colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    icon: {
      tintColor: 'black',
      width: 15,
      height: 15,
    },
    iconLong: {
      tintColor: 'black',
      width: 150,
      height: 15,
    },
  },
  searchBar: {
    container: {
      marginLeft: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
    },
    input: {
      backgroundColor: colorSet.inputBgColor,
      borderRadius: 10,
      color: 'black',
    },
  },
  rightNavButton: {
    marginRight: 10,
  },
  borderRadius: {
    main: 25,
    small: 5,
  },
  textInputWidth: {
    main: '80%',
  },
  backArrowStyle: {
    resizeMode: 'contain',
    tintColor: '#000000',
    //tintColor: '#3875e8',
    width: 25,
    height: 25,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 10,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },

  signIconStyle: {
    resizeMode: 'contain',
   
    width: 96,
    height: 96,
    //marginTop: Platform.OS === 'ios' ? 50 : 20,
    //marginLeft: 10,
    //transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  }



};

const StyleDict = {
  imageSet,
  iconSet,
  fontFamily,
  colorSet,
  navThemeConstants,
  fontSet,
  sizeSet,
  styleSet,
  loadingModal,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
};

export default StyleDict;
