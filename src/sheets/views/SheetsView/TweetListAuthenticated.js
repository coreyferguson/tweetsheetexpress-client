
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TweetItemAuthenticated from './TweetItemAuthenticated';

export default class TweetListAuthenticated extends Component {
  render() {
    const template = this.props.userSheet.sheet.tweet;
    const completions = this.props.userSheet.completions;
    const tweets = completions.map((completion, index) =>
      <TweetItemAuthenticated
        key={index}
        completion={completion}
        template={template}
      />
    );
    return (
      <table className='tweet-sheet table is-striped'>
        <thead>
          <tr>
            <th className='is-narrow'>Status</th>
            <th>Message</th>
            <th className='is-narrow is-hidden-mobile'> &nbsp; </th>
          </tr>
        </thead>
        <tbody>
          {tweets}
        </tbody>
      </table>
    );
  }
}

TweetListAuthenticated.propTypes = {
  userSheet: PropTypes.shape({
    sheet: PropTypes.shape({
      tweet: PropTypes.string.isRequired
    }).isRequired,
    completions: PropTypes.array.isRequired
  }).isRequired
};
