import React from 'react'
import Actions from '../actions'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import PdAppBar from './pdAppBar.jsx'
import PdEditor from './pdEditor.jsx'
import PdEditorToolBar from './pdEditorToolBar.jsx'
import PdStepList from './pdStepList.jsx'

class Main extends React.Component {
  
  updateText() {

    Actions.updateText("Bye W")
  }

  componentDidMount() {
    //Set edior height
    const setEditorSize = () => {
      document.getElementById('editor').style.height=Number(document.getElementById('container').offsetHeight-168-50)+"px"
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

          <Paper style={{flex: "1 1 auto"}} zDepth={2}>
            <Tabs>
              <Tab label="Editor">
                <PdEditorToolBar />
                <div id="editor" style={{overflow: "scroll"}}>
                  <PdEditor
                    value="Hello" 
                    onChange={function(){}} 
                  />
                </div>
              </Tab>
              <Tab label="Command" >
                  
              </Tab>
              <Tab label="Output" >
                  {this.props.text}
              </Tab>
            </Tabs>
          </Paper>         
        </div>
        
        <Paper id="footer" style={{height: 50, background: "#F5F5F5"}}>
          <Subheader>
            2016 Anbo Zhou
          </Subheader>
        </Paper>
      </div>
    )
  }
}

export default Main