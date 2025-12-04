import firebase from 'react-native-firebase';

const notificationsRef = firebase
    .firestore()
    .collection('notifications');

const fcmURL = "https://fcm.googleapis.com/fcm/send";
const firebaseServerKey = "AAAAPcbWUZw:APA91bFFIddPbXX-cQCKY7cJay7Btt9RrzsYMdGtjzQpbZvqCioPmcxsJv_VpgZMaJBmJBcn0KoahVK0gqEV6j0hIqzPxYLWbqNEnQC-9t06eoYw8mJSHJ14iBRRpjucLyTSJEFZ2mkt";

const sendPushNotification = async (toUser, title, body, type, metadata = {}) => {
    if (metadata && metadata.fromUser && toUser.id == metadata.fromUser.id) {
        return;
    }
    const notification = {
        toUserID: toUser.id,
        title,
        body,
        metadata,
        toUser,
        type,
        seen: false,
    };

    const ref = await notificationsRef.add({
        ...notification,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    notificationsRef.doc(ref.id).update({ id: ref.id });
    if (!toUser.pushToken) {
        return;
    }

    const pushNotification = {
        to: toUser.pushToken,
        notification: {
            title: title,
            body: body
        },
        data: { ...metadata, type, toUserID: toUser.id }
    };
    fetch(fcmURL, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'key=' + firebaseServerKey,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(pushNotification)
    })
}

export const notificationManager = {
    sendPushNotification
};