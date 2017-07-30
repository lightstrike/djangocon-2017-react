import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

const defaultProps = {
  isLoggedIn: false,
  user: undefined,
};

function UserSection({ isLoggedIn, user }) {
  return (
    <section>
      {user &&
        <span>Hi {user}</span>
      }
      {isLoggedIn ? (
        <buttons>
          <button>Add Talk</button>
          <button>Logout</button>
        </buttons>
      ) : (
        <buttons>
          <button>Signup</button>
          <button>Login</button>
        </buttons>
      )}
    </section>
  );
}

UserSection.propTypes = propTypes;
UserSection.defaultProps = defaultProps;

export default UserSection;
