import React from 'react'
import DropZone from 'react-dropzone'

import { Step, Stepper, StepButton } from 'material-ui/Stepper'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

export default class PdWelcome extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectDropText: "Drop your project file or click to select."
    }
    this.handleStart = this.handleStart.bind(this)
    this.handleExample = this.handleExample.bind(this)
    this.handleProjectDrop = this.handleProjectDrop.bind(this)
  }

  handleStart() {
    this.props.dispatchEnterMain()
  }

  handleExample() {
    this.props.dispatchEnterExample()
  }

  handleProjectDrop(files) {
    this.setState({projectDropText: "Uploaded Sucessfully: "+files[0].name})
  }

  getContent(stepIndex) {
    return (
      <Paper zDepth={0}>
        <h2>Welcome to PipelineDog!</h2>
        <h4>You can continue as a new project or upload a project file.<br />The documentation and other information can be found at: <a href="http://pipeline.dog" target="_blank">http://pipeline.dog</a></h4>
        <DropZone 
          multiple={false} 
          onDrop={(files)=>{this.props.dispatchProjectUpload(files);this.handleProjectDrop(files)}}
        >
          <div style={{padding: 16, textAlign: "center", }}>{this.state.projectDropText}</div>
        </DropZone>
      </Paper>
    )
  }

  render() {
    const contentStyle = {margin: '0 16px'}

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <div style={contentStyle}>
          <div>
            <div>{this.getContent()}</div>
            <div style={{marginTop: 36}}>
              <RaisedButton
                label="Start"
                primary={true}
                onTouchTap={this.handleStart}
              />
              <RaisedButton
                label="Load Example"
                style={{marginLeft: 15}}
                primary={true}
                onTouchTap={this.handleExample}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}