import { normalize } from 'normalizr';

import { post } from 'website/api/base';
import { apiToReduxFormat, reduxToApiFormat } from 'website/api/helpers';
import commentSchema from 'website/api/schemas/commentSchema';

import { RECEIVE_MULTIPLE_TALKS, RECEIVE_TALK } from 'website/redux/talk';

/**
 * Action Constants
 */
// POST
const POST_COMMENT_REQUEST = 'comment/POST_COMMENT_REQUEST';
const POST_COMMENT_SUCCESS = 'comment/POST_COMMENT_SUCCESS';
const POST_COMMENT_FAILURE = 'comment/POST_COMMENT_FAILURE';
// receive
const RECEIVE_COMMENT = 'comment/RECEIVE_COMMENT';

/**
 * Reducer
 */
const defaultState = {
  byId: {},
  loading: 0,
  updating: 0,
};
export function reducer(state = defaultState, action) {
  switch (action.type) {
    case POST_COMMENT_REQUEST: {
      return Object.assign({}, state, {
        loading: state.loading + 1,
      });
    }
    case POST_COMMENT_SUCCESS:
    case POST_COMMENT_FAILURE: {
      return Object.assign({}, state, {
        loading: state.loading - 1,
      });
    }
    case RECEIVE_COMMENT:
    case RECEIVE_MULTIPLE_TALKS:
    case RECEIVE_TALK: {
      const payload = action.payload;
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          ...payload.comment,
        },
      });
    }
    default:
      return state;
  }
}

/**
 * Normal (i.e. non-thunk / non-async) Action Creators
 */
function postCommentRequest() {
  return {
    type: POST_COMMENT_REQUEST,
  };
}

function postCommentSuccess() {
  return {
    type: POST_COMMENT_SUCCESS,
  };
}

function postCommentFailure() {
  return {
    type: POST_COMMENT_FAILURE,
  };
}

function receiveComment(comment) {
  // step 1: ensure the incoming object follows js ideoms (camelCase keys and such)
  const reduxComment = apiToReduxFormat(comment);

  // step 2: normalize (i.e. flatten) the the incoming object
  const normalizedComment = normalize(reduxComment, commentSchema);

  return {
    type: RECEIVE_COMMENT,
    payload: {
      ...normalizedComment.entities,
    },
  };
}


/**
 * Async (i.e. thunk / saga) Action Creators
 */
export function postComment(body) {
  return function postCommentThunk(dispatch) {
    dispatch(postCommentRequest());
    const apiBody = reduxToApiFormat(body);

    return post('api/v1/comments/', apiBody)
      .then((response) => {
        if (response.status === 201) {
          // when we get a 201 response (i.e. everything works as expected)
          response.json()
            .then((json) => {
              dispatch(receiveComment(json));
            })
            .then(() => dispatch(postCommentSuccess()));
        } else {
          dispatch(postCommentFailure(response.status));
        }
      })
      .catch(() => {
        // this happens when an error we didn't / account for occurs
        // (all other errors SHOULD be caught in a previous .then() statement)
        dispatch(postCommentFailure(520));
      });
  };
}
