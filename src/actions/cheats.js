import * as actionTypes from './actionTypes';

const SITE_URL = `${process.env.REACT_APP_SITE_URL}/api/v1`;

export const fetchCheatsSuccess = cheats => ({
  type: actionTypes.FETCH_CHEATS_SUCCESS,
  payload: cheats
});

export const fetchCheatsFailure = error => ({
  type: actionTypes.FETCH_CHEATS_FAILURE,
  payload: error
});

const fetchCheats = () => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${SITE_URL}/cheats`);

    if (response.ok) {
      const jsonData = await response.json();

      dispatch(fetchCheatsSuccess(jsonData.data.cheats));
    } else {
      throw new Error(response.statusText);
    }
  } catch(error) {
      const errorData = await response.json();
      dispatch(fetchCheatsFailure(error.message));

      throw(errorData)
  }
}

const handleSearch = keywords => (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_CHEATS,
    payload: keywords
  });
}

export { fetchCheats, handleSearch };
