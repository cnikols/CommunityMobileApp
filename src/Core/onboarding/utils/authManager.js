import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import adminManager from './instamobileAdminManager';
import { firebaseAuth } from '../../firebase';
import { firebaseStorage } from '../../firebase/storage';
import { ErrorCode } from './ErrorCode';
import Geolocation from "@react-native-community/geolocation";
import neighborhoodManager from './neighborhoodFriendshipsManager';
import { GoogleSignin, statusCodes } from "@react-native-community/google-signin";

const FBSDK = require('react-native-fbsdk');
const { LoginManager, AccessToken } = FBSDK;

const defaultProfilePhotoURL = "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg";

const retrievePersistedAuthUser = () => {
    return new Promise(resolve => {
        firebaseAuth
            .retrievePersistedAuthUser()
            .then(user => {
                if (user) {
                    handleSuccessfulLogin(user, false)
                        .then(user => {
                            // Persisted login successful, push token stored, login credential persisted, so we log the user in.
                            resolve({ user });
                        })
                } else {
                    resolve(null);
                }
            })
    });
}

const loginWithEmailAndPassword = (email, password) => {
    return new Promise(function (resolve, _reject) {
        firebaseAuth
            .loginWithEmailAndPassword(email, password)
            .then(response => {
                if (!response.error) {
                    handleSuccessfulLogin({ ...response.user }, false)
                        .then(user => {
                            // Login successful, push token stored, login credential persisted, so we log the user in.
                            resolve({ user });
                        })
                } else {
                    resolve({ error: response.error });
                }
            })
    });
};

const logout = (user) => {
    const userData = {
        ...user,
        isOnline: false
    };
    firebaseAuth.updateUser(user.id || user.userID, userData);
    firebaseAuth.logout();
}

const createAccountWithEmailAndPassword = (userDetails, appIdentifier) => {
    const { photoURI } = userDetails;
    const accountCreationTask = (userData) => {
        return new Promise(function (resolve, _reject) {
            firebaseAuth
            .register(userData, appIdentifier)
            .then(response => {
                if (response.error) {
                    resolve({ error: response.error });
                } else {
                    // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
                    let user = response.user;
                    if (photoURI) {
                        firebaseStorage
                            .uploadImage(photoURI)
                            .then(response => {
                                if (response.error) {
                                    // if account gets created, but photo upload fails, we still log the user in
                                    resolve({ nonCriticalError: response.error, user: { ...user, profilePictureURL: defaultProfilePhotoURL } });
                                } else {
                                    firebaseAuth
                                        .updateProfilePhoto(user.id, response.downloadURL)
                                        .then(_result => {
                                            resolve({ user: { ...user, profilePictureURL: response.downloadURL } });
                                        })
                                    }
                                })
                        } else {
                            resolve({ user: { ...response.user, profilePictureURL: defaultProfilePhotoURL } });
                        }
                    }
                })
        });
    };

    return new Promise(function (resolve, _reject) {
        const userData = { ...userDetails, profilePictureURL: defaultProfilePhotoURL }
        accountCreationTask(userData)
            .then(response => {
                if (response.error) {
                    resolve({ error: response.error })
                } else {
                    // We signed up successfully, so we are logging the user in (as well as updating push token, persisting credential,s etc.)
                    handleSuccessfulLogin(response.user, true)
                        .then(response => {
                            resolve(response)
                        })
                }
            })
    });
}

