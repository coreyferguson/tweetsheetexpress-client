
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SheetsShareView from './views/SheetsShareView';
import SheetsView from './views/SheetsView';

export default class SheetsRoutes extends Component {
  render() {
    return (
      <div>
        <Route exact path='/sheets/:id' component={SheetsView} />
        <Route exact path='/sheets/:id/share' component={SheetsShareView} />
      </div>
    );
  }
}

// TODO: propTypes
