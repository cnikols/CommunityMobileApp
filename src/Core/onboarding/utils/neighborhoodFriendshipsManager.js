import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { firebasePost } from '../../socialgraph/feed/firebase';
import { firebaseUser } from '../../firebase';


const friendshipsRef = firebase
    .firestore()
    .collection("friendships");

const swipesRef = firebase
    .firestore()
    .collection("swipes");

const channelsRef = firebase
    .firestore()
    .collection("channels");

const channelPaticipationRef = firebase
    .firestore()
    .collection("channel_participation");

const usersRef = firebase
    .firestore()
    .collection("users");


const creatingNewNeighborhood = (newUser) => {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const newUserID = newUser.id;
      const newUserLatitude = newUser.neighborhoodBoundaries.latitude;
      const newUserLatitudeDelta = newUser.neighborhoodBoundaries.latitudeDelta;
      const newUserLongitude = newUser.neighborhoodBoundaries.longitude;
      const newUserLongitudeDelta = newUser.neighborhoodBoundaries.longitudeDelta;

      

      const NewUserfullLong = newUserLongitude + newUserLongitudeDelta;
      const RangeNewUser = distanceBetween2Points (newUserLatitude, newUserLongitude, newUserLatitude, NewUserfullLong, 'Κ'); 
  
      let query = usersRef.orderBy('createdAt', 'desc');
  
        query.get().then(querySnapshot => {
          console.log(" ------------------------- before loop start log-timestamp ------------------------- ");
            let users = querySnapshot.docs;
            var  NEWfriends = [];
            for (let user of users) {
                    const oldUserID = user.id;
                    const dataOldUser = user.data();
  
                    if ((dataOldUser.neighborhoodBoundaries)){
                          if (newUserID != oldUserID) {
                                    const oldUserLatitude = dataOldUser.neighborhoodBoundaries.latitude;
                                    const oldUserLatitudeDelta = dataOldUser.neighborhoodBoundaries.latitudeDelta;
                                    const oldUserLongitude = dataOldUser.neighborhoodBoundaries.longitude;
                                    const oldUserLongitudeDelta = dataOldUser.neighborhoodBoundaries.longitudeDelta;
  
                                    const oldUserfullLong = oldUserLongitude + oldUserLongitudeDelta;
  
                                    const RangeOldUser = distanceBetween2Points (oldUserLatitude, oldUserLongitude, oldUserLatitude, oldUserfullLong, 'Κ');             
                                    const distanceBetweenUsers  = distanceBetween2Points (newUserLatitude, newUserLongitude, oldUserLatitude, oldUserLongitude, 'Κ'); 
                                    
                                    if ((distanceBetweenUsers <= RangeNewUser) && (distanceBetweenUsers <= RangeOldUser)){
                                              // Adding friendships
                                              friendshipsRef.add({
                                                  user1: newUserID,
                                                  user2: oldUserID,
                                                  created_at: timestamp,
                                                  createdAt: timestamp,
                                              });
                  
                                              friendshipsRef.add({
                                                  user1: oldUserID,
                                                  user2: newUserID,
                                                  created_at: timestamp,
                                                  createdAt: timestamp,
                                              });
                                              // increase inboundFriendsCount in both users 

                                              // Adding a match with the new neighborhood
                                              swipesRef
                                                  .add({
                                                      author: newUserID,
                                                      swipedProfile: oldUserID,
                                                      type: "like",
                                                      hasBeenSeen: false,
                                                      created_at: timestamp,
                                                      createdAt: timestamp,
                                                  });
                                                  
                                              swipesRef
                                                  .add({
                                                      author: oldUserID,
                                                      swipedProfile: newUserID,
                                                      type: "like",
                                                      hasBeenSeen: false,
                                                      created_at: timestamp,
                                                      createdAt: timestamp,
                                                  });
                                              // Adding all friends
                                              NEWfriends.push(oldUserID);    
                                              console.log("add friendships between old and new user log-timestamp");    
                                    }
                          }
                    }
            }

            // setTimeout(function(){
            //     //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            //     //Alert.alert("Atention", "Please do not close the app until the system brings your neighbors.");
            //     Alert.alert("Προσοχή!", "Η εφαρμογή GEITONIA ολοκλήρωσε την ευρεση των γειτόνων σας και ακολουθεί η ευρεσή των ποστ. Μην πειράξετε την οθόνη και μην σταματήσετε την διαδικασια.");
            // }, 50000);
            
            console.log(" ------------------------- end loop log-timestamp ------------------------- ");
            neighborhoodUpdateFriendshipsCounts(newUserID);  
            firebasePost.hydrateFeedForFriends(newUserID, NEWfriends);
            
        });
  }




const distanceBetween2Points = (lat1, lon1, lat2, lon2, unit) => {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else { 
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist;
  }
  
}

const neighborhoodUpdateFriendshipsCounts = async (userID) => {
    // inbound
    const inbound =
      await friendshipsRef
        .where('user2', '==', userID)
        .get();
    const inboundCount = (inbound.docs ? inbound.docs.length : 0);
    firebaseUser.updateUserData(userID, { inboundFriendsCount: inboundCount });
  
    // outbound 
    const outbound =
      await friendshipsRef
        .where('user1', '==', userID)
        .get();
        // to parapano einai to query sta data

    const outboundCount = (outbound.docs ? outbound.docs.length : 0);
                                        //ayto edo einai to periexomeno ton data
    firebaseUser.updateUserData(userID, { outboundFriendsCount: outboundCount });
  }



const neighborhoodManager = {
    creatingNewNeighborhood
};



export default neighborhoodManager;

