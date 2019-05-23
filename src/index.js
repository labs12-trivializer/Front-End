import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({});

const renderApp = () =>
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>,
    document.getElementById('root')
  );

// Set up component hot reloading
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/Root', renderApp);
}

renderApp();
