import alt from './alt'

class Actions {
  constructor() {
    this.generateActions(
      'uploadFile',
      'createStep',
      'deleteStep',
      'editorChange'
      )
  }
}

export default alt.createActions(Actions)