import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { lightBlue500, lightBlue700 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AltContainer from 'alt-container'

import Store from './store'
import Main from './components/main.jsx'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue700,
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AltContainer store={Store}>
      <Main />
    </AltContainer>
  </MuiThemeProvider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)