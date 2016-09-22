import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AltContainer from 'alt-container'

import Store from './store'
import Main from './components/main.jsx'

import {brown400, purple400} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: brown400,
    accent1Color: purple400,
  },
})

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