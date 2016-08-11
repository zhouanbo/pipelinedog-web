import alt from './alt';
import Actions from './actions';

class Store {
  constructor() {
    this.bindListeners({
      onAction: Actions.ACTION
    });

    this.state = {

    };
  }

  onAction() {
    
  }

}

export default alt.createStore(Store, 'Store');