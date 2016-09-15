import alt from './alt'
import yaml from 'js-yaml'

import Actions from './actions'
import Parser from './parser'

const getStartState = () => {
  return {
    version: "0.1.0",
    steps: [{
      id:'', 
      name: 'Default Step',
      code: '#Enter code here\n',
      command: "", 
      out: {},
      comment: ""
    }],
    enterMain: 0,
    tab: 0,
    flist: "/home/usr/b1.bam\n/home/usr/b2.bam\n/home/usr/b3.bam",
    gvar: "#Suggested global variables\nIN_DIR: \nOUT_DIR:",
    editing: -2,
    export: "",
    save: "",
    error: {show: false, type: "", message: ""}
  }
}

class Store {
  
  constructor() {
    
    this.on('afterEach', () => {
      try {
        localStorage.setItem('state', JSON.stringify(this.state))
      } catch(e) {
        console.log(e)
      }
    })
    this.bindListeners({
      onEditorChange: Actions.editorChange,
      onEnterMain: Actions.enterMain,
      onProjectUpload: Actions.projectUpload,
      onProjectCreate: Actions.projectCreate,
      onListUpload: Actions.listUpload,
      onStepChange: Actions.stepChange,
      onCreateStep: Actions.createStep,
      onSortStep: Actions.sortStep,
      onDeleteStep: Actions.deleteStep,
      onProjectSave: Actions.projectSave,
      onExportPipeline: Actions.exportPipeline,
      onTabChange: Actions.tabChange,
      onStepUpload: Actions.stepUpload,
      onEditorParse: Actions.editorParse,
      onSetError: Actions.setError
    })
    let localState = JSON.parse(localStorage.getItem('state'))
    if (localState && localState.version === getStartState().version) {
      console.log("equal")
      this.state = localState
    } else {
      this.state = getStartState()
    }
  }

  onSetError(error) {
    this.setState({error})
  }
  onCreateStep() {
    let steps = this.state.steps
    steps.push({
      id: "",
      name: "",
      code: "", //code
      command: "", //the command to finally run
      out: {}, //the output array
      comment: ""
    })
    this.setState({steps})
  }
  onSortStep() {
    this.state.steps.sort((a,b)=>{
      return Number(a.id.replace('-',''))-Number(b.id.replace('-',''))
    })
    this.setState({editing: -2, tab: 0})
  }
  onDeleteStep(index) {
    let steps = this.state.steps
    let editing = this.state.editing
    steps.splice(index, 1)
    if (editing === index) {
      editing = -2
    }
    this.setState({steps, editing})
  }
  onEnterMain() {
    this.setState({enterMain: 1})
  }
  onTabChange(value) {
    this.setState({tab: value})
  }
  onProjectCreate() {
    localStorage.clear()
    this.setState(getStartState())
    console.log("state reset")
  }
  onProjectSave() {
    this.setState({save: new Parser().combineSteps(this.state.gvar, this.state.steps)})
  }
  onProjectUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      let {gvar, steps} = new Parser().resolveSteps(reader.result)
      this.setState({gvar, steps})
      try {
        let newSteps = new Parser().parseAllSteps(gvar, this.state.flist, steps)
        if (newSteps) this.setState({steps: newSteps})
      } catch(e) {
        console.log(e)
      }
    }
    reader.readAsText(files[0])  
  }
  onStepUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      this.onEditorParse(reader.result)
    }
    reader.readAsText(files[0])
  }
  onListUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      this.setState({flist: reader.result})
      this.onEditorParse(reader.result)
    }
    reader.readAsText(files[0])
  }
  onEditorParse(text) {
    let editing = this.state.editing
    if (editing === -2) {
      try {
        this.setState({steps: new Parser().parseAllSteps(this.state.gvar, this.state.flist, this.state.steps)})
      } catch(e) {
        let eType = e.type?e.type.toString():"Error Message"
        let eMessage = e.message?e.message.toString():"Unkown Error."
        this.setState({error: {show: true, type: eType, message: eMessage}})
      }
    } else if (editing === -1) {
      try {
        this.setState({steps: new Parser().parseAllSteps(this.state.gvar, this.state.flist, this.state.steps)})
      } catch (e) {
        let eType = e.type?e.type.toString():"Error Message"
        let eMessage = e.message?e.message.toString():"Unkown Error."
        this.setState({error: {show: true, type: eType, message: eMessage}})      }
    } else {
      let steps = this.state.steps
      //call parser
      try {
        let newStep = new Parser().parseStep(text, this.state.gvar, this.state.flist, this.state.steps)
        if (newStep) steps[editing] = newStep
      } catch (e) {
        let eType = e.type?e.type.toString():"Error Message"
        let eMessage = e.message?e.message.toString():"Unkown Error."
        this.setState({error: {show: true, type: eType, message: eMessage}})      }

      this.setState({steps})
    }
  }
  onEditorChange(newText) {
    let editing = this.state.editing
    if (editing === -2) {
      this.setState({flist: newText})
    } else if (editing === -1) {
      this.setState({gvar: newText})
    } else {
      let steps = this.state.steps
      steps[editing].code = newText    
      this.setState({steps})
    }
  }
  onStepChange(index) {
    this.setState({editing: index, tab: 0})
  }
  onExportPipeline() {
    try {
      let newSteps = new Parser().parseAllSteps(this.state.gvar, this.state.flist, this.state.steps)
      if (newSteps) this.setState({steps: newSteps})
      this.setState({export: new Parser().combineCommands(this.state.steps)})
    } catch (e) {
      this.setState({export: "", error: {show: true, type: e.type.toString(), message: e.message.toString()}})
    }
    
  }

}

export default alt.createStore(Store, 'Store')