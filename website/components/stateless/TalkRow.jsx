import React from 'react';
import PropTypes from 'prop-types';

import TalkOverview from 'website/components/stateless/TalkOverview';
import VoteCountDisplay from 'website/components/stateless/VoteCountDisplay';

const propTypes = {
  talk: PropTypes.object.isRequired,
};

const defaultProps = {
  talk: null,
};

function TalkRow({ talk }) {
  return (
    <div>
      <TalkOverview talk={talk} />
      <VoteCountDisplay tally={talk.voteTally} userChoice={talk.userVote} />
    </div>
  );
}

TalkRow.propTypes = propTypes;
TalkRow.defaultProps = defaultProps;

export default TalkRow;
