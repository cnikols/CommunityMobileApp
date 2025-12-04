import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import authManager from '../../../../onboarding/utils/authManager';
import dynamicStyles from './styles';
import { IMLocalized } from '../../../../localization/IMLocalization';

function IMProfileSettings(props) {
  const { navigation, onLogout, lastScreenTitle, appStyles, appConfig } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const onSettingsTypePress = async (
    type,
    routeName,
    form,
    screenTitle,
    phone
  ) => {
    if (type === 'Log Out') {
      authManager.logout(props.user);
      onLogout();
      navigation.navigate('LoadScreen', {
        appStyles: appStyles,
        appConfig: appConfig,
      });
    } else {
      navigation.navigate(lastScreenTitle + routeName, {
        appStyles: appStyles,
        form,
        screenTitle,
        phone,
      });
    }
  };

  const renderSettingsType = ({ type, routeName, form, screenTitle, phone }) => (
    <TouchableOpacity
      style={styles.settingsTypeContainer}
      onPress={() => onSettingsTypePress(type, routeName, form, screenTitle)}>
      <Text style={styles.settingsType}>{type}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.settingsTitleContainer}>
        <Text style={styles.settingsTitle}>{'ΓΕΝΙΚΑ'}</Text>
      </View>
      <View style={styles.settingsTypesContainer}>
        {renderSettingsType({
          type: 'Πληροφορίες λογαριασμού',
          routeName: 'EditProfile',
          form: appConfig.editProfileFields,
          screenTitle: IMLocalized('Επεξεργασία προφίλ'),
        })}
        {renderSettingsType({
          type: 'Ρυθμίσεις',
          routeName: 'AppSettings',
          form: appConfig.userSettingsFields,
          screenTitle: IMLocalized('Ρυθμίσεις χρήστη'),
        })}
        {renderSettingsType({
          type: 'Επικοινωνία',
          routeName: 'ContactUs',
          form: appConfig.contactUsFields,
          phone: appConfig.contactUsPhoneNumber,
          screenTitle: IMLocalized('Επικοινωνία'),
        })}
        {renderSettingsType({ type: 'Αποσύνδεση' })}
      </View>
    </View>
  );
}

IMProfileSettings.propTypes = {};

export default IMProfileSettings;
