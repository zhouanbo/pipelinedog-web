import React from 'react'
import yaml from 'js-yaml'
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

  getEditorText(index) {
    if (index === -2) {
      return this.props.flist
    } else if (index === -1) {
      return this.props.gvar
    } else {
      return 'code' in this.props.steps[index] ? this.props.steps[index].code : ""
    }
  }
  getEditorName(index) {
    if (index === -2) {
      return "List File"
    } else if (index === -1) {
      return "Global Variables"
    } else {
      return this.props.steps[index].name
    }
  }

  dispatchInit() {
    Actions.init()
  }
  dispatchSessionUpload(file) {
    Actions.sessionUpload(file)
  }
  dispatchSaveSession() {
    Actions.saveSession()
  }
  dispatchListUpload(file) {
    Actions.listUpload(file)
  }
  dispatchStepChange(index) {
    Actions.stepChange(index)
  }
  dispatchCreateStep() {
    Actions.createStep()
  }
  dispatchDeleteStep(index) {
    Actions.deleteStep(index)
  }
  dispatchEditorChange(newText) {
    Actions.editorChange(newText)
  }

  render() {
    return (
      <div id="container" style={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>

        <div id="header" style={{flex: "0 0 auto", zIndex: 99}}>
          <PdAppBar init={this.props.init} dispatchSaveSession={this.dispatchSaveSession}/>
        </div>

        {this.props.init ? 

        <div id="content" style={{flex: "1 1 auto", display: "flex", alignItems: "stretch"}}>
          
          <Paper style={{flex: "0 0 25%"}} zDepth={0}>
            <PdStepList
              steps={this.props.steps}
              dispatchStepChange={this.dispatchStepChange}
              dispatchCreateStep={this.dispatchCreateStep}
              dispatchDeleteStep={this.dispatchDeleteStep}
              editing={this.props.editing}
            />
          </Paper>

          <Paper style={{flex: "1 1 auto"}} zDepth={1}>
            <Tabs>

              <Tab 
                icon={<FontIcon className="material-icons">edit</FontIcon>}
                label="Editor"
              >
                <PdEditorToolBar 
                  name={this.getEditorName(this.props.editing)}
                />
                <div id="editor" style={{overflow: "scroll"}}>
                  <PdEditor
                    text={this.getEditorText(this.props.editing)}
                    onChange={this.dispatchEditorChange} 
                  />
                </div>
              </Tab>
             
              <Tab 
                icon={<FontIcon className="material-icons">code</FontIcon>}
                label="Command" 
              >
                <Paper zDepth={0} style={{padding: 8}}>
                  <pre className="codeblock">
                    {this.props.editing > -1 ? this.props.steps[this.props.editing].command : "Not Applicable"}
                  </pre>
                </Paper>
              </Tab>

              <Tab 
                icon={<FontIcon className="material-icons">insert_drive_file</FontIcon>}
                label="Output" 
              >
                <Paper zDepth={0} style={{padding: 8}}>
                  <pre className="codeblock">
                    {this.props.editing > -1 && this.props.steps[this.props.editing].out ? yaml.safeDump(this.props.steps[this.props.editing].out) : "Not Applicable"}
                  </pre>
                </Paper>
              </Tab>

            </Tabs>
          </Paper>         
        </div>

        :

        <Paper id="welcome" style={{flex: "1 1 auto", display: "flex", alignItems: "stretch"}}>
          <PdWelcome 
            dispatchInit={this.dispatchInit}
            dispatchSessionUpload={this.dispatchSessionUpload}
            dispatchListUpload={this.dispatchListUpload}
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