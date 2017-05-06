
import React from 'react';
import View from './CreateTweetSheetView';

export default class CreateTweetSheetController extends React.Component {

  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return <View onCreate={this.handleCreate} />;
  }

  handleCreate(options) {
    console.log('options:', options);
  }

}
