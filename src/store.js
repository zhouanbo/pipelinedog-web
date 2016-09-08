import alt from './alt'
import yaml from 'js-yaml'

import Actions from './actions'
import Parser from './parser'

class Store {
  
  constructor() {
    this.startState = {
      steps: [{
        id:'1-1', 
        name: 'Default Step',
        code: '#Enter code here\n',
        command: "", 
        out: {default: "/home/usr/out1.out\n/home/usr/out2.out\n/home/usr/out3.out"},
        comment: ""
      }],
      enterMain: 0,
      tab: 0,
      flist: "/home/usr/b1.bam\n/home/usr/b2.bam\n/home/usr/b3.bam",
      flistArr: [],
      gvar: "#Suggested global variables\nIN_DIR: \nOUT_DIR:",
      editing: -2,
      result: "",
      alertOpen: false,
    }
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
      onDeleteStep: Actions.deleteStep,
      onProjectSave: Actions.projectSave,
      onExportCommand: Actions.exportCommand,
      onTabChange: Actions.tabChange
    })
    let localState = {}
    if (localState = localStorage.getItem('state')) {
      this.state = JSON.parse(localState)
    } else {
      this.state = this.startState
    }
  }
  onCreateStep() {
    let steps = this.state.steps
    steps.push({
      id: "",
      name: "",
      code: "", //code
      command: "", //the command to finally run
      //valid: true, //if the JSON is valid
      out: {}, //the output array
      comment: ""
    })
    this.setState({steps})
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
    this.setState(this.startState)
  }
  onProjectSave() {
    
  }
  onProjectUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      console.log(yaml.safeLoad(reader.result))
      //this.setState(yaml.safeLoad(reader.result))
    }
    reader.readAsText(files[0])
  }
  onListUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      this.setState({list: reader.result})
    }
    reader.readAsText(files[0])
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
      
      //call parser
      try {
        let parser = new Parser()
        let { id, name, command, out, comment } = parser.parseStep(newText, this.state.gvar, this.state.flist, this.state.steps)
        steps[editing].command = command
        steps[editing].id = id
        steps[editing].name = name
        steps[editing].out = out
        steps[editing].comment = comment
      } catch (e) {
        console.log(e)
      }

      this.setState({steps})
    }
  }
  onStepChange(index) {
    this.setState({editing: index, tab: 0})
  }
  onExportCommand() {
    try {
      let parser = new Parser()
      let result = parser.combineSteps(this.state.steps)
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

}

export default alt.createStore(Store, 'Store')