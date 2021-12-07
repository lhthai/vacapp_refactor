import {actionTypes} from '../actions/assetManagement';

const initialState = {
  payload: {
    identificationNo: '',
    assetName: '',
    model: '',
    installationDate: '',
    lastPMDate: '',
    lastCalibrationDate: '',
    lastVerificationDate: '',
    ownerInVac: '',
    location: '',
  },
  error: null,
  isLoading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ASSET_ID_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_ASSET_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
      };
    case actionTypes.GET_ASSET_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        payload: initialState.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
