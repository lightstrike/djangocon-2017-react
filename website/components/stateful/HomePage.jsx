import React, { Component } from 'react';

import TalksList from 'website/components/stateless/TalksList';
import talksData from 'website/mocks/talks.json';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            talks: talksData,
        };
    }

    render() {
      return (
        <div>
          <TalksList talks={this.state.talks} />
        </div>
      );
    }
}

export default HomePage;
