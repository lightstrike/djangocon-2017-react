import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  description: PropTypes.string,
  videoUrl: PropTypes.string,
};

const defaultProps = {
  description: null,
  videoUrl: null,
};

function TalkDetails({ description, videoUrl }) {
  return (
    <div>
      <p>{description}</p>
      <iframe
        style={{ width: '100%', height: '500px' }}
        src={videoUrl}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

TalkDetails.propTypes = propTypes;
TalkDetails.defaultProps = defaultProps;

export default TalkDetails;
