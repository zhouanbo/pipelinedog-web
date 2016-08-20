import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AltContainer from 'alt-container'

import Store from './store'
import Main from './components/main.jsx'

injectTapEventPlugin()

const App = () => (
  <MuiThemeProvider>
    <AltContainer store={Store}>
      <Main />
    </AltContainer>
  </MuiThemeProvider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)