
import React from 'react';

export default class CreateView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      handles: props.handles || '',
      tweet: props.tweet || ''
    }
    this.handleHandlesChange = this.handleHandlesChange.bind(this);
    this.handleTweetChange = this.handleTweetChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

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
          <label className='label'>Tweet: </label>
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

        <div className='field'>
          <p className='control'>
            <input type='submit' className='button is-primary' />
          </p>
        </div>

      </form>
    );
  }

  handleHandlesChange(e) {
    this.setState({ handles: e.target.value });
  }

  handleTweetChange(e) {
    this.setState({ tweet: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onCreate({
      handles: this.handlesToArray(),
      tweet: this.state.tweet
    })
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
      .trim()
      .split(' ');
  }

}

CreateView.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
};

CreateView.defaultProps = {
  maxCharacters: 140,
  templateHandle: '@handle'
};
