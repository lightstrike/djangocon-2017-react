import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { getUser } from 'website/redux/user';

import Header from 'website/components/stateful/Header';
import HomePage from 'website/components/stateful/HomePage';
import TalkPage from 'website/components/stateful/TalkPage';
import Footer from 'website/components/stateless/Footer';

const mapDispatchToProps = dispatch => ({
  getSelf() {
    dispatch(getUser('me'));
  },
});

class App extends Component {

  componentDidMount() {
    this.props.getSelf();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header heading="Great Django Talks" />
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

App.propTypes = {
  getSelf: PropTypes.func.isRequired,
};

const ConnectedApp = connect(
  null,
  mapDispatchToProps,
)(App);

export default ConnectedApp;
