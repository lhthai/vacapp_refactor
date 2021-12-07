import {combineReducers} from 'redux';
import assetManagement from './assetManagement';
import languageReducer from './language.reducer';

const rootReducer = combineReducers({
  assetManagement: assetManagement,
  languague: languageReducer,
});

export default rootReducer;
