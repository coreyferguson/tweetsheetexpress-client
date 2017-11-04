
import reducers from './reducers.js';
import { applyMiddleware, createStore } from 'redux';

export default (middleware) => {
  return createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
  )
}
