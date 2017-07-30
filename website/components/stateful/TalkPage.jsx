import React, { Component } from 'react';
import talksData from 'website/mocks/talks.json';

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
        <h1>{this.state.talk.title}</h1>
        <h3>{this.state.talk.speaker_name}</h3>
        <h4>{this.state.talk.date}</h4>
        <p>{this.state.talk.description}</p>
      </div>
    );
  }
}

export default TalkPage;
