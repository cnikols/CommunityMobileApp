import React, { useState } from 'react';
import { Text, TextInput, View, Alert, TouchableOpacity, Image } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { setUserData } from '../redux/auth';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const LoginScreen = props => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const appStyles = (props.navigation.state.params.appStyles || props.navigation.getParam('appStyles'));
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const appConfig = (props.navigation.state.params.appConfig || props.navigation.getParam('appConfig'));

  const onPressLogin = () => {
    setLoading(true);
    authManager
      .loginWithEmailAndPassword(email, password)
      .then(response => {
        if (response.user) {
          const user = response.user;
          props.setUserData(user);
          props.navigation.navigate('MainStack', { user: user });
        } else {
          setLoading(false);
          Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
            cancelable: false,
          });
        }
      })
  };

  const onFBButtonPress = () => {
    setLoading(true);
    authManager
      .loginOrSignUpWithFacebook(appConfig.appIdentifier)
      .then(response => {
        const user = response.user;
          if (user) {
            props.setUserData({ user: user });
            props.navigation.navigate('MainStack', { user: user });
        } else {
            Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
              cancelable: false,
          });
        }
      });
      setLoading(false);
  }

  const onGoogleButtonPress = () => {
    console.log("LoginScreen / onGoogleButtonPress entered function")
    setLoading(true);
    authManager
      .loginOrSignUpWithGoogle(appConfig.appIdentifier)
      .then(response => {
        const user = response.user;
        console.log("LoginScreen / onGoogleButtonPress: the user registered is: " + user);
        if (user) {
          console.log("LoginScreen / onGoogleButtonPress: navigating to MainStack");
          props.setUserData({ user: user });
          props.navigation.navigate('MainStack', { user: user });
        } else {
          console.log("LoginScreen/onGoogleButtonPress: Did not return a user so I will print an error.");
          setLoading(false);
          Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
            cancelable: false,
          })
        }
        setLoading(false);
      })
  }

  const onAppleButtonPress = () => {
    setLoading(true);
    const appleAuthRequestResponse = appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const { identityToken, nonce } = appleAuthRequestResponse;
    authManager
      .loginOrSignUpWithApple(identityToken, nonce, appConfig.appIdentifier)
      .then(response => {
        const user = response.user;
        if (user) {
          props.setUserData({ user: user });
          props.navigation.navigate('MainStack', { user: user });
        } else {
          Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
            cancelable: false,
          })
        }
        setLoading(false);
      })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='always'>
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => props.navigation.goBack()}
        >
          <Image style={appStyles.styleSet.backArrowStyle} source={appStyles.iconSet.backArrow} />
        
         
          <Text style={styles.headText}>{IMLocalized('σύνδεση')}</Text>
          

            <View>
          <Text style={{textAlign: 'right'}}> </Text>
    </View>

        </TouchableOpacity>
        
        
        <Text>{` 
        `}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('e-mail')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize='none'
          textAlign={'center'}
        />
        <Text>{` 
        `}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder={IMLocalized('κωδικός')}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize='none'
          textAlign={'center'}
        />
        
        <Text>{ ''}</Text>
        
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => onPressLogin()}
          >
          {IMLocalized('ΣΥΝΔΕΣΗ')}
          </Button>
        
        <Text style={styles.orTextStyle}> {IMLocalized('σύνδεση μέσω:')}</Text>
        <Text>{ ''}</Text>
  
        <View style={{flexDirection:'row' }}>
       
          <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center', marginLeft:20}}>
          <TouchableOpacity
        // style={styles.orTextStyle}
            //style={{ alignSelf: 'flex-start' }}
              onPress={() => onGoogleButtonPress()}>
            <Image  source={require('../../../../assets/icons/google.png')} style={{ width:79, height:79,marginLeft:20}} />
          </TouchableOpacity>
          </View>

          <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center', marginRight:20}}>
          <TouchableOpacity
            // style={styles.orTextStyle}
            //style={{ alignSelf: 'flex-start' }}
              onPress={() => onFBButtonPress()}> 
              <Image style={appStyles.styleSet.signIconStyle } source={appStyles.iconSet.facebook} style={{width:79, height:79}} />
            </TouchableOpacity>
          </View>

        {appleAuth.isSupported && (
          <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center', marginRight:20, marginLeft:-30, marginBottom:10}}>
            <TouchableOpacity
              onPress={() => onAppleButtonPress()}>
              <Image style={appStyles.styleSet.signIconStyle } source={appStyles.iconSet.apple} style={{width:69, height:79}} />
            </TouchableOpacity>
          </View>
        )}
    </View>

        <View style={styles.container}>
       
        <Text>{ ' '}</Text>
       
        </View>

        <Text style={styles.orTextStyle}>{ 'ή'}</Text>

        {appConfig.isSMSAuthEnabled && (
          <Button
            containerStyle={styles.phoneNumberContainer}
            onPress={() =>
              props.navigation.navigate('Sms', {
                isSigningUp: false,
                appStyles,
                appConfig,
              })
            }
          >
            {IMLocalized('Σύνδεση με αριθμό τηλεφώνου')}
          </Button>
        )}

        <Button
          containerStyle={styles.loginContainer1}
          style={styles.loginText}
          onPress={() =>{
            props.navigation.navigate('Signup', {appStyles, appConfig }); 
          }
          }>
          {IMLocalized('ΕΓΓΡΑΦΗ')}
        </Button>


        {loading && <TNActivityIndicator appStyles={appStyles} />}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default connect(null, {
  setUserData
})(LoginScreen);

