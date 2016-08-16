import alt from './alt'
import Actions from './actions'

class Store {
  constructor() {
    this.bindListeners({
      onAction: Actions.myAction
    })

    this.state = {

    }
  }

  onAction() {

  }

}

export default alt.createStore(Store, 'Store')