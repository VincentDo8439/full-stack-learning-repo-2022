var admin = require("firebase-admin");

var serviceAccount = require("./cred.json");

var { getStorage } = require("firebase-admin/storage");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://todo-app-bb57a.appspot.com/",
});

var storage = getStorage();

const firestore = admin.firestore();
module.exports = { firestore, storage };
