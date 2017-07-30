import React from 'react';
import PropTypes from 'prop-types';

import TalkRow from 'website/components/stateless/TalkRow';

const propTypes = {
  talks: PropTypes.array.isRequired,
};

const defaultProps = {
  talks: null,
};

function TalksList({ talks }) {
  const talkRows = talks.map(talk =>
    <TalkRow key={talk.id.toString()} talk={talk} />,
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
