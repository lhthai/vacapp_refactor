import axios from 'axios';
import {assetUrl} from '../../baseAPIUrl';

export const actionTypes = {
  GET_ASSET_ID_LOADING: 'GET_ASSET_ID_LOADING',
  GET_ASSET_ID_SUCCESS: 'GET_ASSET_ID_SUCCESS',
  GET_ASSET_ID_ERROR: 'GET_ASSET_ID_ERROR',
};

export const getAssetByID = id => async dispatch => {
  dispatch({type: actionTypes.GET_ASSET_ID_LOADING});
  try {
    const {data} = await axios.get(`${assetUrl}/${id}`);
    if (data) {
      dispatch({
        type: actionTypes.GET_ASSET_ID_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    if (error.response.status === 404) {
      alert('Asset ID not found');
    } else {
      alert(error.message);
    }
    dispatch({
      type: actionTypes.GET_ASSET_ID_ERROR,
    });
  }
};
