import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  direction: PropTypes.string,
  userChoice: PropTypes.string,
};

const defaultProps = {
  direction: '+1',
  userChoice: null,
};

function VoteArrow({ direction, userChoice }) {
  return (
    <p>
      {userChoice === direction ? (
        <span><strong>{direction}</strong></span>
      ) : (
        <span>{direction}</span>
      )}
    </p>
  );
}

VoteArrow.propTypes = propTypes;
VoteArrow.defaultProps = defaultProps;

export default VoteArrow;
