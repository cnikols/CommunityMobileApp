import {DynamicStyleSheet} from 'react-native-dark-mode';
import AppStyles from '../../../AppStyles';
import { relativeTimeRounding } from 'moment';
import { useWindowDimensions } from 'react-native';
import {  View, Text, Image, StyleSheet, Dimensions } from 'react-native'

// const imageContainerWidth = 66;
const imageWidth = 110;
 

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.whiteSmoke,
  },
  progressBar: {
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor,
    height: 3,
    shadowColor: '#000',
    width: 0,
  },
  subContainer: {
    flex: 1,
    //backgroundColor: AppStyles.colorSet.whiteSmoke,
    backgroundColor:'#e7f1f9',
    //alignItems: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#d5d9dc',
      borderBottomWidth: 2,
      marginBottom: 10
  },
  userImage: {
    position:'relative',
    zIndex: 1000,
    
    width: imageWidth,
    height: imageWidth,
    borderRadius: Math.floor(imageWidth / 2),
    borderWidth: 0,
   
  },

  userImageContainer: {
    position:'relative',
    
    zIndex: 15,
    
    width: imageWidth,
    height: imageWidth,
    borderWidth: 0,
    margin: 18,
    
  },
  userImageMainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  zIndex:20,
  },
  userName: {
    fontSize: 25,
    textAlign: 'center',
    //fontWeight: '600',
    fontWeight: 'bold',
    color: '#f47555',
    //color: '#2db2e6',
  //  color: AppStyles.colorSet.mainTextColor,
    paddingTop: 15,
  },
  profileSettingsButtonContainer: {
    width: '92%',
    height: 40,
    borderRadius: 8,
    backgroundColor: AppStyles.colorSet.mainButtonColor,
    marginVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSettingsTitle: {
    color: AppStyles.colorSet.mainThemeForegroundColor,
    fontSize: 13,
    fontWeight: '600',
  },
  FriendsTitle: {
    color: AppStyles.colorSet.mainTextColor,
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
    padding: 10,
  },
  FriendsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '98%',
  },
  friendCardContainer: {
    height: Math.floor(AppStyles.WINDOW_HEIGHT * 0.18),
    width: Math.floor(AppStyles.WINDOW_WIDTH * 0.292),
    borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.013),
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    margin: 5,
  },
  friendCardImage: {
    height: '75%',
    width: '100%',
  },
  friendCardTitle: {
    color: AppStyles.colorSet.mainTextColor,
    fontSize: 13,
    padding: 4,
  },
  lineStyleR: {
    zIndex: 1 ,
    position:'relative', 
    top:90,
  //width:  Math.floor(imageWidth*2-80),
  width:  Math.floor(Dimensions.get('window').width/2-60),
    
    borderWidth: 0.4,
        borderColor:'lightgray',
        margin:0,
}, 

lineStyleL: {
  zIndex: 1 ,
  position:'relative', 
  top:90,
  left: Math.floor(Dimensions.get('window').width/2+60), 
//width:  Math.floor(imageWidth*2-80),
width:  Math.floor(Dimensions.get('window').width/2-65),
  
  borderWidth: 0.4,
      borderColor:'lightgray',
      margin:0,
},


  subButtonColor: {backgroundColor: AppStyles.colorSet.subButtonColor},
  titleStyleColor: {color: AppStyles.colorSet.mainTextColor},
}, 

);

export default dynamicStyles;
