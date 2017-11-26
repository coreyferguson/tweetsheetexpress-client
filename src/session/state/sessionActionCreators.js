
import actions from './sessionActions';
import service from '../service/sessionService';

export function getSessionRequest() {
  return {
    type: actions.GET_SESSION_REQUEST
  };
}

export function getSessionResponse(session) {
  return {
    type: actions.GET_SESSION_RESPONSE,
    session
  }
}

export function getSession() {
  return dispatch => {
    dispatch(getSessionRequest());
    return service.findMe().then(response => {
      dispatch(getSessionResponse(response.data));
    });
  };
}

export function signOutRequest() {
  return {
    type: actions.SIGN_OUT_REQUEST
  };
}

export function signOutResponse(session) {
  return {
    type: actions.SIGN_OUT_RESPONSE
  };
}

export function signOut() {
  return dispatch => {
    dispatch(signOutRequest());
    return service.signOut().then(() => {
      dispatch(signOutResponse());
      return service.findMe();
    }).then(response => {
      dispatch(getSessionResponse(response.data));
    });
  };
}
