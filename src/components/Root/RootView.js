
import React from 'react';
import { Router, Route, hashHistory } from 'react-router'
import CreateTweetSheet from '../CreateTweetSheet';
import ViewTweetSheet from '../ViewTweetSheet';

export default props => (
  <Router history={hashHistory}>
    <Route path='/' component={CreateTweetSheet} />
    <Route path='/sheets/:id' component={ViewTweetSheet} />
  </Router>
);
