import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

const defaultProps = {
  handleSubmit: null,
  submitting: false,
};

function SignupForm({ handleSubmit, submitting }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <div>
          <Field
            id="email"
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <div>
          <Field
            id="password"
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <button type="submit" disabled={submitting}>Signup</button>
    </form>
  );
}

SignupForm.propTypes = propTypes;
SignupForm.defaultProps = defaultProps;

export default reduxForm({
  form: 'SignupForm',
})(SignupForm);
