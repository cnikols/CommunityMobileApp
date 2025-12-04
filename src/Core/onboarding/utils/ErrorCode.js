import { IMLocalized } from '../../localization/IMLocalization';

export const ErrorCode = {
    passwordInUse: 'passwordInUse',
    badEmailFormat: 'badEmailFormat',
    emailInUse: 'emailInUse',
    invalidPassword: 'invalidPassword',
    noUser: 'noUser',
    rateLimited: 'rateLimited',
    serverError: 'serverError',
    photoUploadFailed: 'photoUploadFailed',
    fbAuthCancelled: 'fbAuthCancelled',
    fbAuthFailed: 'fbAuthFailed',
    RNFBSDKAuthFailed: 'RNFBSDKAuthFailed',
    firebaseFBAuthFailed: 'firebaseFBAuthFailed',
    noFirebaseUserError: 'noFirebaseUserError',
    googleAuthFailed: 'googleAuthFailed',
    appleAuthFailed: 'appleAuthFailed',
    smsNotSent: 'smsNotSent',
    invalidSMSCode: 'invalidSMSCode'
};

export const localizedErrorMessage = errorCode => {
    switch (errorCode) {
        case ErrorCode.passwordInUse:
            return IMLocalized('Ο κωδικός είναι μη έγκυρος');
        case ErrorCode.badEmailFormat:
            return IMLocalized('To email δεν έχει τη σωστή μορφή');
        case ErrorCode.emailInUse:
            return IMLocalized('Αυτός ο λογαριασμός e-mail χρησιμοποιείται ήδη');
        case ErrorCode.invalidPassword:
            return IMLocalized('Μη έγκυρος κωδικός');
        case ErrorCode.noUser:
            return IMLocalized('Δεν υπάρχει χρήστης με αυτό το αναγνωριστικό. Ο χρήστης μπορεί να έχει διαγραφεί');
        case ErrorCode.rateLimited:
            return IMLocalized('Παρά πολλές αποτυχημένες προσπάθειες σύνδεσης');
        case ErrorCode.serverError:
            return IMLocalized('O server παρουσίασε ένα πρόβλημα και δεν είναι εφικτή η επεξεργασία του αιτήματος σας');
        case ErrorCode.photoUploadFailed:
            return IMLocalized('Πρόβλημα στην φόρτωση της φωτογραφίας προφίλ');
        case ErrorCode.fbAuthCancelled:
            return IMLocalized('Δεν δόθηκαν τα δικαιώματα πιστοποίησης από τον Facebook λογαριασμό σας');
        case ErrorCode.fbAuthFailed:
            return IMLocalized('Δεν ήταν δυνατή η πιστοποίηση με τον Facebook λογαριασμό σας');
        case ErrorCode.RNFBSDKAuthFailed:
            return IMLocalized('Δεν πραγματοποιήθηκε παράδοση δικαιωμάτων πιστοποίησης από τον Facebook λογαριασμό σας');
        case ErrorCode.firebaseFBAuthFailed:
            return IMLocalized('Δεν ήταν εφικτή η πιστοποίηση του Facebook λογαριασμό σας με την βάση δεδομένων της εφαρμογής');
        case ErrorCode.noFirebaseUserError:
            return IMLocalized('Βρέθηκε το ID στην βάση δεδομένων αλλά δεν υπάρχουν στοιχεία για τον χρήστη.');
        case ErrorCode.googleAuthFailed:
            return IMLocalized('Δεν ήταν δυνατή η πιστοποίηση με τον Google λογαριασμό σας');
        case ErrorCode.appleAuthFailed:
            return IMLocalized('Δεν ήταν δυνατή η πιστοποίηση με τον Apple λογαριασμό σας');
        case ErrorCode.smsNotSent:
            return IMLocalized('Τo SMS δεν εστάλη. Παρακαλώ προσπαθήστε πάλι');
        case ErrorCode.invalidSMSCode:
            return IMLocalized('The verification code is invalid. Please try again.');
        default:
            return IMLocalized('Ένα πρόβλημα προέκυψε κατά τη σύνδεσή σας. Παρακαλώ προσπαθήστε πάλι');
    }
}
