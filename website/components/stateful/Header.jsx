import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import UserSection from 'website/components/stateless/UserSection';

const propTypes = {
    heading: PropTypes.string.isRequired, 
}

const defaultProps = {
    heading: 'Django Talks',
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn: false,
            user: undefined
        };
    }

    render() {
        return (
            <nav>
              <Link to='/'>
                <h3>{this.props.heading}</h3>
              </Link>
              <UserSection isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
            </nav>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
