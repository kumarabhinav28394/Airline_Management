
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';



const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "airline-management-3ba48.firebaseapp.com",
  projectId: "airline-management-3ba48",
  storageBucket: "airline-management-3ba48.appspot.com",
  messagingSenderId: "808578428178",
  appId: "1:808578428178:web:13e27942ef147d47d157cb",
  measurementId: "G-G70ZH5WTE6"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: process.env.REACT_APP_vapidKey })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
