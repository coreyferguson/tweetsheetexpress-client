
import axios from 'axios';
import config from 'config';
import React from 'react';
import CreateView from './CreateView';
import SuccessView from './SuccessView';

export default class Controller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tweetSheetId: null
    };
    this.handleCreate = this.handleCreate.bind(this);
    this._axios = axios;
  }

  render() {
    if (!this.state.tweetSheetId)
      return <CreateView
        loading={this.state.loading}
        onCreate={this.handleCreate} />;
    else return <SuccessView tweetSheetId={this.state.tweetSheetId} />;
  }

  handleCreate(options) {
    this.setState({ loading: true });
    return this._axios({
      method: 'POST',
      url: this.props.url,
      data: options
    }).then(response => {
      this.setState({
        loading: false,
        tweetSheetId: response.data.id
      });
    });
  }

}

Controller.defaultProps = {
  url: `${config.api}/sheets`
};
