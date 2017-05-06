
import React from 'react';
import { Router, Route, hashHistory } from 'react-router'
import CreateTweetSheet from '../CreateTweetSheet';

export default props => (
  <Router history={hashHistory}>
    <Route path='/' component={CreateTweetSheet} />
  </Router>
);
