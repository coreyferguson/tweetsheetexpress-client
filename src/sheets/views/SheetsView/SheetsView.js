
import './style.scss';
import config from 'config';
import DownloadCsv from './DownloadCsv';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TweetListAuthenticated from './TweetListAuthenticated';
import TweetListUnauthenticated from './TweetListUnauthenticated';
import { HeroWrapper } from '../../../hero/views/Hero';

export default class SheetsView extends Component {

  constructor(props) {
    super(props);
    this.handleTweetAll = this.handleTweetAll.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    if (this.props.onMount) this.props.onMount(this.props.match.params.id);
    let timer = setInterval(this.tick, this.props.tickRateInMilliseconds);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    this.setState({ time: new Date() });
    // if batch mode running and ready to tweet next batch
    if (this.props.batch.working) {
      if (this.isComplete()) {
        this.props.onBatchStop();
      } else if (moment().isAfter(this.props.batch.nextTweetTime)) {
        this.handleTweetAll();
      }
    }
  }

  render() {
    return (
      <div>
        <HeroWrapper title={this.props.title} bulmaModifier={(this.isComplete()) ? 'is-success' : 'is-primary'}>
          {this.loadingView()}
          {this.mainView()}
        </HeroWrapper>
      </div>
    );
  }

  loadingView() {
    if (!this.props.loading) return undefined;
    else {
      return <a className='button is-loading'>Loading</a>;
    }
  }

  mainView() {
    if (!this.props.userSheet) return undefined;
    else {
      const completions = this.props.authorized
        ? this.props.userSheet.completions
        : this.props.userSheet.sheet.handles.map(handle => {
            return { completed: false, handle }
          });
      return (
        <div className='tweet-sheet'>
          {this.descriptionView()}
          <div className='tweet-sheet-actions'>
            {this.tweetBatchView()}
            {this.downloadCsvView()}
          </div>
          {this.tweetBatchProgressView()}
          {this.tweetListView()}
        </div>
      );
    }
  }

  downloadCsvView() {
    return <DownloadCsv {...this.props} />;
  }

  descriptionView() {
    return (
      <p className='subtitle'>
        {this.props.description}
      </p>
    );
  }

  tweetBatchView() {
    const authorized = this.props.authorized;
    const complete = this.isComplete();
    const working = this.props.batch.working;
    if (authorized && !complete && !working) return (
      <div className='tweet-batch'>
        <button
            className='button is-pulled-left is-primary'
            onClick={this.handleTweetAll}>
          Tweet Everything
        </button>
      </div>
    );
  }

  tweetBatchProgressView() {
    if (this.isComplete()) return (
      <div className='tweet-sheet-completed-all notification is-success'>
        <h1 className='subtitle'>Success! All tweets sent!</h1>
      </div>
    );

    if (this.props.batch.working) {
      const max = this.getNumberOfTweets();
      const value = this.getNumberOfCompletedTweets();
      const totalTimeLeft = this.getTotalTimeLeft();
      const totalTimeLeftMessage = (totalTimeLeft.asSeconds() < 60)
        ? `${totalTimeLeft.seconds()} seconds`
        : `${Math.ceil(totalTimeLeft.asMinutes())} minutes`;
      return (
        <div className='tweet-sheet-progress notification'>
          <p className='subtitle'>
            Tweets being sent. Please keep your browser open until complete.
          </p>
          <p>
            This process will complete in about {totalTimeLeftMessage}.
          </p>
          <progress
              className='progress is-large is-primary'
              value={value}
              max={max}>
            &nbsp;
          </progress>
        </div>
      );
    }
  }

  tweetListView() {
    return (this.props.authorized)
      ? <TweetListAuthenticated {...this.props} />
      : <TweetListUnauthenticated {...this.props} />;
  }

  handleTweetAll() {
    if (!this.isComplete()) {
      this.props.onTweet(this.props.match.params.id);
      this.props.onBatchStart(this.props.throttle(moment()));
    }
  }

  getNumberOfTweets() {
    return this.props.userSheet.completions.length;
  }

  getNumberOfCompletedTweets() {
    return this.props.userSheet.completions
      .filter(completion => completion.completed)
      .length;
  }

  getTotalTimeLeft() {
    const batchSize = this.props.batchSize;
    let timeLeft = moment.duration();
    const timeUntilNextBatch = this.getTimeUntilNextBatch();
    timeLeft.add(timeUntilNextBatch);
    const max = this.getNumberOfTweets();
    const value = this.getNumberOfCompletedTweets();
    let delta = max - value - batchSize;
    while (delta > 0) {
      timeLeft = this.props.throttle(timeLeft);
      delta -= batchSize;
    }
    return timeLeft;
  }

  getTimeUntilNextBatch() {
    const nextTweetTime = this.props.batch.nextTweetTime;
    const timeLeft = moment.duration(nextTweetTime.diff(moment()));
    return timeLeft;
  }

  isComplete() {
    if (this.props == null ||
        this.props.userSheet == null ||
        this.props.userSheet.completions == null) {
      return false;
    }
    return this.props.userSheet.completions
      .filter(completion => !completion.completed)
      .length === 0;
  }

}

SheetsView.propTypes = {
  authorized: PropTypes.bool.isRequired,
  batch: PropTypes.shape({
    working: PropTypes.bool.isRequired,
    nextTweetTime: PropTypes.object
  }).isRequired,
  batchSize: PropTypes.number,
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onBatchStart: PropTypes.func.isRequired,
  onBatchStop: PropTypes.func.isRequired,
  onMount: PropTypes.func,
  onTweet: PropTypes.func.isRequired,
  throttle: PropTypes.func,
  tickRateInMilliseconds: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  userSheet: PropTypes.shape({
    completions: PropTypes.arrayOf(
      PropTypes.shape({
        completed: PropTypes.bool.isRequired,
        handle: PropTypes.string.isRequired
      })
    ).isRequired,
    sheet: PropTypes.shape({
      handles: PropTypes.array.isRequired
    }).isRequired
  })
};

SheetsView.defaultProps = {
  batchSize: 1,
  loading: false,
  throttle: time => time.add(1, 'minute').add(10, 'seconds'),
  tickRateInMilliseconds: 1000,
  title: 'tweetsheets',
  url: `${config.api}/sheets/csv`
};
