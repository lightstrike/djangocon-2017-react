import React, { Component } from 'react';

import LoginForm from 'website/components/stateless/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm handleSubmit={null} />
      </div>
    );
  }
}

export default LoginPage;
