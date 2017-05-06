
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
      <div>

        <form onSubmit={this.handleSubmit}>

          <h1>tweetsheetexpress</h1>

          {/* Twitter Handles */ }
          <label>Twitter handles</label>
          <br/>
          <textarea
              rows="10"
              cols="50"
              onChange={this.handleHandlesChange}>
            {this.state.handles}
          </textarea>
          <br /><br />

          {/* Message */}
          <label>Message: </label>
          <br />
          <textarea
              rows="10"
              cols="50"
              onChange={this.handleMessageChange}>
            {this.state.message}
          </textarea>
          <br />
          <p>{this.charsRemaining()} characters remaining</p>
          <br /><br />

          <input type='submit' />

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
