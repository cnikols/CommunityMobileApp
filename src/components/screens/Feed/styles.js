import {DynamicStyleSheet} from 'react-native-dark-mode';
import AppStyles from '../../../AppStyles';

const dynamicStyles = new DynamicStyleSheet({
  feedContainer: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.whiteSmoke,
  },
  emptyStateView: {
    marginTop: 50
  }
});

export default dynamicStyles;
