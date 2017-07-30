import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  talk: PropTypes.object.isRequired,
};

const defaultProps = {
  talk: null,
};

function TalkOverview({ talk }) {
  return (
    <div>
      <Link to={`${talk.id}`}>
        <h2>{talk.title}</h2>
      </Link>
      <h3>{talk.speaker_name}</h3>
      <h4>{talk.date}</h4>
    </div>
  );
}

TalkOverview.propTypes = propTypes;
TalkOverview.defaultProps = defaultProps;

export default TalkOverview;