const loginOrSignUpWithGoogle =  async (appIdentifier, neighborhoodBoundaries) => {
    console.log("authManager / loginOrSignUpWithGoogle : entered function. ")
    return new Promise((resolve, _reject) => {
        GoogleSignin.configure({
                webClientId: '265328939420-t3ha2ulon0p7sktg7ut2ucpd4sfb7v6l.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
                offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
                forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
                accountName: '', // [Android] specifies an account name on the device that should be used
                });
        GoogleSignin.hasPlayServices().then(r => {
            GoogleSignin.signIn().then(userInfo => {
            console.log("authManager / loginOrSignUpWithGoogle: have signed in.");
            //this.setState({ userInfo });
            //return new Promise((resolve, _reject) => {
            const googleAccessToken = userInfo.idToken;   //TODO: check if this or the other token is needed
            console.log("authManager / loginOrSignUpWithGoogle: the googleAccessToken is: " + googleAccessToken);
            firebaseAuth
                .loginWithGoogle(userInfo, appIdentifier, neighborhoodBoundaries)
                .then(response => {
                    console.log("authManager / loginOrSignUpWithGoogle: got back from firebase loginWithGoogle : ");
                    if (!response.error) {
                        console.log("authManager / loginOrSignUpWithGoogle:");
                        console.log("authManager / loginOrSignUpWithGoogle: the user is " + response.user);
                        console.log("authManager / loginOrSignUpWithGoogle: the accountCreated is " + response.accountCreated);
                        const newResponse = { user: { ...response.user }, accountCreated: response.accountCreated };
                        handleSuccessfulLogin(newResponse.user, true)
                        .then(response => {
                            resolve(response);
                        })
                    } else {
                        console.log("authManager / loginOrSignUpWithGoogle: error resolved ");
                        reject(ErrorCode.googleAuthFailed);
                    }
                    });
                })
            })
    })
}

const loginOrSignUpWithFacebook = (appIdentifier, neighborhoodBoundaries) => {
    return new Promise((resolve, _reject) => {
        LoginManager
            .logInWithPermissions(['public_profile', 'email'])
            .then(result => {
                if (result.isCancelled) {
                    resolve({ error: ErrorCode.fbAuthCancelled });
                        return;
                }
                AccessToken
                    .getCurrentAccessToken()
                    .then(data => {
                        const fbAccessToken = data.accessToken;
                        firebaseAuth
                            .loginWithFacebook(fbAccessToken, appIdentifier, neighborhoodBoundaries)
                            .then(response => {
                                console.log ("authManager.js/loginOrSignUpWithFacebook: this is the response.user: " + response.user);
                                if (response.user) {
                                    const newResponse = { user: { ...response.user }, accountCreated: response.accountCreated };
                                    handleSuccessfulLogin(newResponse.user, true)
                                    .then(response => {
                                        resolve(response);
                                    })
                                } else {
                                    resolve({ error: ErrorCode.firebaseFBAuthFailed });
                                }
                            })
                    });
            },
            _error => {
                resolve({ error: ErrorCode.RNFBSDKAuthFailed });
                });
    });
}

const loginOrSignUpWithApple =  async (identityToken, nonce, appIdentifier, neighborhoodBoundaries) => {
    return new Promise((resolve, _reject) => {
        console.error("authManager/loginOrSignUpWithApple: entering the function.");
        console.error("authManager/loginOrSignUpWithApple: identityToken: " + identityToken);
        console.error("authManager/loginOrSignUpWithApple: nonce: " + nonce);
        console.error("authManager/loginOrSignUpWithApple: appIdentifier" + appIdentifier);
        firebaseAuth
            .loginWithApple(identityToken, nonce, appIdentifier, neighborhoodBoundaries)
            .then(response => {
                console.error("authManager/loginOrSignUpWithApple: loginWithApple has completed. Finding the user to respond");
                if (response.user) {
                    const newResponse = { user: { ...response.user }, accountCreated: response.accountCreated };
                    handleSuccessfulLogin(newResponse.user, response.accountCreated)
                    .then(response => {
                        resolve(response);
                    })
                } else {
                    reject(ErrorCode.appleAuthFailed);
                }
        })
    })
}

const retrieveUserByPhone = (phone) => {
    return firebaseAuth.retrieveUserByPhone(phone);
}

const sendSMSToPhoneNumber = phoneNumber => {
    return firebaseAuth.sendSMSToPhoneNumber(phoneNumber)
}

const loginWithSMSCode = (smsCode, verificationID) => {
    return new Promise(function (resolve, _reject) {
        firebaseAuth
            .loginWithSMSCode(smsCode, verificationID)
            .then(response => {
                if (response.error) {
                    resolve({ error: response.error });
                } else {
                    // successful phone number login, we fetch the push token
                    handleSuccessfulLogin(response.user, false)
                        .then(response => {
                            resolve(response)
                        })
                }
            })
    });
}

