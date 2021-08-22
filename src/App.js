import React from "react";
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import "./scss/style.scss";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
// import fbConfig from 'config/fbConfig';
import ReactLoading from "react-loading";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "firebase/app";
import { isLoaded } from "react-redux-firebase";

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// Containers
const Layout = React.lazy(() => import("./containers/Layout"));
const Login = React.lazy(() => import("./containers/Login"));
const Register = React.lazy(() => import("./containers/Register"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div className="Login">
        <ReactLoading
          className="LoginLoading"
          type={"spin"}
          color={"#9050fe"}
          height={60}
          width={60}
        />
      </div>
    );
  return children;
}

export function GuardedRoute() {
  const isLoggedIn = useSelector((state) => state.firebase.auth.uid);
  return (
    <Switch>
      <Route
        path="/login"
        name="Login"
        render={(props) => <Login {...props} />}
      />
      <Route
        path="/register"
        name="Register"
        render={(props) => <Register {...props} />}
      />
      {!isLoggedIn ? (
        /*Redirect to `/login` when user is not authorized*/
        <Redirect to="/login" />
      ) : (
        <Route path="/" name="Home" render={(props) => <Layout {...props} />} />
      )}
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <React.Suspense fallback={loading}>
            <AuthIsLoaded>
              <GuardedRoute />
            </AuthIsLoaded>
          </React.Suspense>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
