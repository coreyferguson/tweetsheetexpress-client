
import PropTypes from 'prop-types';
import React from 'react';

export default class Nav extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  render() {
    const session = (this.props.data.authorized)
      ? <p> Logged In </p>
      : <a className='button' href={this.props.data.authorizationUrl}>Login</a>;
    return (
      <nav className='navbar'>
        <div className='navbar-brand'>
          <div className='navbar-item'>
            {this.props.loading ? <h1>Loading...</h1> : session}
          </div>
        </div>
      </nav>
    );
  }

};

Nav.propTypes = {
  authorized: PropTypes.bool.isRequired,
  authorizationUrl: PropTypes.string,
  onMount: PropTypes.func
};

Nav.defaultProps = {
  authorized: false,
  authorizationUrl: ''
};
