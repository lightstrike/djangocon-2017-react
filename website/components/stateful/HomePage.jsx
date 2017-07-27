import React, { Component } from 'react';

import Header from 'website/components/stateless/Header';
import TalksList from 'website/components/stateless/TalksList';
import Footer from 'website/components/stateless/Footer';

class HomePage extends Component {
  render() {
    return (
      <div>
        <TalksList />
      </div>
    );
  }
}

export default HomePage;
