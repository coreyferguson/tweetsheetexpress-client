
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TweetItemUnauthenticated from './TweetItemUnauthenticated';

export default class TweetListUnauthenticated extends Component {
  render() {
    const template = this.props.userSheet.sheet.tweet;
    const handles = this.props.userSheet.sheet.handles;
    const tweets = handles.map((handle, index) =>
      <TweetItemUnauthenticated
        key={index}
        index={index}
        template={template}
        handle={handle}
      />
    );
    return (
      <table className='tweet-sheet table is-striped'>
        <thead>
          <tr>
            <th className='is-narrow'>Index</th>
            <th className='is-narrow'>Tweet</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {tweets}
        </tbody>
      </table>
    );
  }
}

TweetListUnauthenticated.propTypes = {
  userSheet: PropTypes.shape({
    sheet: PropTypes.shape({
      tweet: PropTypes.string.isRequired,
      handles: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }).isRequired
};
