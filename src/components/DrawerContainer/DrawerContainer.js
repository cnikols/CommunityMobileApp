import React from 'react';
import { View } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { connect } from 'react-redux';
import DrawerItem from '../DrawerItem/DrawerItem';
import { logout } from '../../Core/onboarding/redux/auth';
import AppStyles from '../../AppStyles';
import dynamicStyles from './styles';
import authManager from '../../Core/onboarding/utils/authManager';
import { IMLocalized } from '../../Core/localization/IMLocalization';

function DrawerContainer(props) {
  const { navigation } = props;
  const styles = useDynamicStyleSheet(dynamicStyles);

  const onLogout = async () => {
    authManager.logout(props.user);
    props.logout();
    navigation.navigate('LoadScreen', {
      appStyles: AppStyles,
      appConfig: InstagramCloneConfig,
    });
  };

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <DrawerItem
          title={IMLocalized("Γειτονιά")}
          source={AppStyles.iconSet.homeUnfilled}
          onPress={() => {
            navigation.navigate('Feed');
          }}
        />
       
       
       
        <DrawerItem
          title={IMLocalized("Συνομιλίες")}
          source={AppStyles.iconSet.commentUnfilled_}
          source={AppStyles.imageSet.chat}

          //source={AppStyles.imageSet.synomilies.png}
          onPress={() => {
            navigation.navigate('Chat');
          }}

          // sos discover item has been deleted  

           // title={IMLocalized("Εύρεση")}
         // source={AppStyles.iconSet.search}
         // onPress={() => {
         //   navigation.navigate('Discover');
         // }}



        />
        <DrawerItem
          title={IMLocalized("Γείτονες")}
          source={AppStyles.iconSet.friendsUnfilled}
          //source={AppStyles.iconSet.geitones.png}
          onPress={() => {
            navigation.navigate('Friends');
          }}
        />
        <DrawerItem
          title={IMLocalized("Προφίλ")}
          source={AppStyles.iconSet.profileUnfilled}
         // source={AppStyles.iconSet.geitonas.png}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <DrawerItem
          title={IMLocalized("Αποσύνδεση")}
          source={AppStyles.iconSet.logout}
          onPress={onLogout}
        />
      </View>
    </View>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {
  logout,
})(DrawerContainer);
