import {DynamicStyleSheet} from 'react-native-dark-mode';
import AppStyles from '../../AppStyles';

const dynamicStyles = new DynamicStyleSheet({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
});

export default dynamicStyles;
