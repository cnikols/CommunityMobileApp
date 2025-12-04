import {DynamicStyleSheet} from 'react-native-dark-mode';
import AppStyles from '../../AppStyles';

const dynamicStyles = new DynamicStyleSheet({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btnIcon: {
   // tintColor: AppStyles.colorSet.mainTextColor,
    height: 25,
    width: 25,
  },
  btnText: {
    fontSize: 15,
    marginLeft: 18,
    marginTop: 2,
    color: AppStyles.colorSet.mainTextColor,
  },
});

export default dynamicStyles;
