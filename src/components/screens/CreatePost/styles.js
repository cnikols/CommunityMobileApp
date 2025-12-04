import {DynamicStyleSheet} from 'react-native-dark-mode';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import AppStyles from '../../../AppStyles';

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
  },
  topContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 3,
  },
  titleContainer: {
    marginTop: 19,
    flex: 1,
    flexDirection: 'row',
    position:'relative', 
    top:13,
  },
  title: {
    //color: AppStyles.colorSet.mainTextColor,
    
    color: '#2db2e6',
    fontSize: 15,
    fontWeight: '600',
    fontWeight: 'bold',
  },
  subtitle: {
    color: AppStyles.colorSet.mainTextColor,
    fontSize: 10,
  },
  postInputContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderLeftWidth:1,
  borderRightWidth:1,
  borderBottomWidth:1,
  borderTopWidth:1,
  margin:4,
borderColor:'#d5d9dc',
  },
  postInput: {
    height: '90%',
    width: '90%',
    color: AppStyles.colorSet.mainTextColor,
  },
  bottomContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  blankBottom: {
    ...ifIphoneX(
      {
        flex: 1.1,
      },
      {
        flex: 1.4,
      },
    ),
  },
  postImageAndLocationContainer: {
    width: '100%',
    backgroundColor: AppStyles.colorSet.whiteSmoke,
  },
  imagesContainer: {
    width: '100%',
    marginBottom: 23,
  },
  imageItemcontainer: {
    width: 65,
    height: 65,
    margin: 3,
    marginTop: 5,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  imageItem: {
    width: '100%',
    height: '100%',
  },
  addImageIcon: {
    width: '50%',
    height: '50%',
  },
  addTitleAndlocationIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addTitleContainer: {
    
   
      
    flex: 5.8,
    justifyContent: 'center',
    
  },
  addTitle: {
    //color: AppStyles.colorSet.mainTextColor,
    color: '#9d9d9d',
    fontSize: 13,
    padding: 8,
  },
  iconsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    marginHorizontal: 2,
  },
  icon: {
    height: 23,
    width: 23,
  },
  imageBackground: {
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor,
  },
  cameraFocusTintColor: {
    tintColor: AppStyles.colorSet.mainThemeForegroundColor,
  },
  cameraUnfocusTintColor: {
    tintColor: AppStyles.colorSet.mainTextColor,
  },
  pinpointTintColor: {tintColor: AppStyles.colorSet.mainTextColor},
});

export default dynamicStyles;
