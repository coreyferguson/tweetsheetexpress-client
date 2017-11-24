
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
      <div className='tweet-sheet'>
        <div className='tweets'>
          {tweets}
        </div>
      </div>
    );
  }
}

