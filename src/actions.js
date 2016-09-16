import alt from './alt'

class Actions {
  constructor() {
    this.generateActions(
      'uploadFile',
      'createStep',
      'createList',
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
      'tabChange',
      'editorParse',
      'setError',
      'exportClose'
      )
  }
}

export default alt.createActions(Actions)