import alt from './alt'

class Actions {
  constructor() {
    this.generateActions(
      'uploadFile',
      'createStep',
      'deleteStep',
      'editorChange',
      'init',
      'sessionUpload',
      'listUpload',
      'stepChange'
      )
  }
}

export default alt.createActions(Actions)