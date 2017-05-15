import alt from './alt'

class Actions {
  constructor() {
    this.generateActions(
      'uploadFile',
      'createStep',
      'createList',
      'deleteStep',
      'sortStep',
      'sortList',
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
      'exportClose',
      'modifyList',
      'enterExample',
      'stepAddUpload',
      'listAddUpload'
      )
  }
}

export default alt.createActions(Actions)