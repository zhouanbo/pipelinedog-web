import alt from './alt'
import yaml from 'js-yaml'

import Actions from './actions'
import Parser from './parser'

const getStartState = () => {
  return {
    version: "0.2.3",
    steps: [{
      id: '',
      name: "Default Step",
      code: '',
      command: "",
      out: {},
      comment: ""
    }],
    enterMain: 0,
    tab: 0,
    flists: [{
      name: "Default List",
      content: "/home/usr/sample1.fq\n/home/usr/sample2.fq\n/home/usr/sample3.fq"
    }],
    gvar: "OUT_DIR: ",
    editing: -2,
    export: "",
    exportOpen: false,
    save: "",
    error: { show: false, type: "", message: "" }
  }
}

class Store {

  constructor() {

    this.on('afterEach', () => {
      try {
        localStorage.setItem('state', JSON.stringify(this.state))
      } catch (e) {
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
      onSortList: Actions.sortList,
      onDeleteStep: Actions.deleteStep,
      onProjectSave: Actions.projectSave,
      onExportPipeline: Actions.exportPipeline,
      onTabChange: Actions.tabChange,
      onStepUpload: Actions.stepUpload,
      onEditorParse: Actions.editorParse,
      onSetError: Actions.setError,
      onExportClose: Actions.exportClose,
      onCreateList: Actions.createList,
      onModifyList: Actions.modifyList,
      onEnterExample: Actions.enterExample,
      onStepAddUpload: Actions.stepAddUpload,
      onListAddUpload: Actions.listAddUpload
    })
    let localState = JSON.parse(localStorage.getItem('state'))
    if (localState && localState.version === getStartState().version) {
      this.state = localState
    } else {
      this.state = getStartState()
    }
  }

  onSetError(error) {
    this.setState({ error })
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
    this.setState({ steps })
  }
  onCreateList(name) {
    let flists = this.state.flists
    flists.push({
      name: name,
      content: ""
    })
    this.setState({ flists })
  }
  onModifyList(param) {
    let flists = this.state.flists
    flists[param.id * -1 - 2].name = param.name
    this.setState({ flists })
  }
  onSortStep() {
    this.state.steps.sort((a, b) => {
      return Number(a.id.replace('-', '')) - Number(b.id.replace('-', ''))
    })
    this.setState({ editing: -1, tab: 0 })
  }
  onSortList() {
    this.state.flists.sort((a, b) => {
      return Number(a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0))
    })
    this.setState({ editing: -1, tab: 0 })
  }
  onDeleteStep(index) {
    let editing = this.state.editing
    if (index <= -2) {
      let flists = this.state.flists
      flists.splice(index * -1 - 2, 1)
      if (editing === index) {
        editing = -1
      }
      this.setState({ flists, editing })
    } else {
      let steps = this.state.steps
      steps.splice(index, 1)
      if (editing === index) {
        editing = -1
      }
      this.setState({ steps, editing })
    }
  }
  onEnterMain() {
    this.setState({ enterMain: 1 })
  }
  onEnterExample() {
    let blob = null
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "http://pipeline.dog/gatk.yml")
    xhr.responseType = "blob"
    xhr.onload = () => {
      blob = xhr.response
      this.onProjectUpload([blob])
      this.setState({ enterMain: 1 })
    }
    xhr.send()   
  }
  onTabChange(value) {
    this.setState({ tab: value })
  }
  onProjectCreate() {
    localStorage.clear()
    this.setState(getStartState())
  }
  onProjectSave() {
    this.setState({ save: new Parser().combineSteps(this.state.gvar, this.state.steps) })
  }
  onProjectUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      let {gvar, steps} = new Parser().resolveSteps(reader.result)
      this.setState({ gvar, steps })
      try {
        let newSteps = new Parser().parseAllSteps(gvar, this.state.flists, steps)
        if (newSteps) this.setState({ steps: newSteps })
      } catch (e) {
        console.log(e)
      }
    }
    reader.readAsText(files[0])
  }
  onStepUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      this.onEditorChange(reader.result)
      //Whether to parse the pipeline immdiately after upload or not
      //this.onEditorParse(reader.result)
    }
    reader.readAsText(files[0])
  }
  onStepAddUpload(files) {
    let filename = files[0].name
    this.onCreateStep()
    this.onStepChange( this.state.steps.length - 1 )
    this.onStepUpload(files)
  }
  onListUpload(files) {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      this.setState({ flists: [{ name: "Default List", content: reader.result }] })
      this.onEditorParse(reader.result)
    }
    reader.readAsText(files[0])
  }
  onListAddUpload(files) {
    let filename = files[0].name
    this.onCreateList(filename)
    this.onStepChange( -1 - this.state.flists.length )
    this.onStepUpload(files)
  }
  onEditorParse(text) {
    let editing = this.state.editing
    if (editing <= -1) {
      try {
        this.setState({ steps: new Parser().parseAllSteps(this.state.gvar, this.state.flists, this.state.steps) })
      } catch (e) {
        let eType = e.type ? e.type.toString() : "Error Message"
        let eMessage = e.message ? e.message.toString() : "Unkown Error."
        this.setState({ error: { show: true, type: eType, message: eMessage } })
      }
    } else {
      let steps = this.state.steps
      //call parser
      try {
        let newStep = new Parser().parseStep(text, this.state.gvar, this.state.flists, this.state.steps)
        if (newStep) steps[editing] = newStep
      } catch (e) {
        let eType = e.type ? e.type.toString() : "Error Message"
        let eMessage = e.message ? e.message.toString() : "Unkown Error."
        this.setState({ error: { show: true, type: eType, message: eMessage } })
      }

      this.setState({ steps })
    }
  }
  onEditorChange(newText) {
    let editing = this.state.editing
    if (editing <= -2) {
      let flists = this.state.flists
      flists[editing * -1 - 2].content = newText
      this.setState({ flists })
    } else if (editing === -1) {
      this.setState({ gvar: newText })
    } else {
      let steps = this.state.steps
      steps[editing].code = newText
      this.setState({ steps })
    }
  }
  onStepChange(index) {
    console.log("editing", index)
    this.setState({ editing: index, tab: 0 })
  }
  onExportPipeline() {
    try {
      let newSteps = new Parser().parseAllSteps(this.state.gvar, this.state.flists, this.state.steps)
      if (newSteps) this.setState({ steps: newSteps })
      this.setState({ exportOpen: true, export: new Parser().combineCommands(this.state.steps) })
    } catch (e) {
      this.setState({ export: "", error: { show: true, type: e.type.toString(), message: e.message.toString() } })
    }
  }
  onExportClose() {
    this.setState({ exportOpen: false })
  }

}

export default alt.createStore(Store, 'Store')
