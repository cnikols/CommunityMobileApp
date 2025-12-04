import {DynamicStyleSheet} from 'react-native-dark-mode';
import AppStyles from '../../AppStyles';
import { relativeTimeRounding } from 'moment';

const reactionIconSize = Math.floor(AppStyles.WINDOW_WIDTH * 0.09);

const dynamicStyles = new DynamicStyleSheet({
  container: {
    width: Math.floor(AppStyles.WINDOW_WIDTH * 0.97),
    alignSelf: 'center',
    marginVertical: 7,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  userImageContainer: {
    borderWidth: 0,
  },
  titleContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  title: {
    color: AppStyles.colorSet.mainTextColor,
    fontSize: 15,
    fontWeight: '600',
  },
  mainSubtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 3,
  },
  subtitleContainer: {
    flex: 1.3,
  },
  subtitle: {
    color: AppStyles.colorSet.mainSubtextColor,
    fontSize: 10,
  },
  moreIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  moreIcon: {
    height: 18,
    width: 18,
    tintColor: AppStyles.colorSet.mainSubtextColor,
    margin: 0,
  },
  bodyTitleContainer: {
    marginHorizontal: 8,
  },
  body: {
    color: AppStyles.colorSet.mainTextColor,
    fontSize: 13,
    lineHeight: 18,
    paddingBottom: 15,
    paddingHorizontal: 12,
  },
  moreText: {
    color: AppStyles.colorSet.mainThemeForegroundColor,
    fontSize: 13,
    lineHeight: 18,
    paddingBottom: 15,
    paddingHorizontal: 12,
  },
  bodyImageContainer: {
    height: AppStyles.WINDOW_HEIGHT * 0.3,
  },
  bodyImage: {
    height: '100%',
    width: '100%',
    //position: 'relative', 
    //top:100,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    marginRight: 3,
  },
  reactionContainer: {
    flexDirection: 'row',
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    position: 'absolute',
    bottom: 55,
    width: Math.floor(AppStyles.WINDOW_WIDTH * 0.68),
    height: 48,
    borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.07),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  reactionIconContainer: {
    margin: 3,
    padding: 0,
    backgroundColor: 'powderblue',
    width: reactionIconSize,
    height: reactionIconSize,
    borderRadius: reactionIconSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionIcon: {
    width: reactionIconSize,
    height: reactionIconSize,
    //width: '150',
    margin: 0,
  },
  footerContainer: {
    flexDirection: 'row',
  },
  footerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
 

    margin: 1,
  },
  footerIcon: {
    margin: 1,
    height: 22 ,
    width: 22 * 5,
  },
  mediaVideoLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineStyle:{
          borderWidth: 0.5,
          borderColor:'black',
          margin:10,
  },
    
  tintColor: {tintColor: AppStyles.colorSet.mainTextColor},
});

export default dynamicStyles;
