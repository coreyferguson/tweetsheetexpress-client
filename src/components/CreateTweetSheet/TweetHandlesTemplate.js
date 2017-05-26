
import React from 'react';

export default class TweetHandlesTemplate extends React.Component {

  constructor(props) {
    super(props);
    console.log('props:', props);
    this.setState({
      handles: props.handles,
      tweet: props.tweet
    });
  }

  render() {
    return (
      <div>

        {/* Twitter Handles */ }
        <div className='field'>
          <label className='label'>Twitter handles</label>
          <p className='control'>
            <textarea
                placeholder='Twitter handles'
                className='textarea'
                onChange={this.handleHandlesChange}>
              {this.state.handles}
            </textarea>
          </p>
        </div>

        {/* Tweet */}
        <div className='field'>
          <label className='label'>Tweet</label>
          <p className='control'>
            <textarea
                placeholder='Hello @handle, how are you?'
                className='textarea'
                onChange={this.handleTweetChange}>
              {this.state.tweet}
            </textarea>
          </p>
          <p>{this.charsRemaining()} characters remaining</p>
        </div>

      </div>
    );
  }

  handleHandlesChange(e) {
    this.setState({ handles: e.target.value });
  }

  handleTweetChange(e) {
    this.setState({ tweet: e.target.value });
  }

  charsRemaining() {
    const largestHandle = this.handlesToArray().reduce((accumulator, value) => {
      return (accumulator.length > value.length) ? accumulator : value;
    }) || '';
    const tweetWithLargestHandle = this.state.tweet
      .replace(
        new RegExp(this.props.templateHandle, 'g'),
        largestHandle
      );
    return this.props.maxCharacters - tweetWithLargestHandle.length;
  }

  handlesToArray() {
    return this.state.handles
      .replace(/[\n,]/g, ' ')
      .replace(/ +/g, ' ')
      .trim()
      .split(' ');
  }

}

TweetHandlesTemplate.propTypes = {
  templateHandle: React.PropTypes.string,
  maxCharacters: React.PropTypes.number
};

TweetHandlesTemplate.defaultProps = {
  templateHandle: '@handle',
  maxCharacters: 140
};
