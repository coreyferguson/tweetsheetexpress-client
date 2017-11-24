
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TweetItemUnauthenticated extends Component {
  render() {
    const { template, handle, index } = this.props;
    const plainTextHandle = handle.replace('@', '');
    const message = template.replace(new RegExp('@handle', 'g'), handle);
    const messageEncoded = encodeURIComponent(message);
    const messageHref = `https://twitter.com/intent/tweet?text=${messageEncoded}`;
    return (
      <div className='tweet-box box'>
        <div className='content'>
          <div className='columns is-mobile'>
            <div className='tweet-index column is-narrow'>
              {this.props.index+1}
            </div>

            <div className='column'>

              {/* Tweet message */}
              <p className='tweet-message subtitle'>{message}</p>

              {/* Tweet button */}
              <a
                  title='Tweet this'
                  target='_blank'
                  href={messageHref}
                  className='tweet-link button is-primary has-text-right'>
                Tweet
              </a>

              {/* Twitter handle owner */}
              <a
                  title='Twitter handle owner'
                  className="button is-link"
                  target='_blank'
                  href={`https://twitter.com/${plainTextHandle}`}>
                Who is this?
              </a>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

TweetItemUnauthenticated.propTypes = {
  handle: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  template: PropTypes.string.isRequired
};
