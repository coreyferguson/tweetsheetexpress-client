
import React from 'react';

export default class CreateTweetSheetView extends React.Component {

  constructor(props) {
    super(props);
    props.maxCharacters = props.maxCharacters || 140;
    props.templateHandle = props.templateHandle || '@handle';
    this.state = {
      handles: props.handles || '',
      message: props.message || ''
    }
    this.handleHandlesChange = this.handleHandlesChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className='columns'>

        <form onSubmit={this.handleSubmit}>

          {/* Twitter Handles */ }
          <div className='field'>
            <label className='label'>Twitter handles</label>
            <p className='control'>
              <textarea
                  placeholder='Twitter handles'
                  className='textarea'
                  rows='10'
                  cols='50'
                  onChange={this.handleHandlesChange}>
                {this.state.handles}
              </textarea>
            </p>
          </div>

          {/* Message */}
          <div className='field'>
            <label className='label'>Message: </label>
            <p className='control'>
              <textarea
                  placeholder='Hello @handle, how are you?'
                  className='textarea'
                  rows='10'
                  cols='50'
                  onChange={this.handleMessageChange}>
                {this.state.message}
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

      </div>
    );
  }

  handleHandlesChange(e) {
    this.setState({ handles: e.target.value });
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onCreate({
      handles: this.handlesToArray(),
      message: this.state.message
    })
  }

  charsRemaining() {
    const largestHandle = this.handlesToArray().reduce((accumulator, value) => {
      return (accumulator.length > value.length) ? accumulator : value;
    }) || '';
    const messageWithLargestHandle = this.state.message
      .replace(
        new RegExp(this.props.templateHandle, 'g'),
        largestHandle
      );
    return this.props.maxCharacters - messageWithLargestHandle.length;
  }

  handlesToArray() {
    return this.state.handles
      .replace(/[\n,]/g, ' ')
      .trim()
      .split(' ');
  }

}

CreateTweetSheetView.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
};
