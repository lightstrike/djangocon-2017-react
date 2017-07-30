import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  talks: PropTypes.Array.isRequired,
};

const defaultProps = {
  talks: null,
};

function TalksList({ talks }) {
  const talkRows = talks.map(talk =>
    <div>
      <Link to={`${talk.id}`}>
        <h2>{talk.title}</h2>
      </Link>
      <h3>{talk.speaker_name}</h3>
      <h4>{talk.date}</h4>
    </div>,
  );

  return (
    <div>
      <h1>Talks List</h1>
      <div>{talkRows}</div>
    </div>
  );
}

TalksList.propTypes = propTypes;
TalksList.defaultProps = defaultProps;

export default TalksList;
