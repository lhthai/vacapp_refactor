import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';

function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;
