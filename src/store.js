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
      export: "",
      save: ""
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
      onSortStep: Actions.sortStep,
      onDeleteStep: Actions.deleteStep,
      onProjectSave: Actions.projectSave,
      onExportPipeline: Actions.exportPipeline,
      onTabChange: Actions.tabChange,
      onStepUpload: Actions.stepUpload
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
    this.setState(this.startState)
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
        console.log(newSteps)
        this.setState({steps: newSteps ? newSteps : this.state.steps})
      } catch(e) {
        console.log(e)
      }
    }
    reader.readAsText(files[0])  
  }
  onStepUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      this.onEditorChange(reader.result)
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
      try {
        let newSteps = new Parser().parseAllSteps(this.state.gvar, newText, this.state.steps)
        this.setState({steps: newSteps ? newSteps : this.state.steps})
      } catch(e) {
        this.setState({flist: newText})
        console.log(e)
      }
    } else if (editing === -1) {
      try {
        this.setState({gvar: newText, steps: new Parser().parseAllSteps(newText, this.state.flist, this.state.steps)})
      } catch (e) {
        this.setState({gvar: newText})
        console.log(e)
      }
    } else {
      let steps = this.state.steps
      steps[editing].code = newText     
      //call parser
      try {
        let newStep = new Parser().parseStep(newText, this.state.gvar, this.state.flist, this.state.steps)
        if (newStep) steps[editing] = newStep
      } catch (e) {
        console.log(e)
      }

      this.setState({steps})
    }
  }
  onStepChange(index) {
    this.setState({editing: index, tab: 0})
  }
  onExportPipeline() {
    try {
      this.setState({export: new Parser().combineCommands(this.state.steps)})
    } catch (e) {
      console.log(e)
    }
  }

}

export default alt.createStore(Store, 'Store')