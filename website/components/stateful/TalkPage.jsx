import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TalkDetails from 'website/components/stateless/TalkDetails';
import TalkOverview from 'website/components/stateless/TalkOverview';
import VoteCountDisplay from 'website/components/stateless/VoteCountDisplay';
import CommentList from 'website/components/stateless/CommentList';

import { getTalk } from 'website/redux/talk';

class TalkPage extends Component {
  static propTypes = {
    commentStore: PropTypes.object.isRequired,
    getTalkById: PropTypes.func.isRequired,
    talkStore: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  componentWillMount() {
    const { getTalkById, match } = this.props;
    getTalkById(match.params.id);
  }

  render() {
    const { commentStore, match, talkStore } = this.props;

    if (talkStore.isLoading || !talkStore.byId[match.params.id]) {
      return (
        <div>Is loading</div>
      );
    }
    const talk = talkStore.byId[match.params.id].data;
    const comments = talk.comments.map(commentId =>
        commentStore.byId[commentId].data,
    );

    return (
      <div>
        <TalkOverview talk={talk} />
        <TalkDetails
          description={talk.description}
          videoUrl={talk.videoUrl}
        />
        <VoteCountDisplay tally={talk.voteTally} userChoice={talk.userVote} />
        <CommentList comments={comments} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  talkStore: state.talkStore,
  commentStore: state.commentStore,
});

const mapDispatchToProps = dispatch => ({
  getTalkById(talkId) {
    dispatch(getTalk(talkId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TalkPage);
