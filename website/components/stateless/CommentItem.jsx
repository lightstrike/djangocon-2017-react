import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  content: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

function CommentItem({ content, createdDate, userName }) {
  return (
    <section>
      <p>
        <span>{userName}</span>
        <span> on {createdDate}</span>
      </p>
      <p>{content}</p>
    </section>
  );
}

CommentItem.propTypes = propTypes;

export default CommentItem;
