
import actions from './sessionActions';

export default (
  state = {
    loading: false,
    data: {
      authorized: false
    }
  },
  action
) => {
  switch (action.type) {
    case actions.GET_SESSION_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.GET_SESSION_RESPONSE:
      return Object.assign({}, state, {
        loading: false,
        data: action.session
      });
    default:
      return state;
  }
};