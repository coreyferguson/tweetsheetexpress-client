
import reducers from './reducers.js';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';

export default (history, middleware) => {
  return createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
  )
}
