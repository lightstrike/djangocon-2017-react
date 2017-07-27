import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from 'website/components/stateful/Header';
import HomePage from 'website/components/stateful/HomePage';
import TalkPage from 'website/components/stateful/TalkPage';
import Footer from 'website/components/stateless/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header heading="Django Talks" />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/:slug" component={TalkPage} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
