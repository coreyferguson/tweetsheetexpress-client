
import createHistory from 'history/createHashHistory';
import createStore from './createStore';
import React, { Component } from 'react';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';

export default class AppProvider extends Component {

  constructor(props) {
    super(props);
    console.info('AppProvider.constructor(props):', JSON.stringify(props));
    this.history = createHistory();
    let middleware = props.middleware || applyMiddleware(
      thunkMiddleware, // enables dispatch() functions
      createLogger(), // logs actions
      routerMiddleware(history),
    );
    this.store = createStore(
      this.history,
      middleware
    );
  }

  render() {
    console.info('Provider.render() this.store:', JSON.stringify(this.store))
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          {this.props.children}
        </ConnectedRouter>
      </Provider>
    );
  }

}