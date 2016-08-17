import alt from './alt'
import Actions from './actions'

class Store {
  constructor() {
    this.bindListeners({
      onEditorChange: Actions.editorChange
    })

    this.state = {
      tools: [],
      lastId: 0,
      files: [],
      editing: 0,
      command: "",
    }
  }

  getNewTool(index) {
    return {
      id: index,
      name: "",
      code: "", //code
      codeobj: {}, //JSON object parsed from the code
      parsedOptions: {}, //LEASH converted options of the tool
      looping: false, //if the command is to run as a loop, or the values to loop
      expressions: [], //direct LEASH parsing result
      options: [], //keys for options
      parsedCommand: "", //the command to finally run
      valid: true, //if the JSON is valid
      outputlist: [] //the array of predicted output files path
    }
  }

  onEditorChange(newText) {
    this.setState({text: newText});
  }

}

export default alt.createStore(Store, 'Store')