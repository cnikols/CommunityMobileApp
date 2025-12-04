import {DynamicStyleSheet} from 'react-native-dark-mode';
import AppStyles from '../../../AppStyles';

const commentItemHeight = 80;
const commentBodyPaddingLeft = 8;

const dynamicStyles = new DynamicStyleSheet({
  detailPostContainer: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
  },
  commentItemContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 2,
  },
  commentItemImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  commentItemImage: {
    height: 36,
    width: 36,
    borderRadius: 18,
    marginVertical: 5,
    marginLeft: 5,
  },
  commentItemBodyContainer: {
    flex: 5,
  },
  commentItemBodyRadiusContainer: {
    width: Math.floor(AppStyles.WINDOW_WIDTH * 0.71),
    padding: 7,
    borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.03),
    margin: 5,
    backgroundColor: AppStyles.colorSet.whiteSmoke,
  },
  commentItemBodyTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: AppStyles.colorSet.mainTextColor,
    paddingVertical: 3,
    paddingLeft: commentBodyPaddingLeft,
    lineHeight: 12,
  },
  commentItemBodySubtitle: {
    fontSize: 12,
    color: AppStyles.colorSet.mainTextColor,
    paddingVertical: 3,
    paddingLeft: commentBodyPaddingLeft,
  },
  commentInputContainer: {
   // gri plaisio tou send icon
    backgroundColor: AppStyles.colorSet.whiteSmoke,
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentTextInputContainer: {
    flex: 6,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    color: AppStyles.colorSet.mainTextColor,
    height: '90%',
    width: '90%',
    marginLeft: 8,
    justifyContent: 'center',
  },
  commentTextInput: {
    padding: 8,
    color: AppStyles.colorSet.mainTextColor,
  },
  commentInputIconContainer: {
    flex: 0.7,
    justifyContent: 'center',
    marginLeft: 8,
  },
  commentInputIcon: {
    height: 22,
    width: 22,
    //tintColor: AppStyles.colorSet.mainTextColor,
  },
  placeholderTextColor: {
    color: AppStyles.colorSet.mainTextColor,
  },
});

export default dynamicStyles;
