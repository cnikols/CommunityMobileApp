import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import DrawerNavigator from './DrawerNavigator';
import {IMChatScreen} from '../Core/chat';
import AppStyles from '../AppStyles';

const MainStackNavigator = createStackNavigator(
  {
    NavStack: {
      screen: DrawerNavigator,
    },
    PersonalChat: {screen: IMChatScreen},
  },
  {
    initialRouteName: 'NavStack',
    headerMode: 'float',
    cardStyle: {
      backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    },
  },
);

export default MainStackNavigator;
