import React from 'react'
import Actions from '../actions'

import FontIcon from 'material-ui/FontIcon'
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

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

  componentDidMount() {
    //Set editor height
    const setEditorSize = () => {
      document.getElementById('editor').style.height=Number(document.getElementById('container').offsetHeight-64-56-72-50)+"px"
    }
    setEditorSize();
    window.addEventListener("resize", setEditorSize);
  }

  render() {
    return (
      <div id="container" style={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>

        <div id="header" style={{flex: "0 0 auto", zIndex: 99}}>
          <PdAppBar />      
        </div>

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
        
        <Paper id="footer" style={{height: 50, background: "#F5F5F5"}} zDepth={2}>
          <Subheader>
            2016 Coded by Anbo Zhou
          </Subheader>
        </Paper>
      </div>
    )
  }
}

export default Main