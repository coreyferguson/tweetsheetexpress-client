
import { combineReducers } from 'redux';
import sheets from '../sheets/state/sheetsReducer';
import session from '../session/state/sessionReducer';
import { routerReducer as router } from 'react-router-redux';

export default combineReducers({
  sheets,
  session,
  router
});
