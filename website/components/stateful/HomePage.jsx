import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TalksList from 'website/components/stateless/TalksList';

import { getMultipleTalks } from 'website/redux/talk';

class HomePage extends Component {
  static propTypes = {
    getTalksList: PropTypes.func.isRequired,
    talkStore: PropTypes.object.isRequired,
    page: PropTypes.number,
  };

  static defaultProps = {
    page: 1,
  };

  componentWillMount() {
    const { page, getTalksList } = this.props;
    getTalksList(page);
  }

  render() {
    const { page, talkStore } = this.props;

    if (talkStore.isLoading || !talkStore.byPage[page]) {
      return (
        <div>Is loading</div>
      );
    }

    const talks = talkStore.byPage[page].data;

    return (
      <div>
        <TalksList talks={talks} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  talkStore: state.talkStore,
});

const mapDispatchToProps = dispatch => ({
  getTalksList(page) {
    dispatch(getMultipleTalks(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
