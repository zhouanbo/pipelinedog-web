import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();
ReactDOM.render(
  <MuiThemeProvider><RaisedButton label="Default" /></MuiThemeProvider>,
  document.getElementById('main')
);