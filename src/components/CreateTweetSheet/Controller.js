
import axios from 'axios';
import React from 'react';
import CreateView from './CreateView';
import SuccessView from './SuccessView';

export default class Controller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweetSheetId: null
    };
    this.handleCreate = this.handleCreate.bind(this);
    this._axios = axios;
  }

  render() {
    if (!this.state.tweetSheetId) return <CreateView onCreate={this.handleCreate} />;
    else return <SuccessView tweetSheetId={this.state.tweetSheetId} />;
  }

  handleCreate(options) {
    return this._axios({
      method: 'POST',
      url: this.props.url,
      data: options
    }).then(response => {
      this.setState({
        tweetSheetId: response.data.id
      });
    });
  }

}

Controller.defaultProps = {
  url: 'https://fdlg8hz2g8.execute-api.us-west-2.amazonaws.com/dev/sheets'
};
