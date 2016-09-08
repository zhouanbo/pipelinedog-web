import alt from './alt'

class Actions {
  constructor() {
    this.generateActions(
      'uploadFile',
      'createStep',
      'deleteStep',
      'editorChange',
      'enterMain',
      'projectUpload',
      'listUpload',
      'stepChange',
      'projectSave',
      'projectCreate',
      'editorChange',
      'exportCommand',
      'tabChange'
      )
  }
}

export default alt.createActions(Actions)