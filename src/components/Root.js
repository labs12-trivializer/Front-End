import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Router } from 'react-router-dom';
import history from '../history';
import { ToastContainer } from 'react-toastify';
import { store, persistor } from '../store';
import AppRoot from './AppRoot';

const Root = () => (
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <PersistGate loading={null} persistor={persistor}>
      <DragDropContextProvider backend={HTML5Backend}>
        <Router history={history}>
          <AppRoot />
        </Router>
      </DragDropContextProvider>
    </PersistGate>
  </Provider>
);

export default Root;
