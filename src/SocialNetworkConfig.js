import AppStyles from './AppStyles';
import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';
import { Platform } from 'react-native';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;

const SocialNetworkConfig = {
    isSMSAuthEnabled: false,
    adsConfig: {
      facebookAdsPlacementID: Platform.OS === 'ios' ? "834318260403282_834914470343661" : "834318260403282_834390467062728",
      adSlotInjectionInterval: 10
    },
    appIdentifier: 'rn-social-network-android',
    onboardingConfig: {
        welcomeTitle: IMLocalized('Καλώς ήρθες'),
        welcomeCaption: IMLocalized('Στην εφαρμογή της γειτονιάς σου'),
        walkthroughScreens: [
            {
                icon: require("../assets/images/file.png"),
                title: IMLocalized("Αναρτήσεις"),
                description: IMLocalized("Μοιράσου αναρτήσεις, φωτογραφίες και σχόλια με τους γείτονές σου")
            },
            {
                icon: require("../assets/images/like.png"),
                title: IMLocalized("Συμμετοχή"),
                description: IMLocalized("Κάνε like σε αναρτήσεις και φωτογραφίες και ")
            },
            {
                icon: require("../assets/images/chat.png"),
                title: IMLocalized("Συνομιλία"),
                description: IMLocalized("Επικοινώνησε με τους γείτονές σου με προσωπικά μηνύματα")
            },
            {
                icon: require("../assets/icons/friends-unfilled.png"),
                title: IMLocalized("Ομαδικές συνομιλίες"),
                description: IMLocalized("Επικοινώνησε σε ομαδικές συνομιλίες")
            },
            {
                icon: require("../assets/images/instagram.png"),
                title: IMLocalized("Στείλε φωτογραφίες και video"),
                description: IMLocalized("Στείλε φωτογραφίες και video σε άλλους γείτονες")
            },
 
            {
                icon: require("../assets/images/notification.png"),
                title: IMLocalized("Λάβε ειδοποιήσεις"),
                description: IMLocalized("Λάβε στο κινητό σου ειδοποιήσεις για νέα μηνύματα και σχόλια")
            }
        ]
    },
    tabIcons: {
        Feed: {
          focus: AppStyles.iconSet.homefilled,
          unFocus: AppStyles.iconSet.homeUnfilled,
        },
        Discover: {
          focus: AppStyles.iconSet.search,
          unFocus: AppStyles.iconSet.search,
        },
        Chat: {
          focus: AppStyles.iconSet.commentFilled,
          unFocus: AppStyles.iconSet.commentUnfilled,
        },
        Friends: {
          focus: AppStyles.iconSet.friendsFilled,
          unFocus: AppStyles.iconSet.friendsUnfilled,
        },
        Profile: {
          focus: AppStyles.iconSet.profileFilled,
          unFocus: AppStyles.iconSet.profileUnfilled,
        },
    },
    tosLink: "https://www.instamobile.io/eula-instachatty/",
    editProfileFields: {
      sections: [
        {
          title: IMLocalized("Δημόσιο προφίλ"),
          fields: [
            {
              displayName: IMLocalized("Όνομα"),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Το όνομά σας'
            },
            {
              displayName: IMLocalized("Επώνυμο"),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Το επώνυμό σας'
            }
          ]
        },
        {
          title: IMLocalized("ΠΡΟΣΩΠΙΚΕΣ ΠΛΗΡΟΦΟΡΙΕΣ"),
          fields: [
            {
              displayName: IMLocalized("E-mail Διεύθυνση"),
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'το email σας'
            },
            {
              displayName: IMLocalized("Τηλέφωνο"),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'ο τηλεφωνικός σας αριθμός'
            }
          ]
        }
      ]
    },
    userSettingsFields: {
      sections: [
        {
          title: IMLocalized("ΓΕΝΙΚΑ"),
          fields: [
            {
              displayName: IMLocalized("Επέτρεψε ειδοποιήσεις κινητού"),
              type: 'switch',
              editable: true,
              key: 'push_notifications_enabled',
              value: false,
            },
            {
              displayName: IMLocalized("Enable Face ID / Touch ID"),
              type: 'switch',
              editable: true,
              key: 'face_id_enabled',
              value: false
            }
          ]
        },
        {
          title: '',
          fields: [
            {
              displayName: IMLocalized("Αποθήκευση"),
              type: 'button',
              key: 'savebutton',
            }
          ]
        }
      ]
    },
    contactUsFields: {
      sections: [
        {
          title: IMLocalized("ΕΠΙΚΟΙΝΩΝΙΑ"),
          fields: [
            {
              displayName: IMLocalized("Διεύθυνση"),
              type: 'text',
              editable: false,
              key: 'push_notifications_enabled',
              value: "Πάντειο Πανεπιστήμιο, Λ. Συγγρού 136, Αθήνα",
            },
            {
              displayName: IMLocalized("Email"),
              value: 'info@geitonia.me',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address'
            }
          ]
        },
        {
          title: '',
          fields: [
            {
              displayName: IMLocalized("Κάλεσέ μας"),
              type: 'button',
              key: 'savebutton',
            }
          ]
        }
      ]
    },
    contactUsPhoneNumber: "2109201001"
};

export default SocialNetworkConfig;
