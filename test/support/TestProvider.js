
import Provider from '../../src/core/Provider';
import React, { Component } from 'react';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createHashHistory';
import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

export default class TestProvider extends Component {

  constructor(props) {
    super(props);
    this.history = createHistory();
    this.middleware = applyMiddleware(
      thunkMiddleware, // enables dispatch() functions
      routerMiddleware(history)
    )
  }

  render() {
    return (
      <Provider middleware={this.middleware}>
        {this.props.children}
      </Provider>
    );
  }

}
