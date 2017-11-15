
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeroWrapper } from '../../../hero/views/Hero'
import './style.scss';
import moment from 'moment';

export default class SheetsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextTweetsheetBatch: moment(),
      nextTweetsheetBatchDelta: null
    };
    this.handleTweetAll = this.handleTweetAll.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.props.onMount(this.props.match.params.id);
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    if (moment().isAfter(this.state.nextTweetsheetBatch)) {
      this.setState({
        nextTweetsheetBatchDelta: null
      });
    } else {
      const duration = moment.duration(this.state.nextTweetsheetBatch.diff(moment()));
      const nextTweetsheetBatchDelta = (duration.asSeconds() < 60)
        ? `in ${duration.seconds()} seconds`
        : `in ${duration.minutes()+1} minutes`
      this.setState({
        nextTweetsheetBatchDelta
      });
    }
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
    if (!this.props.userSheet) return undefined;
    else {
      const tweetViews =
        (!this.props.authorized)
        ? this.props.userSheet.sheet.handles
          .map(handle => {
            return { completed: false, handle }
          })
          .map(this.tweetView.bind(this))
        : this.props.userSheet.completions.map(this.tweetView.bind(this));
      return (
        <div className='tweet-sheet'>

          {/* Description */}
          <p className='subtitle'>
            {this.props.description}
          </p>

          {this.tweetBatchButton()}

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

  tweetBatchButton() {
    if (!this.props.authorized) return;
    if (!this.state.nextTweetsheetBatchDelta) return (
      <div className='tweet-all'>
        <button
            className='button is-pulled-right'
            onClick={this.handleTweetAll}>
          Tweet Batch
        </button>
      </div>
    )
    else return (
      <div className='tweet-all'>
        <button
            className='button is-pulled-right'
            onClick={this.handleTweetAll}>
          Tweet again {this.state.nextTweetsheetBatchDelta}
        </button>
      </div>
    );
  }

  tweetView(completion, index) {
    const completed = completion.completed;
    const handle = completion.handle;
    const plainTextHandle = handle.replace('@', '');
    const tweet = this.props.userSheet.sheet.tweet.replace(new RegExp('@handle', 'g'), handle);
    const tweetEncoded = encodeURIComponent(tweet);
    const tweetHref = `https://twitter.com/intent/tweet?text=${tweetEncoded}`;
    return (
      <div key={index} className='tweet-box box'>
        <div className='content'>
          <div className='columns is-mobile'>

            <p className='tweet-index column is-narrow'>
              {index+1}
            </p>

            {this.props.authorized &&
              <p className='tweet-completion column is-narrow'>
                <i
                  className={'fa ' + (
                    !completed
                    ? 'fa-square-o tweet-complete'
                    : 'fa-check-square-o tweet-incomplete'
                  )}
                  aria-hidden='true'></i>
              </p>
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

  handleTweetAll() {
    if (this.state.nextTweetsheetBatchDelta) {
      alert('Please wait until the given time has elapsed before tweeting another batch.');
    } else {
      this.setState({
        nextTweetsheetBatch: moment().add(4, 'minutes').add(30, 'seconds')
      });
      this.props.onTweetAll(this.props.match.params.id)
    }
  }

}

SheetsView.propTypes = {
  onMount: PropTypes.func,
  loading: PropTypes.bool
};

SheetsView.defaultProps = {
  loading: false
};
