import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { crashReporter } from './services/sentry';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = preloadedState => {
  const middlewares = [logger, thunk, crashReporter];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );

  // Set up reducer hot reloading
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  const persistor = persistStore(store);

  return { store, persistor };
};

const { store, persistor } = configureStore();

export { configureStore, store, persistor };
