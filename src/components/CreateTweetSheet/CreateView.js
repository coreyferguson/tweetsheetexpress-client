
import React from 'react';
import { HeroWrapper } from '../Hero';

export default class CreateView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
      tweetSets: props.tweetSets
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.onCreate({
      title: this.state.title,
      description: this.state.description,
      handles: this.handlesToArray(),
      tweet: this.state.tweet
    });
  }

}

CreateView.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  tweetSets: React.PropTypes.array,
  loading: React.PropTypes.bool,
};

CreateView.defaultProps = {
  title: '',
  description: '',
  tweetSets: [{
    handles: '',
    tweet: ''
  }],
  loading: false
};
