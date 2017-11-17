
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TweetView extends Component {

  render() {
    const completed = this.props.completion.completed;
    const handle = this.props.completion.handle;
    const plainTextHandle = handle.replace('@', '');
    const tweet = this.props.tweet.replace(new RegExp('@handle', 'g'), handle);
    const tweetEncoded = encodeURIComponent(tweet);
    const tweetHref = `https://twitter.com/intent/tweet?text=${tweetEncoded}`;
    return (
      <div className='tweet-box box'>
        <div className='content'>
          <div className='columns is-mobile'>

            {!this.props.authorized &&
              <div className='tweet-index column is-narrow'>
                {this.props.index+1}
              </div>
            }

            {this.props.authorized &&
              <div className='tweet-completion column is-narrow'>
                <i
                  className={'fa ' + (
                    !completed
                    ? 'fa-square-o tweet-incomplete'
                    : 'fa-check-square-o tweet-complete'
                  )}
                  aria-hidden='true'></i>
              </div>
            }

            <div className='column'>

              {/* Tweet message */}
              <p className='tweet-message subtitle'>{tweet}</p>

              {/* Tweet button */}
              <a
                  title='Tweet this'
                  target='_blank'
                  href={tweetHref}
                  className='tweet-link button is-primary has-text-right'>
                Tweet {completed ? 'Again' : '' }
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

TweetView.propTypes = {
  completion: PropTypes.shape({
    completed: PropTypes.bool,
    handle: PropTypes.string.isRequired
  }).isRequired,
  tweet: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  authorized: PropTypes.bool
};
