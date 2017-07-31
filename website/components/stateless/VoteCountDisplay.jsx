import React from 'react';
import PropTypes from 'prop-types';

import VoteArrow from 'website/components/stateless/VoteArrow';

const propTypes = {
  tally: PropTypes.number,
  userChoice: PropTypes.string,
};

const defaultProps = {
  tally: 0,
  userChoice: null,
};

function VoteCountDisplay({ tally, userChoice }) {
  return (
    <section>
      <VoteArrow direction="+1" userChoice={userChoice} />
      <strong><em>{tally}</em></strong>
      <VoteArrow direction="-1" userChoice={userChoice} />
    </section>
  );
}

VoteCountDisplay.propTypes = propTypes;
VoteCountDisplay.defaultProps = defaultProps;

export default VoteCountDisplay;
