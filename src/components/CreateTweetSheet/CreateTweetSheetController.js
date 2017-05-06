
import axios from 'axios';
import React from 'react';
import View from './CreateTweetSheetView';

export default class CreateTweetSheetController extends React.Component {

  constructor(props) {
    super(props);
    props.url = props.url ||
      'https://fdlg8hz2g8.execute-api.us-west-2.amazonaws.com/dev/sheets';
    this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return <View onCreate={this.handleCreate} />;
  }

  handleCreate(options) {
    console.log('options:', options);
    console.log('url:', this.props.url);
    return axios({
      method: 'POST',
      url: this.props.url,
      data: options
    });
  }

}
