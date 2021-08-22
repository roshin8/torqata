export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

const initState = {
  authError: null,
  loading: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_FAILED:
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };
    case LOGIN_SUCCESS:
      console.log("login success");
      return {
        ...state,
        authError: null,
      };
    case LOGOUT_SUCCESS:
      console.log("signout success");
      return state;

    case SIGNUP_SUCCESS:
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };

    case SIGNUP_ERROR:
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message,
      };

    default:
      return state;
  }
};

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED, err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    // const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      // .then((resp) => {
      //   return firestore
      //     .collection("users")
      //     .doc(resp.user.uid)
      //     .set({
      //       firstName: newUser.firstName,
      //       lastName: newUser.lastName,
      //       initials: newUser.firstName[0] + newUser.lastName[0],
      //     });
      // })
      .then((resp) => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SIGNUP_ERROR, err });
      });
  };
};

export default authReducer;
