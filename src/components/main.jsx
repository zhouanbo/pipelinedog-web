import React from 'react'
import Actions from '../actions'

import FontIcon from 'material-ui/FontIcon'
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import PdWelcome from './pdWelcome.jsx'
import PdAppBar from './pdAppBar.jsx'
import PdEditor from './pdEditor.jsx'
import PdEditorToolBar from './pdEditorToolBar.jsx'
import PdStepList from './pdStepList.jsx'

class Main extends React.Component {
  
  constructor(props) {
    super(props)
  }

  updateText() {
    Actions.updateText("Bye W")
  }

  setInit() {
    Actions.setInit();
  }

  render() {
    return (
      <div id="container" style={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>

        <div id="header" style={{flex: "0 0 auto", zIndex: 99}}>
          <PdAppBar init={this.props.init} />
        </div>

        {this.props.init ? 

        <div id="content" style={{flex: "1 1 auto", display: "flex", alignItems: "stretch"}}>
          
          <Paper style={{flex: "0 0 25%"}} zDepth={0}>
            <PdStepList />
          </Paper>

          <Paper style={{flex: "1 1 auto"}} zDepth={1}>
            <Tabs>

              <Tab 
                icon={<FontIcon className="material-icons">edit</FontIcon>}
                label="Editor"
              >
                <PdEditorToolBar />
                <div id="editor" style={{overflow: "scroll"}}>
                  <PdEditor
                    value="Hello" 
                    onChange={function(){}} 
                  />
                </div>
              </Tab>
             
              <Tab 
                icon={<FontIcon className="material-icons">code</FontIcon>}
                label="Command" 
              >
                  
              </Tab>

              <Tab 
                icon={<FontIcon className="material-icons">insert_drive_file</FontIcon>}
                label="Output" >
                  {this.props.text}
              </Tab>

            </Tabs>
          </Paper>         
        </div>

        :

        <Paper id="welcome" style={{flex: "1 1 auto", display: "flex", alignItems: "stretch"}}>
          <PdWelcome 
            setInit={this.setInit}
          />
        </Paper>
        }
        
        <Paper id="footer" style={{height: 50, background: "#F5F5F5"}} zDepth={2}>
          <Subheader>
            2016 PipelineDog
          </Subheader>
        </Paper>
      </div>
    )
  }
}

export default Main