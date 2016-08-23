import alt from './alt'
import Actions from './actions'
import yaml from 'js-yaml'

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
      steps: [],
      init: 0,
      list: "yes",
      gvar: "${INPUT_DIRECTORY}: \"\"\n${OUTPUT_DIRECTORY}: \"\"\n",
      //lastId: 0,
      //files: [],
      editing: -2,
      command: "",
      alertOpen: false,
    }
  }

  onCreateStep() {
    let steps = this.state.steps
    steps.push({
      name: "",
      code: "", //code
      codeobj: {}, //JSON object parsed from the code
      parsedOptions: {}, //LEASH converted options of the tool
      //looping: false, //if the command is to run as a loop, or the values to loop
      expressions: [], //direct LEASH parsing result
      options: [], //keys for options
      parsedCommand: "", //the command to finally run
      valid: true, //if the JSON is valid
      outputlist: [] //the array of predicted output files path
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
      this.setState({list: newText})
    } else if (editing === -1) {
      this.setState({gvar: newText})
    } else {
      let steps = this.state.steps
      steps[editing].code = newText
      //parsing code there
      this.setState({steps})
    }
    
  }
  onStepChange(index) {
    this.setState({editing: index})
  }


}

export default alt.createStore(Store, 'Store')