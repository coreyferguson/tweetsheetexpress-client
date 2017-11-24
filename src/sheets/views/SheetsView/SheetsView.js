
import './style.scss';
import config from 'config';
import DownloadCsv from './DownloadCsv';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TweetBatchButton from './TweetBatchButton';
import TweetListAuthenticated from './TweetListAuthenticated';
import TweetListUnauthenticated from './TweetListUnauthenticated';
import { HeroWrapper } from '../../../hero/views/Hero';

export default class SheetsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextTweetsheetBatch: moment(),
      nextTweetsheetBatchMessage: null
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
        nextTweetsheetBatchMessage: null
      });
    } else {
      const duration = moment.duration(this.state.nextTweetsheetBatch.diff(moment()));
      const nextTweetsheetBatchMessage = (duration.asSeconds() < 60)
        ? `in ${duration.seconds()} seconds`
        : `in ${duration.minutes()+1} minutes`
      this.setState({
        nextTweetsheetBatchMessage
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
    return (this.props.authorized)
      ? <TweetBatchButton
          nextBatchMessage={this.state.nextTweetsheetBatchMessage}
          onClick={this.handleTweetAll} />
      : undefined;
  }

  tweetListView() {
    return (this.props.authorized)
      ? <TweetListAuthenticated {...this.props} />
      : <TweetListUnauthenticated {...this.props} />;
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
  loading: false,
  title: 'tweetsheets',
  url: `${config.api}/sheets/csv`
};
