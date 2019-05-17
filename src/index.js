import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({});

ReactDOM.render(<ThemeProvider theme={theme}><Root /></ThemeProvider>, document.getElementById('root'));
