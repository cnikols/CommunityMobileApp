import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { SearchBarAlternate } from '../../..';
import { IMUserSearchModal } from '../../../socialgraph/friendships';
import { TNStoriesTray } from '../../../truly-native';
import dynamicStyles from './styles';
import { IMConversationListView } from '../..';
import { IMLocalized } from '../../../localization/IMLocalization';

function IMChatHomeComponent(props) {
  const {
    friends,
    onSearchBarPress,
    onSearchTextChange,
    isSearchModalOpen,
    onSearchModalClose,
    searchData,
    onSearchBarCancel,
    onFriendItemPress,
    searchBarRef,
    onFriendAction,
    onSearchClear,
    navigation,
    appStyles,
    onSenderProfilePicturePress,
    onEmptyStatePress,
    followEnabled,
  } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const emptyStateConfig = {
    title: IMLocalized('Δεν υπάρχει ενεργή συνομιλία'),
    description: IMLocalized(
      'Βρες άλλους γείτονες και συνομίλησε μαζί τους. Οι συνομιλίες σου θα εμφανίζονται σε αυτή την οθόνη',
    ),
    onPress: onEmptyStatePress,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        
        <TNStoriesTray
          onStoryItemPress={onFriendItemPress}
          storyItemContainerStyle={styles.userImageContainer}
          data={friends}
          displayLastName={false}
          appStyles={appStyles}
          showOnlineIndicator={true}
        />
        <View style={styles.chatsChannelContainer}>
          <IMConversationListView
            navigation={navigation}
            appStyles={appStyles}
            emptyStateConfig={emptyStateConfig}
          />
        </View>
      </ScrollView>
      <IMUserSearchModal
        onSearchBarCancel={onSearchBarCancel}
        onSearchClear={onSearchClear}
        data={searchData}
        onFriendItemPress={onFriendItemPress}
        onSearchTextChange={onSearchTextChange}
        onAddFriend={onFriendAction}
        isModalOpen={isSearchModalOpen}
        onClose={onSearchModalClose}
        searchBarRef={searchBarRef}
        appStyles={appStyles}
        followEnabled={followEnabled}
      />
    </View>
  );
}

IMChatHomeComponent.propTypes = {
  onSearchClear: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onFriendAction: PropTypes.func,
  onSearchBarPress: PropTypes.func,
  onSearchBarCancel: PropTypes.func,
  onSearchTextChange: PropTypes.func,
  onSearchModalClose: PropTypes.func,
  channels: PropTypes.array,
  searchData: PropTypes.array,
  isSearchModalOpen: PropTypes.bool,
  searchBarRef: PropTypes.object,
};

export default IMChatHomeComponent;
