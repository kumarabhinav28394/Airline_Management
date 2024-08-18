

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD5HYuiN2DZibQo1bmPIqzicVLSpcvE17E",
    authDomain: "airline-management-3ba48.firebaseapp.com",
    projectId: "airline-management-3ba48",
    storageBucket: "airline-management-3ba48.appspot.com",
    messagingSenderId: "808578428178",
    appId: "1:808578428178:web:13e27942ef147d47d157cb",
    measurementId: "G-G70ZH5WTE6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // Make sure this icon path is correct and accessible
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
