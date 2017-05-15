
import config from 'config';
import { HeroWrapper } from '../Hero';
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
            <div className='columns is-mobile'>

              <p className='tweet-index column is-narrow'>
                {index+1}
              </p>

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

            </div>
          </div>
        </div>
      );
    });
    return (
      <HeroWrapper title={this.props.title}>
        <div className='tweet-sheet'>

          {/* Description */}
          <p className='subtitle'>
            {this.props.description}
          </p>

          {/* Download CSV */}
          <div className='download-csv is-clearfix'>
            <a
                className='is-pulled-right'
                href={`${this.props.url}?id=${this.props.sheetId}`}>
              Download Sheet
            </a>
          </div>

          {/* Tweets */}
          {tweets}

        </div>
      </HeroWrapper>
    );
  }

}

ViewTweetSheet.propTypes = {
  sheetId: React.PropTypes.string.isRequired,
  tweet: React.PropTypes.string.isRequired,
  handles: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  url: React.PropTypes.string
};

ViewTweetSheet.defaultProps = {
  url: `${config.api}/sheets/csv`,
  title: 'tweetsheets'
};
