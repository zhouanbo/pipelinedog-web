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
    this.setState({steps: steps})
  }

  onDeleteStep(index) {

  }

  onInit() {
    this.setState({init: 1})
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
  onEditorChange() {

  }
  onStepChange(index) {
    this.setState({editing: index})
  }


}

export default alt.createStore(Store, 'Store')