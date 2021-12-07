import {languageTypes} from '../actions/language.action';

const initialState = {
  language: 'en',
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case languageTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export default languageReducer;
