import React, { Component } from 'react';
import PropTypes from 'prop-types'

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
              <h3>{this.heading}</h3>
              <UserSection isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
            </nav>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
