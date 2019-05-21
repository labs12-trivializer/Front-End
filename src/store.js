<<<<<<< HEAD
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { crashReporter } from './services/sentry';
=======
import { createStore, applyMiddleware } from 'redux';
// import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { crashReporter } from './services/sentry';
>>>>>>> 528fc26356f3898576e7fde652a2df86deaefa0b
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(
    persistedReducer,
<<<<<<< HEAD
    // composeWithDevTools(applyMiddleware(thunk, logger, crashReporter))
    compose(applyMiddleware(thunk, logger, crashReporter))
=======
    // compose(applyMiddleware(thunk, logger, crashReporter))
    composeWithDevTools(applyMiddleware(thunk))
>>>>>>> 528fc26356f3898576e7fde652a2df86deaefa0b
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

const { store, persistor } = configureStore();

export { configureStore, store, persistor }