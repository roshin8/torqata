
const firebase = require("firebase");
let jsonData = require('./movies.json');
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
  });
  
var db = firebase.firestore();


 jsonData.forEach(function(obj) {
    db.collection("movies").add({
        show_id: obj.show_id,
        type: obj.type,
        title: obj.title,
        director: obj.director,
        cast: obj.cast,
        country: obj.country,
        date_added: obj.date_added,
        release_year: obj.release_year,
        rating: obj.rating,
        duration: obj.duration,
        listed_in: obj.listed_in,
        description: obj.description,
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});
