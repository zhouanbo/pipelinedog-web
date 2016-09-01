import alt from './alt'
import yaml from 'js-yaml'

import Actions from './actions'
import Parser from './parser'

class Store {
  constructor() {
    this.bindListeners({
      onEditorChange: Actions.editorChange,
      onInit: Actions.init,
      onSessionUpload: Actions.sessionUpload,
      onListUpload: Actions.listUpload,
      onStepChange: Actions.stepChange,
      onCreateStep: Actions.createStep,
      onDeleteStep: Actions.deleteStep,
      onSaveSession: Actions.saveSession
    })

    this.state = {
      steps: [{id:'1-2', out:"aaa.bam\nbbb.bam\nccc.bam"}],
      init: 0,
      flist: "/home/usr/b1.bam\n/home/usr/b2.bam\n/home/usr/b3.bam",
      flistArr: [],
      gvar: "#Suggested global variables\n\nIN_DIR: \nOUT_DIR: \n",
      editing: -2,
      result: "",
      alertOpen: false,
    }
  }

  onCreateStep() {
    let steps = this.state.steps
    steps.push({
      id: "",
      name: "",
      code: "", //code
      codeObj: {}, //JSON object parsed from the code
      //parsedOptions: {}, //LEASH converted options of the tool
      //expressions: [], //direct LEASH parsing result
      //options: [], //keys for options
      command: "", //the command to finally run
      //valid: true, //if the JSON is valid
      out: "" //the output array
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

  onInit() {
    this.setState({init: 1})
  }

  onSaveSession() {
    
  }
  onSessionUpload(files) {
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
      let parser = new Parser()
      steps[editing].command = parser.parseStep(newText, this.state.gvar, this.state.flist, this.state.steps)

      this.setState({steps})
    }
    
  }
  onStepChange(index) {
    //add onEditorChange later to refresh output
    this.setState({editing: index})
  }


}

export default alt.createStore(Store, 'Store')