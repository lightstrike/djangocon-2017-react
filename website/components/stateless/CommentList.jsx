import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from 'website/components/stateless/CommentItem';

const propTypes = {
  comments: PropTypes.array.isRequired,
};

const defaultProps = {
  comments: null,
};

function CommentList({ comments }) {
  const commentItems = comments.map(comment =>
    <CommentItem
      key={comment.id.toString()}
      content={comment.content}
      createdDate={comment.created}
      userName={comment.user}
    />,
  );

  return (
    <div>
      <h2>Comments</h2>
      <div>{commentItems}</div>
    </div>
  );
}

CommentList.propTypes = propTypes;
CommentList.defaultProps = defaultProps;

export default CommentList;
