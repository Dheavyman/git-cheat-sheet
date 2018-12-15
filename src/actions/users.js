import * as actionTypes from './actionTypes';

const SITE_URL = `${process.env.REACT_APP_SITE_URL}/api/v1`;

export const authRequest = () => ({
  type: actionTypes.AUTH_REQUEST,
});

export const authSuccess = user => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: user
});

export const authFailure = error => ({
  type: actionTypes.AUTH_FAILURE,
  payload: error
});

export const authenticate = (data, type = 'Login') => async (dispatch) => {
  dispatch(authRequest());
  try {
    let response;
    if (type === 'Register') {
      response = await fetch(`${SITE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } else {
      response = await fetch(`${SITE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }

    if (response.ok) {
      const jsonData = await response.json();
      const { data: { username, token } } = jsonData;

      localStorage.setItem('git-cheat-username', username);
      localStorage.setItem('auth-token', token);

      dispatch(authSuccess(jsonData.data));
      return jsonData;
    } else {
      throw new Error(response.statusText);
    }
  } catch(error) {
      dispatch(authFailure(error.message));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('git-cheat-username');
  localStorage.removeItem('auth-token');
  dispatch({
    type: actionTypes.LOGOUT
  });
};
