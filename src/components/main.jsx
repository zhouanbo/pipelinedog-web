import React from 'react'
import yaml from 'js-yaml'
import Actions from '../actions'

import FontIcon from 'material-ui/FontIcon'
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import firebase from 'firebase'

import PdWelcome from './pdWelcome.jsx'
import PdAppBar from './pdAppBar.jsx'
import PdEditor from './pdEditor.jsx'
import PdEditorToolBar from './pdEditorToolBar.jsx'
import PdStepList from './pdStepList.jsx'

class Main extends React.Component {
  
  constructor(props) {
    super(props)

    const config = {
      apiKey: "AIzaSyAv1vpgS7QiY5Uf1nBhWpW3VAg-JcUwvYI",
      authDomain: "pipeline-dog.firebaseapp.com",
      databaseURL: "https://pipeline-dog.firebaseio.com",
      storageBucket: "pipeline-dog.appspot.com",
      messagingSenderId: "980858736788"
    }
    firebase.initializeApp(config)
  }

  getEditorText(index) {
    if (index <= -2) {
      return this.props.flists[index*-1-2].content ? this.props.flists[index*-1-2].content : ""
    } else if (index === -1) {
      return this.props.gvar
    } else {
      return this.props.steps[index].code ? this.props.steps[index].code : ""
    }
  }
  getEditorName(index) {
    if (index <= -2) {
      return this.props.flists[index*-1-2].name ? this.props.flists[index*-1-2].name : ""
    } else if (index === -1) {
      return "Global Variables"
    } else {
      return this.props.steps[index].name ? this.props.steps[index].name : "Unnamed Step"
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
  dispatchCreateList(name) {
    Actions.createList(name)
  }
  dispatchSortStep() {
    Actions.sortStep()
  }
  dispatchDeleteStep(index) {
    Actions.deleteStep(index)
  }
  dispatchEditorParse(text) {
    Actions.editorParse(text)
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
  dispatchExportClose() {
    Actions.exportClose()
  }
  dispatchSetError(error) {
    Actions.setError(error)
  }

  render() {
    return (
      <div id="container" style={{display: "flex", flexDirection: "column", alignItems: "stretch"}}>

        <div id="header" style={{flex: "0 0 auto", zIndex: 99}}>
          <PdAppBar 
            version={this.props.version}
            enterMain={this.props.enterMain}
            dispatchProjectCreate={this.dispatchProjectCreate}
            dispatchProjectSave={this.dispatchProjectSave}
            dispatchExportPipeline={this.dispatchExportPipeline}
            exportOpen={this.props.exportOpen}
            dispatchExportClose={this.dispatchExportClose}
            export={this.props['export']}
            save={this.props.save}
          />
        </div>

        {this.props.enterMain ? 

        <div id="content" style={{flex: "1 1 auto", display: "flex", alignItems: "stretch"}}>
          
          <Paper style={{flex: "0 0 25%", overflowY: "scroll", overflowX: "hidden"}} zDepth={0}>
            <PdStepList
              steps={this.props.steps}
              flists={this.props.flists}
              dispatchStepChange={this.dispatchStepChange}
              dispatchCreateStep={this.dispatchCreateStep}
              dispatchCreateList={this.dispatchCreateList}
              dispatchDeleteStep={this.dispatchDeleteStep}
              dispatchDeleteList={this.dispatchDeleteList}
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
                  dispatchEditorParse={this.dispatchEditorParse}
                  dispatchEditorChange={this.dispatchEditorChange}
                  dispatchEditorParse={this.dispatchEditorParse}
                  tab={this.props.tab}
                  firebase={firebase}
                />
                <PdEditor
                  ref="editorWrap"
                  text={this.getEditorText(this.props.editing)}
                  onChange={this.dispatchEditorChange} 
                />
              </Tab>
             
              <Tab 
                icon={<FontIcon className="material-icons">code</FontIcon>}
                label="Command"
                value={1}
                style={this.props.editing < 0 ? {display: "none"} : {}} 
              >
                <PdEditorToolBar 
                  name={this.getEditorName(this.props.editing)}
                  text={this.getEditorText(this.props.editing)}
                  dispatchStepUpload={this.dispatchStepUpload}
                  dispatchEditorParse={this.dispatchEditorParse}
                  tab={this.props.tab}
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
                  text={this.getEditorText(this.props.editing)}
                  dispatchStepUpload={this.dispatchStepUpload}
                  dispatchEditorParse={this.dispatchEditorParse}
                  tab={this.props.tab}
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

        <Dialog
          actions={[
            <FlatButton
              label="OK"
              primary={true}
              onTouchTap={this.dispatchSetError.bind(this, {show: false, type: "", message: ""})}
            />
          ]}
          modal={false}
          open={this.props.error.show}
          onRequestClose={this.dispatchSetError.bind(this, {show: false, type: "", message: ""})}
        >
          <Subheader style={{color: "red"}}>{this.props.error.type}</Subheader>
          <p style={{padding: "0px 25px"}}>{this.props.error.message}</p>
        </Dialog>
        
        <Paper id="footer" style={{width: "100%", height: 50, background: "#F5F5F5", zIndex: 10}} zDepth={2}>
          <Subheader>
            2016 PipelineDog
          </Subheader>
        </Paper>
      </div>
    )
  }
}

export default Main