import {createDrawerNavigator} from 'react-navigation-drawer';
import {DrawerContainer} from '../components';
import {
  InnerFeedNavigator,
  InnerChatNavigator,
  InnerFriendsNavigator,
  InnerProfileNavigator,
} from './InnerStackNavigators';

const DrawerNavigator = createDrawerNavigator(
  {
    Feed: {
      screen: InnerFeedNavigator,
    },
    Chat: {
      screen: InnerChatNavigator,
    },
    Friends: {
      screen: InnerFriendsNavigator,
    },
    Profile: {
      screen: InnerProfileNavigator,
    },
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Feed',
    drawerWidth: 300,
    contentComponent: DrawerContainer,
    headerMode: 'screen',
    navigationOptions: ({navigation}) => {
      const routeIndex = navigation.state.index;
      return {
        title: navigation.state.routes[routeIndex].key,
        header: null,
      };
    },
  },
);

export default DrawerNavigator;
