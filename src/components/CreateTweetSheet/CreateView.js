
import React from 'react';
import { HeroWrapper } from '../Hero';

export default class CreateView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
      handles: props.handles,
      tweet: props.tweet
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleHandlesChange = this.handleHandlesChange.bind(this);
    this.handleTweetChange = this.handleTweetChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <HeroWrapper title={this.state.title}>
        <form onSubmit={this.handleSubmit}>

          {/* Title */}
          <div className='field'>
            <label className='label'>Title</label>
            <p className='control'>
              <input
                className='input'
                type='text'
                placeholder='tweetsheets'
                onChange={this.handleTitleChange} />
            </p>
          </div>

          {/* Description */}
          <div className='field'>
            <label className='label'>Description</label>
            <p className='control'>
              <input
                className='input'
                type='text'
                placeholder='Short description'
                onChange={this.handleDescriptionChange} />
            </p>
          </div>

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

          <div className='field'>
            <p className='control'>
              <button
                type='submit'
                className={'button is-primary' + ((this.props.loading) ? ' is-loading' : '')}
              >
                Save
              </button>

            </p>
          </div>

        </form>
      </HeroWrapper>
    );
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
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
      title: this.state.title,
      description: this.state.description,
      handles: this.handlesToArray(),
      tweet: this.state.tweet
    });
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

CreateView.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  handles: React.PropTypes.string,
  tweet: React.PropTypes.string,
  loading: React.PropTypes.bool
};

CreateView.defaultProps = {
  title: '',
  description: '',
  handles: '',
  tweet: '',
  maxCharacters: 140,
  templateHandle: '@handle',
  loading: false
};
