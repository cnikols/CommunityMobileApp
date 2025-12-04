import { DynamicStyleSheet } from 'react-native-dark-mode';
import { rangeRight } from 'lodash';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
  
    },
    userImageContainer: {
      borderWidth: 0,
    },
    chatsChannelContainer: {
      // flex: 1,
      padding: 10,
    },
    chatItemContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      
      paddingBottom:10,
      borderBottomWidth: 1,
      //borderTopWidth: 1,
      borderBottomColor:'lightgray',
      

    //borderStyle:doubleDashed, 
    },
    chatItemContent: {
      flex: 1,
      alignSelf: 'center',
      marginLeft: 10,

    },
    chatFriendName: {
      //color: appStyles.colorSet.mainTextColor,
      color: '#2db2e6', 
      fontSize: 17,
      //fontWeight: '500'
      fontWeight: 'bold'

    },
    content: {
      flexDirection: 'row',
      marginTop: 5
    },
    message: {
      flex: 2,
      color: appStyles.colorSet.mainSubtextColor,
      //textAlign: 'right', alignSelf: 'stretch'
    },

    messageDate: {
      //flex: 2,
      //color: appStyles.colorSet.mainSubtextColor,
      textAlign: 'right', alignSelf: 'stretch'
      
    },

  })
};

export default dynamicStyles;
