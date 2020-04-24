import * as firebase from "firebase/app";
import "firebase/messaging";
import "firebase/analytics";

const initializedFirebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "lubventos.firebaseapp.com",
    databaseURL: "https://lubventos.firebaseio.com",
    projectId: "lubventos",
    storageBucket: "lubventos.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const analytics =firebase.analytics();

const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(process.env.REACT_APP_PUBLIC_VAPID_KEY);

export { messaging, analytics };

export function requestNotification() {
    
    if (Notification.permission === "granted") {
        
    } else {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('Notification permission granted.');
            } else {
              console.log('Unable to get permission to notify.');
            }
        });
    }
}

export function getToken(messaging) {

    messaging
        .getToken()
        .then((currentToken) => {

            if (currentToken) {
                console.log(currentToken);
            } else {
                console.log('No Instance ID token available. Request permission to generate one.');
            }

        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });

}