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

  dispatchEnterMain() {
    Actions.enterMain()
  }
  dispatchProjectUpload(file) {
    Actions.projectUpload(file)
  }
  dispatchStepUpload(file) {
    Actions.stepUpload(file)
  }
  dispatchProjectCreate() {
    Actions.projectCreate()
  }
  dispatchProjectSave() {
    Actions.projectSave()
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
  dispatchSortStep() {
    Actions.sortStep()
  }
  dispatchDeleteStep(index) {
    Actions.deleteStep(index)
  }
  dispatchEditorChange(newText) {
    Actions.editorChange(newText)
  }
  dispatchExportPipeline() {
    Actions.exportPipeline()
  }
  dispatchTabChange(value) {
    Actions.tabChange(value)
  }

  render() {
    return (
      <div id="container" style={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>

        <div id="header" style={{flex: "0 0 auto", zIndex: 99}}>
          <PdAppBar 
            enterMain={this.props.enterMain} 
            dispatchProjectCreate={this.dispatchProjectCreate}
            dispatchProjectSave={this.dispatchProjectSave}
            dispatchExportPipeline={this.dispatchExportPipeline}
            export={this.props['export']}
            save={this.props.save}
          />
        </div>

        {this.props.enterMain ? 

        <div id="content" style={{flex: "1 1 auto", display: "flex", alignItems: "stretch"}}>
          
          <Paper style={{flex: "0 0 25%", overflowY: "scroll"}} zDepth={0}>
            <PdStepList
              steps={this.props.steps}
              dispatchStepChange={this.dispatchStepChange}
              dispatchCreateStep={this.dispatchCreateStep}
              dispatchDeleteStep={this.dispatchDeleteStep}
              dispatchSortStep={this.dispatchSortStep}
              editing={this.props.editing}
            />
          </Paper>

          <Paper style={{flex: "1 1 auto", zIndex: 9}} zDepth={1}>
            <Tabs value={this.props.tab} onChange={this.dispatchTabChange}>
              <Tab 
                icon={<FontIcon className="material-icons">edit</FontIcon>}
                label="Editor"
                value={0}
              >
                <PdEditorToolBar 
                  name={this.getEditorName(this.props.editing)}
                  text={this.getEditorText(this.props.editing)}
                  dispatchStepUpload={this.dispatchStepUpload}
                  tab={this.props.tab}
                />
                <div id="editor" style={{overflowY: "scroll"}}>
                  <PdEditor
                    text={this.getEditorText(this.props.editing)}
                    onChange={this.dispatchEditorChange} 
                  />
                </div>
              </Tab>
             
              <Tab 
                icon={<FontIcon className="material-icons">code</FontIcon>}
                label="Command"
                value={1}
                style={this.props.editing < 0 ? {display: "none"} : {}} 
              >
                <PdEditorToolBar 
                  name={this.getEditorName(this.props.editing)}
                />
                <Paper zDepth={0} style={{padding: 8}}>
                  <pre className="codeblock" style={{margin: 0}}>
                    {this.props.editing > -1 ? this.props.steps[this.props.editing].command : "Not Applicable"}
                  </pre>
                </Paper>
              </Tab>

              <Tab 
                icon={<FontIcon className="material-icons">insert_drive_file</FontIcon>}
                label="Output" 
                value={2}
                style={this.props.editing < 0 ? {display: "none"} : {}}
              >
                <PdEditorToolBar 
                  name={this.getEditorName(this.props.editing)}
                />
                <Paper zDepth={0} style={{padding: 8}}>
                  <pre className="codeblock" style={{margin: 0}}>
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
            dispatchEnterMain={this.dispatchEnterMain}
            dispatchProjectUpload={this.dispatchProjectUpload}
            dispatchListUpload={this.dispatchListUpload}
          />
        </Paper>
        }
        
        <Paper id="footer" style={{height: 50, background: "#F5F5F5", zIndex: 10}} zDepth={2}>
          <Subheader>
            2016 PipelineDog
          </Subheader>
        </Paper>
      </div>
    )
  }
}

export default Main