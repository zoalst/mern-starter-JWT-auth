import cookie from 'react-cookie';

import callApi from '../../util/apiCaller';

// Export Auth Constants
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOAD_USER_PROPS = 'LOAD_USER_PROPS';


export function registerRequest(userInfo) {
  return (dispatch) => {
    return callApi('register', 'post', {
      user: {
          username: userInfo.username,
          password: userInfo.password,
        }
    }).then(res => {
      if(res.user) {
        dispatch(registerSuccess())
      }
      else {
        dispatch(registerFailure(res));
      }
    });
  };
}

export function registerSuccess() {
  alert('registration successful');
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerFailure(res) {
  alert('registration failed: '+res.err);
  return {
    type: REGISTER_FAILURE,
  };
}

export function loginRequest(userInfo) {
  return (dispatch) => {
  	return callApi('login', 'post', {
  		user: {
          username: userInfo.username,
          password: userInfo.password,
        }
    }).then(res => {
      if(res.user) {
        dispatch(loginSuccess(res.user, res.token))
      }
      else {// invalid credentials
        dispatch(loginFailure(res));
      }
    });
  };
}

export function loginSuccess(user, token) {
  alert('login successful');
  cookie.save('mernAuth', {
      u: user.username,
      t: token
    },
    {
      maxAge: 31536e3,
      path: '/'
    }
  );

  return {
    type: LOGIN_SUCCESS,
    user,
  }; 
}

export function loginFailure(res) {
  alert('login failed: '+res.err);
  return {
    type: LOGIN_FAILURE,
  };
}
export function logout() {
  cookie.remove('mernAuth', { path: '/' });
  alert('logged out'); 
  return {
    type: LOGOUT,
  };
}

export function updateUserInfoRequest(newUserInfo) {
  return (dispatch) => {
    let token = cookie.load('mernAuth').t;
  	return callApi('updateUserInfo', 'post', newUserInfo,
  		{
        'content-type': 'application/json',
        'Authorization': token,
      }
    ).then(res => {
      if(res.user) {
        dispatch(updateUserInfoSuccess(res.user));
      }
      else {
        dispatch(updateUserInfoFailure(res));
      }
    });
  };
}


export function updateUserInfoSuccess(user) {
  alert('profile updated successfully');
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    user,
  };
}

export function updateUserInfoFailure(res) {
  alert('update failed: '+res.err);
  return {
    type: UPDATE_USER_INFO_FAILURE,
  };
}

export function loadUserProps(user) {
  return {
    type: LOAD_USER_PROPS,
    user
  };
}