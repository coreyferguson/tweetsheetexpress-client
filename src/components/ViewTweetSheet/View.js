
import config from 'config';
import React from 'react';
import './View.scss';

export default class ViewTweetSheet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const tweets = this.props.handles.map((handle, index) => {
      const plainTextHandle = handle.replace('@', '');
      const tweet = this.props.tweet.replace(new RegExp('@handle', 'g'), handle);
      const tweetEncoded = encodeURIComponent(tweet);
      const tweetHref = `https://twitter.com/intent/tweet?text=${tweetEncoded}`;
      return (
        <div key={index} className='tweet-box box'>
          <div className='content'>
            <div className='columns'>

              <div className='column'>

                {/* Tweet message */}
                <p className='tweet-message subtitle'>{tweet}</p>

                {/* Tweet button */}
                <a
                    title='Tweet this'
                    target='_blank'
                    href={tweetHref}
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

              <p className='tweet-index column is-narrow is-hidden-mobile'>
                {index+1}
              </p>

            </div>
          </div>
        </div>
      );
    });
    return (
      <div className='tweet-sheet'>
        <div className='download-csv is-clearfix'>
          <a
              className='is-pulled-right'
              href={`${this.props.url}?id=${this.props.sheetId}`}>
            Download Sheet
          </a>
        </div>

        {tweets}

      </div>
    );
  }

}

ViewTweetSheet.propTypes = {
  sheetId: React.PropTypes.string.isRequired,
  tweet: React.PropTypes.string.isRequired,
  handles: React.PropTypes.array.isRequired,
  url: React.PropTypes.string
};

ViewTweetSheet.defaultProps = {
  url: `${config.api}/sheets/csv`
};
