const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Se inicializa una sola vez, aunque el archivo se importe desde varios lugares.
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

module.exports = db;