
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TweetBatchButton extends Component {

  render() {
    if (!this.props.nextBatchMessage) return (
      <div className='tweet-batch'>
        <button
            className='button is-pulled-right'
            onClick={this.props.onClick}>
          Tweet Batch
        </button>
      </div>
    )
    else return (
      <div className='tweet-batch'>
        <button
            className='button is-pulled-right'
            onClick={this.props.onClick}>
          Tweet again {this.props.nextBatchMessage}
        </button>
      </div>
    );
  }

}

TweetBatchButton.propTypes = {
  nextBatchMessage: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
