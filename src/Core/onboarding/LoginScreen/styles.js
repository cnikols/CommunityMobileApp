import { I18nManager } from 'react-native';
import { DynamicStyleSheet } from 'react-native-dark-mode';

const dynamicStyles = (appStyles) => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    orTextStyle: {
      color: appStyles.colorSet.mainTextColor,
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
    },
    headContainer: {
      width: '80%',
      backgroundColor: appStyles.colorSet.whiteSmoke,
      //borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
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

    headView:{
      backgroundColor: appStyles.colorSet.whiteSmoke,
      alignSelf: 'stretch',
      textAlign: 'left',
      width: '100%',
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet.mainThemeForegroundColor,
      marginTop: 25,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 30,
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
      alignSelf: 'center',
   
    },

    loginContainer1: {
      //width: '70%',
      width: '35%',
      //backgroundColor: appStyles.colorSet.mainThemeForegroundColor,
      backgroundColor: '#f68d1f',
      //borderRadius: 25,
      borderRadius: 10,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
   
    },

    loginText: {
      color: '#ffffff',
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      borderBottomWidth:  2, 
      borderBottomColor: appStyles.colorSet.grey9,
      height: 42,
      //borderWidth: 1,
      borderColor: appStyles.colorSet.grey3,
      paddingLeft: 20,
      color: appStyles.colorSet.mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 0,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
     
    },

    facebookContainer: {
      width: '70%',
      backgroundColor: '#4267B2',
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
    facebookText: {
      color: '#ffffff',
    },
    phoneNumberContainer: {
      marginTop: 20,
    },
  })
};

export default dynamicStyles;
