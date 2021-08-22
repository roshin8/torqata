const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

const APP_ID = functions.config().algolia.appid;
const ADMIN_KEY = functions.config().algolia.apikey;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex("movies");

exports.addToIndex = functions.firestore
  .document("movies/{movieId}")

  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    return index.addObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore
  .document("movies/{movieId}")

  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document("movies/{movieId}")

  .onDelete((snapshot) => index.deleteObject(snapshot.id));

