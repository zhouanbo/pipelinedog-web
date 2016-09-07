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
      stepIndex: 0,
      listDropText: "Drop your list file or click to select.",
      projectDropText: "Drop your session file or click to select."
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this) 
    this.handleListDrop = this.handleListDrop.bind(this)
    this.handleProjectDrop = this.handleProjectDrop.bind(this)
    this.getStepContent = this.getContent.bind(this)
  }

  handleNext() {
    const {stepIndex} = this.state
    this.setState({
      stepIndex: stepIndex + 1,
    })
    if (stepIndex >= 2) {
      this.props.dispatchEnterMain()
    }
  }

  handlePrev() {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  handleListDrop(files) {
    this.setState({listDropText: "Uploaded Sucessfully: "+files[0].name})
  }

  handleProjectDrop(files) {
    this.setState({projectDropText: "Uploaded Sucessfully: "+files[0].name})
  }

  getContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Paper zDepth={0}>
            <h2>Welcome to PipelineDog!</h2>
            <h4>You can continue as a new project or upload a session file.</h4>
            <DropZone 
              multiple={false} 
              onDrop={(files)=>{this.props.dispatchProjectUpload(files);this.handleProjectDrop(files)}}
            >
              <div style={{padding: 16, textAlign: "center", }}>{this.state.projectDropText}</div>
            </DropZone>
          </Paper>
        )
      case 1:
        return (
          <Paper zDepth={0}>
            <h2>Upload a List File</h2>
            <h4>You can upload a list file or type it later on.</h4>
            <DropZone 
              multiple={false} 
              onDrop={(files)=>{this.props.dispatchListUpload(files);this.handleListDrop(files)}}
            >
              <div style={{padding: 16, textAlign: "center", }}>{this.state.listDropText}</div>
            </DropZone>
          </Paper>
        )
      case 2:
        return (
          <Paper zDepth={0}>
            <h2>Let's Go!</h2>
            <h4>It seems you are all set, let's' get started.</h4>            
          </Paper>
        )
      default:
        return 'This is a wrong index!'
    }
  }

  render() {
    const {finished, stepIndex} = this.state
    const contentStyle = {margin: '0 16px'}

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>Upload a project file</StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>Upload a list file</StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>Ready to start</StepButton>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <div>
            <div>{this.getContent(stepIndex)}</div>
            <div style={{marginTop: 36}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label={stepIndex === 2 ? 'Start' : 'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}