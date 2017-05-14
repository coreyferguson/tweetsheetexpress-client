
import axios from 'axios';
import config from 'config';
import React from 'react';
import View from './View';

export default class Controller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.fetchTweetSheet();
  }

  render() {
    if (this.state.loading) return <h1>Loading...</h1>;
    else return <View
      sheetId={this.props.params.id}
      title={this.sheet.title}
      description={this.sheet.description}
      tweet={this.sheet.tweet}
      handles={this.sheet.handles} />;
  }

  fetchTweetSheet() {
    return axios({
      method: 'GET',
      url: this.props.url,
      params: {
        id: this.props.params.id
      }
    }).then(response => {
      this.sheet = response.data;
      this.setState({
        loading: false
      });
    });
  }

}

Controller.defaultProps = {
  url: `${config.api}/sheets`
};
