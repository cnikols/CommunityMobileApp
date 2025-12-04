import { Dimensions, I18nManager } from 'react-native';
import { DynamicStyleSheet } from 'react-native-dark-mode';

const { height } = Dimensions.get('window');
const imageSize = height * 0.232;
const photoIconSize = imageSize * 0.27;

const dynamicStyles = (appStyles) => {
  return new DynamicStyleSheet({
  
    headText: {
      color: '#f68d1f',
      fontSize: 28,
      fontWeight: "normal",
      backgroundColor: appStyles.colorSet.whiteSmoke,
      position: 'absolute', 
      top: -2,
      left: 40,
      padding: 5,
      alignSelf: 'stretch',
      textAlign: 'center',
      width: '80%',
      borderBottomWidth:  1, 

    },
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet.mainThemeForegroundColor,
      marginTop: 25,
      marginBottom: 30,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 35,
    },

    title1: {
      fontSize: 22,
      fontWeight: 'normal',
      color: '#2db2e6',  // appStyles.colorSet.mainThemeForegroundColor,
      marginTop: 5,
      marginBottom: 30,
      alignSelf: 'stretch',
      textAlign: 'center',
      marginLeft: 1,
    },

    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: appStyles.fontSet.middle,
      color: appStyles.colorSet.mainThemeForegroundColor,
    },
    loginContainer: {
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet.mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 30,
    },
    loginText: {
      color: appStyles.colorSet.mainThemeBackgroundColor,
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      borderBottomWidth:  2, 
      borderBottomColor: appStyles.colorSet.grey9,
      height: 40,
      //borderWidth: 1,
      borderColor: appStyles.colorSet.grey3,
      paddingLeft: 20,
      color: appStyles.colorSet.mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 18,
      alignItems: 'center',
      borderRadius: 0,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
     
    },


    loginContainer: {
      //width: '70%',
      width: '35%',
      //backgroundColor: appStyles.colorSet.mainThemeForegroundColor,
      backgroundColor: '#1494d1',
      //borderRadius: 25,
      borderRadius: 10,
      padding: 10,
      marginTop: 30,
      marginBottom: 30,
      alignSelf: 'center',
   
    },


    signupContainer: {
      alignSelf: 'center',
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet.mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 40,
    },
    signupText: {
      color: appStyles.colorSet.mainThemeBackgroundColor,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageBlock: {
      flex: 2,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
    },
    mapInitiatorText: {
      marginTop: 50,
      textAlign: 'center',
      color: '#909090',
      marginBottom: 25,
    },
    circleMap: {
      aspectRatio: 1,
    },
    mapOverflow:{
      overflow: 'hidden',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'gainsboro',
      borderRadius: 1000,
      margin: '5%',
      marginBottom:0,
    },
    formContainer: {
      width: '100%',
      flex: 4,
      alignItems: 'center',
    },
    photo: {
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize,
    },
    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      opacity: 0.8,
      zIndex: 2,
    },
    orTextStyle: {
      color: 'black',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
      color: appStyles.colorSet.mainTextColor,
    },
    PhoneNumberContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    smsText: {
      color: '#4267b2',
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      //alignItems: "center",
      //marginTop: 20
    },
    modalView: {
      height: '83%',
      backgroundColor: "white",
      borderRadius: 20,
      padding: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    mapSignupText: {
      color: "white",
      textAlign: 'center',
      fontSize: 16,
    },
    mapLoginContainer: {
      width: '49%',
      backgroundColor: '#1494d1',
      borderRadius: 10,
      padding: 13,
      marginBottom: 10,
    },
    buttonView: {
      marginTop:20,
      alignItems: "center",
    }
  })
};

export default dynamicStyles;
