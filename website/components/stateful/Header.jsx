import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UserSection from 'website/components/stateless/UserSection';

const propTypes = {
  heading: PropTypes.string.isRequired,
};

const defaultProps = {
  heading: 'Django Talks',
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
    };
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-toggleable-md row" style={{ backgroundColor: '#092E20' }}>
        <ul className="nav navbar-nav col-md-12">
          <li className="nav-item col-md-4">
            <Link to="/">{this.props.heading}</Link>
          </li>
          <UserSection isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        </ul>
      </nav>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
