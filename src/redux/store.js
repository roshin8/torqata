import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer.js';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from 'config/fbConfig'


const persistConfig = {
  key: 'root',
  storage: storage,
}

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
if (process.env.REACT_APP_SOPHIA_ENV !== `production`) {
  middlewares.push(logger);
}

// Using Redux Persist to persist State
const persistedReducer = persistReducer(persistConfig, rootReducer)
// Redux DevTools enable Trace
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 50 })


// Export store and persistor
// export const store = createStore(
//   persistedReducer,
//   composeEnhancers(applyMiddleware(...middlewares))
// )

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)


export const persistor = persistStore(store)
