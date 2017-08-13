import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

const defaultProps = {
  isLoggedIn: false,
  user: null,
};

function UserSection({ isLoggedIn, user }) {
  return (
    <li className="nav-item col-md-4 push-md-4">
      {user &&
        <span className="nav-item">Hi {user}</span>
      }
      {isLoggedIn ? (
        <span className="nav-item">
          <button className="btn btn-success">Add Talk</button>
          <button className="btn btn-secondary">Logout</button>
        </span>
      ) : (
        <span className="nav-item">
          <button className="btn btn-success">Signup</button>
          <button className="btn btn-info">Login</button>
        </span>
      )}
    </li>
  );
}

UserSection.propTypes = propTypes;
UserSection.defaultProps = defaultProps;

export default UserSection;
