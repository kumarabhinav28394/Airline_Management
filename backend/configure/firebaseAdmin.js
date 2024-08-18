
const admin = require('firebase-admin');
const serviceAccount = require('../SAK.json'); // Adjust the path accordingly

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
