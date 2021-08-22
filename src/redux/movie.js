import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getPublishedBooksNext = createAsyncThunk(
  "adminApp/publishedBooks/getPublishedBooksNext",
  async (params, { dispatch, getState, getFirebase, getFirestore }) => {
    // const { publishedBooks } = getState().adminApp;
    const firebase = getFirebase();
    console.log("HERE!!!!!!!!!!!!!!!!!!!!!!!")
    try {
      // const lastDocRef = await firebase.doc(`catalog/${publishedBooks.lastDocId}`).get();

      const snap = await firebase
        .collection("movies")
        // .orderBy('lastPublish', 'desc')
        // .startAfter(lastDocRef)
        .limit(10)
        .get();
      console.log("snap:", snap)
      // const lastDoc = snap.docs[snap.docs.length-1];
      let books = [];
      // dispatch(setLastDocId(lastDoc.id));
      snap.forEach((bookDoc) => {
        const id = bookDoc.id;
        const data = bookDoc.data();
        const lastPublish = data.lastPublish.toDate().toISOString();
        books.push({ ...data, id, lastPublish });
      });

      return books;
    } catch (error) {
      return {};
    }
  }
);
