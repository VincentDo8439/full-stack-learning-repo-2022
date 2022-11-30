var admin = require("firebase-admin");
var serviceAccount = require("./cred.json");

// Load Credentials
var { getStorage } = require("firebase-admin/storage");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://todo-app-bb57a.appspot.com/",
});
var bucket = getStorage().bucket();

module.exports = bucket;
