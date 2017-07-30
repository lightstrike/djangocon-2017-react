import React, { Component } from 'react';

import talksData from 'website/mocks/talks.json';
import TalkDetails from 'website/components/stateless/TalkDetails';
import TalkOverview from 'website/components/stateless/TalkOverview';
import VoteCountDisplay from 'website/components/stateless/VoteCountDisplay';

class TalkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talk: talksData[0],
    };
  }

  render() {
    return (
      <div>
        <TalkOverview talk={this.state.talk} />
        <TalkDetails
          description={this.state.talk.description}
          videoUrl={this.state.talk.videoUrl}
        />
        <VoteCountDisplay tally={this.state.talk.voteTally} userChoice={this.state.talk.userVote} />
      </div>
    );
  }
}

export default TalkPage;
