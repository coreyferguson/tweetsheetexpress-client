
import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';

export default class Nav extends React.Component {

  componentDidMount() {
    if (this.props.onMount) this.props.onMount();
  }

  render() {
    const loading = this.props.loading;
    const authorized = this.props.data.authorized;
    const user = this.props.data.user;

    let navContent;
    if (loading) {
      navContent = <a className='button is-loading' disabled>Loading ...</a>
    } else if (authorized) {
      navContent = (
        <p>
          Welcome {this.props.data.user.screenName} &nbsp;
          <a className='button'>Sign Out</a>
        </p>
      );
    } else if (!authorized) {
      navContent = (
        <a className='button' href={this.props.data.authorizationUrl}>Login</a>
      );
    }
    return (
      <nav className='navbar'>
        <div className='navbar-brand'>
          <div className='navbar-item is-pulled-right'>
            {navContent}
          </div>
          <div className='is-clearfix'></div>
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
