import React, { useState } from 'react';
import { Text, TextInput, Linking, View, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import TNProfilePictureSelector from '../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector';
import { IMLocalized } from '../../localization/IMLocalization';
import { setUserData } from '../redux/auth';
import { connect } from 'react-redux';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';
import MapView from 'react-native-maps';
import { AppleButton, appleAuth, appleAuthAndroid } from '@invertase/react-native-apple-authentication';

const SignupScreen = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [neighborhoodBoundaries, setneighborhoodBoundaries] = useState('');

  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const appConfig = (props.navigation.state.params.appConfig || props.navigation.getParam('appConfig'));
  const appStyles = (props.navigation.state.params.appStyles || props.navigation.getParam('appStyles'));
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  const [modalVisible, setModalVisible] = useState(false);
  const [googleSignIn, setGoogleSignIn] = useState(false);
  const [facebookSignIn, setFacebookSignIn] = useState(false);
  const [appleSignIn, setAppleSignIn] = useState(false);

  const onFBButtonPress = () => {
    setLoading(true);
    authManager
      .loginOrSignUpWithFacebook(appConfig.appIdentifier, neighborhoodBoundaries)
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
        setLoading(true);
        console.log("the appIdentifier is: "+ appConfig.appIdentifier);
        authManager
          .loginOrSignUpWithGoogle(appConfig.appIdentifier, neighborhoodBoundaries)
          .then(response => {
            const user = response.user;
            if (user) {
              console.log("The user is: " + user);
              console.log("Will move now to the MainStack.");
              props.setUserData({ user: user });
              props.navigation.navigate('MainStack', { user: user });
            } else {
              console.log("Did not find a user");
              Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
                cancelable: false,
              })
            }
            setLoading(false);
          })
  }

  const onAppleButtonPress = () => {
    console.error("Entering the AppleButtonPress function. Starting...");
    setLoading(true);
    //appIdentifier = appConfig.appIdentifier;
    console.error("The appIdentifier is: " + appConfig.appIdentifier);
    appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    }).then((identityToken, nonce) => {
          console.error("Completed the performRequest, with identityToken : "+ identityToken  +" and nonce: " + nonce);
          authManager
            .loginOrSignUpWithApple(identityToken, nonce, appConfig.appIdentifier, neighborhoodBoundaries)
            .then(response => {
              console.error("Got response from authManager.loginOrSignUpWithApple. Checking that the response is a valid user.");
              const user = response.user;
                if (user) {
                  console.error("SignupScreen.js / onAppleButtonPress: Returned on onAppleButtonPress with new user");
                  props.setUserData({ user: user });
                  console.error("SignupScreen.js / onAppleButtonPress: Navigating to MainStack.");
                  props.navigation.navigate('MainStack', { user: user });
              } else {
                console.error("Error: SignupScreen.js / onAppleButtonPress: Returned on onAppleButtonPress with no valid user.");
                  Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
                    cancelable: false,
                });
              }
            });
            setLoading(false);
    })
  }

  const onEmailRegister = () => {
    setLoading(true);

    const userDetails = {
      firstName,
      lastName,
      email,
      password,
      photoURI: profilePictureURL,
      appIdentifier: appConfig.appIdentifier,
      neighborhoodBoundaries,
    };
    authManager
      .createAccountWithEmailAndPassword(userDetails, appConfig.appIdentifier)
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
        setLoading(false);
      })
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='always'>
       

      <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => props.navigation.goBack()}>
          <Image style={appStyles.styleSet.backArrowStyle} source={appStyles.iconSet.backArrow} />
          <Text style={styles.headText}>{IMLocalized('εγγραφή')}</Text>
          <View>
              <Text style={{textAlign: 'right'}}> </Text>
          </View>
      </TouchableOpacity>
      
      <Text style={styles.title1}>{IMLocalized('εγγραφή μέσω')}</Text>
      

       <View style={{flexDirection:'row' }}>
       
       <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center', marginLeft:20}}>
       <TouchableOpacity
           onPress={() => {
            setGoogleSignIn(true);
            setModalVisible(true);
          }}>
         <Image  source={appStyles.iconSet.google} style={{ width:79, height:79,marginLeft:20}} />
       </TouchableOpacity>
       </View>

       <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center', marginRight:20}}>
          <TouchableOpacity
           onPress={() =>
            {
              setFacebookSignIn(true);
              setModalVisible(true);
            }
            }>
            <Image style={appStyles.styleSet.signIconStyle } source={appStyles.iconSet.facebook} style={{width:79, height:79}} />
          </TouchableOpacity>
       </View>

      {appleAuth.isSupported && (
        <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center', marginRight:20, marginLeft:-30, marginBottom:10}}>
          <TouchableOpacity
            onPress={() =>
              {
                setAppleSignIn(true);
                setModalVisible(true);
              }
            }>
            <Image style={appStyles.styleSet.signIconStyle } source={appStyles.iconSet.apple} style={{width:69, height:79}} />
          </TouchableOpacity>
        </View>
      )}
    </View>


        <Text style={styles.title1}>{IMLocalized('\nή \n\n δημιουργία λογαριασμού')}</Text>
        <TNProfilePictureSelector
          setProfilePictureURL={setProfilePictureURL}
          appStyles={appStyles}
        />
<>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("You are attempting to exit the registration.");
        }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.mapInitiatorText}>
                  Eπιλέξτε την γειτονιά σας από τον χάρτη:
                </Text>
                <View style={styles.mapOverflow}>
                  <MapView 
                      style={styles.circleMap}
                      minZoomLevel={15}
                      maxZoomLevel={18}
                      rotateEnabled={false}
                      pitchEnabled={false} 
                      onRegionChangeComplete={(boundaries = getMapBoundaries())=>{
                        boundaries.latitudeDelta=boundaries.latitudeDelta/2
                        boundaries.longitudeDelta=boundaries.longitudeDelta/2
                        setneighborhoodBoundaries(boundaries)
                          }}
                        initialRegion={{
                        latitude: 37.9431856,
                        longitude: 23.7127843,
                        latitudeDelta: 0.024,
                        longitudeDelta: 0.024,
                      }}
                  />
                </View>
              <View style={styles.buttonView}>
                <Button
                  containerStyle={styles.mapLoginContainer}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    if (facebookSignIn) {
                      onFBButtonPress();
                    } else if (googleSignIn) {
                      onGoogleButtonPress();
                    } else if (appleSignIn) {
                      onAppleButtonPress();
                      console.error("The button pressed is AppleButton");
                    } else {
                      onEmailRegister();
                    }
                  }}
                >
                  <Text style={styles.mapSignupText}>ΟΛΟΚΛΗΡΩΣΗ</Text>
                </Button>
              </View>
            </View>
          </View>
      </Modal>

        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('όνομα')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setFirstName(text)}
          value={firstName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('επώνυμο')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setLastName(text)}
          value={lastName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('E-mail ')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize='none'
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('κωδικός')}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize='none'
        />
        
        <Text style={styles.mapInitiatorText}>
           Με την εγγραφή σας αποδέχεστε τους όρους χρήσης που μπορείτε να διαβάσετε κάνοντας κλικ &nbsp;  
           <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL('https://geitonia.me/?page_id=469')}>
             εδώ
            </Text>
        </Text>
        

        <Button
          containerStyle={styles.loginContainer}
          style={styles.signupText}
          onPress={() => setModalVisible(true)}
        >
          {IMLocalized('ΕΓΓΡΑΦΗ')}
        </Button>
      </>
      
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
};

export default connect(null, {
  setUserData
})(SignupScreen);
