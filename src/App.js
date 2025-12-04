import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import {initialMode, eventEmitter} from 'react-native-dark-mode';
import SplashScreen from 'react-native-splash-screen';
import configureStore from './redux/store';
import AppContainer from './screens/AppContainer';
import { setI18nConfig } from './Core/localization/IMLocalization';
import * as RNLocalize from 'react-native-localize';
import * as FacebookAds from 'expo-ads-facebook';
import SocialNetworkConfig from './SocialNetworkConfig';

if (SocialNetworkConfig.adsConfig) {
  FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash);
  FacebookAds.AdSettings.setLogLevel('debug');
}

const store = configureStore();
const handleLocalizationChange = () => {
  setI18nConfig();
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: initialMode,
    };
  }
  componentDidMount() {
    SplashScreen.hide();
    YellowBox.ignoreWarnings(['Remote Debugger']);
    console.disableYellowBox = true;
    setI18nConfig();
    RNLocalize.addEventListener('change', handleLocalizationChange);

    eventEmitter.on('currentModeChanged', mode => {
      this.setState({mode});
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer screenProps={{theme: this.state.mode}} />
      </Provider>
    );
  }
}
