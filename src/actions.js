import alt from './alt'

class Actions {
  constructor() {
    this.generateActions(
      'uploadFile',
      'createStep',
      'deleteStep',
      'editorChange',
      'setInit'
      )
  }
}

export default alt.createActions(Actions)