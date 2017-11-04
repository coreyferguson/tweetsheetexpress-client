
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeroWrapper } from '../../../hero/views/Hero'
import './style.scss';

export default class SheetsView extends Component {

  constructor(props) {
    super(props);
    this.handleTweetAll = this.handleTweetAll.bind(this);
  }

  componentDidMount() {
    this.props.onMount(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <HeroWrapper title={this.props.title}>
          {this.loadingView()}
          {this.mainView()}
        </HeroWrapper>
      </div>
    );
  }

  loadingView() {
    if (!this.props.loading) return undefined;
    else {
      return <h1>Loading</h1>;
    }
  }

  mainView() {
    if (!this.props.sheet) return undefined;
    else {
      const tweetViews = this.props.sheet.handles.map(this.tweetView.bind(this));
      return (
        <div className='tweet-sheet'>

          {/* Description */}
          <p className='subtitle'>
            {this.props.description}
          </p>

          {/* Tweet All */}
          <div className='tweet-all'>
            <button
                className='button is-pulled-right'
                onClick={this.handleTweetAll}>
              Tweet All
            </button>
          </div>

          {/* Download CSV */}
          <div className='download-csv is-clearfix'>
            <a
                className='button is-pulled-right'
                href={`${this.props.url}?id=${this.props.sheetId}`}>
              Download Sheet
            </a>
          </div>


          {/* Tweets */}
          <div className='tweets'>
            {tweetViews}
          </div>

        </div>
      );
    }
  }

  tweetView(handle, index) {
    const plainTextHandle = handle.replace('@', '');
    const tweet = this.props.sheet.tweet.replace(new RegExp('@handle', 'g'), handle);
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
  }

  handleTweetAll() {
    this.props.onTweetAll(this.props.match.params.id)
  }

}

SheetsView.propTypes = {
  onMount: PropTypes.func,
  loading: PropTypes.bool
};

SheetsView.defaultProps = {
  loading: false
};
