import alt from './alt'

class Actions {
  constructor() {
    this.generateActions(
      'uploadFile',
      'createStep',
      'deleteStep',
      'sortStep',
      'stepUpload',
      'editorChange',
      'enterMain',
      'projectUpload',
      'listUpload',
      'stepChange',
      'projectSave',
      'projectCreate',
      'editorChange',
      'exportPipeline',
      'tabChange'
      )
  }
}

export default alt.createActions(Actions)