const registerWithPhoneNumber = (userDetails, smsCode, verificationID, appIdentifier) => {
    const { photoURI } = userDetails;
    const accountCreationTask = (userData) => {
        return new Promise(function (resolve, _reject) {
            firebaseAuth
                .registerWithPhoneNumber(userData, smsCode, verificationID, appIdentifier)
                .then(response => {
                    if (response.error) {
                        resolve({ error: response.error });
                    } else {
                        // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
                        let user = response.user;
                        if (photoURI) {
                            firebaseStorage
                                .uploadImage(photoURI)
                                .then(response => {
                                    if (response.error) {
                                        // if account gets created, but photo upload fails, we still log the user in
                                        resolve({ nonCriticalError: response.error, user: { ...user, profilePictureURL: defaultProfilePhotoURL } });
                                    } else {
                                        firebaseAuth
                                            .updateProfilePhoto(user.id, response.downloadURL)
                                            .then(_res => {
                                                resolve({ user: { ...user, profilePictureURL: response.downloadURL } });
                                            })
                                    }
                                })
                        } else {
                            resolve({ user: { ...response.user, profilePictureURL: defaultProfilePhotoURL } });
                        }
                    }
                })
        });
    };

    return new Promise(function (resolve, _reject) {
        const userData = { ...userDetails, profilePictureURL: defaultProfilePhotoURL }
        accountCreationTask(userData)
            .then(response => {
                if (response.error) {
                    resolve({ error: response.error })
                } else {
                    handleSuccessfulLogin(response.user, true)
                        .then(response => {
                            resolve(response)
                        })
                }
            })
    });
}

const handleSuccessfulLogin = (user, accountCreated) => {
    console.log("authManager/handleSuccessfulLogin: Entered the function and the value of accountCreated is: " + accountCreated);
    // After a successful login, we fetch & store the device token for push notifications, location, online status, etc.
    // we don't wait for fetching & updating the location or push token, for performance reasons (especially on Android)
    fetchAndStoreExtraInfoUponLogin(user, accountCreated)
    if (accountCreated && adminManager) {
        adminManager.handleNewAccountCreation(user);
        console.log(" ========== creatingNewNeighborhood start ========== ");

        setTimeout(function(){
            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            //Alert.alert("Atention", "Please do not close the app until the system brings your neighbors.");
            Alert.alert("Προσοχή!","Παρακαλούμε περιμένετε. Η εφαρμογή αναζητά τους γείτονές σας");
        }, 2000);


        neighborhoodManager.creatingNewNeighborhood(user);
        //console.log(" ========== creatingNewNeighborhood finish ========== ");
    }
    return new Promise(resolve => {
        resolve({ user: { ...user } });
    });
}

const fetchAndStoreExtraInfoUponLogin = async (user, accountCreated) => {
    getCurrentLocation(Geolocation)
        .then(async location => {
            const latitude = location.coords.latitude
            const longitude = location.coords.longitude
            var locationData = {};
            if (location) {
                locationData = {
                    location: {
                        latitude: latitude,
                        longitude: longitude
                    }
                };
                if (accountCreated) {
                    locationData = {
                        ...locationData,
                        signUpLocation: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    }
                }
            }
            const pushToken = await firebaseAuth.fetchPushTokenIfPossible();
            const userData = {
                ...user,
                ...locationData,
                pushToken: pushToken,
                isOnline: true
            };
            firebaseAuth.updateUser(user.id || user.userID, userData);
        });
}

const getCurrentLocation = geolocation => {
    return new Promise(resolve => {
        geolocation.getCurrentPosition(
            resolve,
            () => resolve({ coords: { latitude: "", longitude: "" } }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    })
};


const authManager = {
    retrievePersistedAuthUser,
    loginWithEmailAndPassword,
    logout,
    createAccountWithEmailAndPassword,
    loginOrSignUpWithFacebook,
    loginOrSignUpWithGoogle,
    loginOrSignUpWithApple,
    sendSMSToPhoneNumber,
    loginWithSMSCode,
    registerWithPhoneNumber,
    retrieveUserByPhone
};

export default authManager;
