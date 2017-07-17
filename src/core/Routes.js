
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import SheetsCreateView from '../sheets/views/SheetsCreateView';
import SheetsRoutes from '../sheets/SheetsRoutes';

export default class Routes extends Component {
  render() {
    return <div>
      <Route exact path='/' component={SheetsCreateView} />
      <Route path='/sheets' component={SheetsRoutes} />
    </div>;
  }
}
