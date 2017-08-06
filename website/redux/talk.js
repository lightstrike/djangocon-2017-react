import { normalize } from 'normalizr';

import { get, post } from 'website/api/base';
import { apiToReduxFormat, reduxToApiFormat } from 'website/api/helpers';
import talkSchema from 'website/api/schemas/talkSchema';

/**
 * Action Constants
 */
// GET
const GET_TALK_REQUEST = 'talk/GET_TALK_REQUEST';
const GET_TALK_SUCCESS = 'talk/GET_TALK_SUCCESS';
const GET_TALK_FAILURE = 'talk/GET_TALK_FAILURE';
const GET_MULTIPLE_TALKS_REQUEST = 'talk/GET_MULTIPLE_TALKS_REQUEST';
const GET_MULTIPLE_TALKS_SUCCESS = 'talk/GET_MULTIPLE_TALKS_SUCCESS';
const GET_MULTIPLE_TALKS_FAILURE = 'talk/GET_MULTIPLE_TALKS_FAILURE';
// POST
const POST_TALK_REQUEST = 'talk/POST_TALK_REQUEST';
const POST_TALK_SUCCESS = 'talk/POST_TALK_SUCCESS';
const POST_TALK_FAILURE = 'talk/POST_TALK_FAILURE';
// receive
export const RECEIVE_TALK = 'talk/RECEIVE_TALK';
export const RECEIVE_MULTIPLE_TALKS = 'talk/RECEIVE_MULTIPLE_TALKS';

/**
 * Reducer
 */
const defaultState = {
  byId: {},
  byPage: {},
  loading: 0,
  updating: 0,
};
export function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_TALK_REQUEST:
    case GET_MULTIPLE_TALKS_REQUEST:
    case POST_TALK_REQUEST: {
      return Object.assign({}, state, {
        loading: state.loading + 1,
      });
    }
    case GET_TALK_SUCCESS:
    case GET_TALK_FAILURE:
    case GET_MULTIPLE_TALKS_SUCCESS:
    case GET_MULTIPLE_TALKS_FAILURE:
    case POST_TALK_SUCCESS:
    case POST_TALK_FAILURE: {
      return Object.assign({}, state, {
        loading: state.loading - 1,
      });
    }
    case RECEIVE_TALK: {
      const payload = action.payload;
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          ...payload.talk,
        },
      });
    }
    case RECEIVE_MULTIPLE_TALKS: {
      const payload = action.payload;
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          ...payload.talk,
        },
        byPage: {
          ...state.byPage,
          [payload.page]: payload.talk.map(talk => talk.id),
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
function getTalkRequest(talkId) {
  return {
    type: GET_TALK_REQUEST,
    payload: {
      talkId,
    },
  };
}

function getTalkSuccess(talkId) {
  return {
    type: GET_TALK_SUCCESS,
    payload: {
      talkId,
    },
  };
}

function getTalkFailure(talkId, status) {
  return {
    type: GET_TALK_FAILURE,
    payload: {
      talkId,
      status,
    },
  };
}

function getMultipleTalksRequest(page) {
  return {
    type: GET_MULTIPLE_TALKS_REQUEST,
    payload: {
      page,
    },
  };
}

function getMultipleTalksSuccess(page) {
  return {
    type: GET_MULTIPLE_TALKS_SUCCESS,
    payload: {
      page,
    },
  };
}

function getMultipleTalksFailure(page, status) {
  return {
    type: GET_MULTIPLE_TALKS_FAILURE,
    payload: {
      page,
      status,
    },
  };
}

function postTalkRequest() {
  return {
    type: POST_TALK_REQUEST,
  };
}

function postTalkSuccess() {
  return {
    type: POST_TALK_SUCCESS,
  };
}

function postTalkFailure() {
  return {
    type: POST_TALK_FAILURE,
  };
}

function receiveTalk(talk) {
  // step 1: ensure the incoming object follows js ideoms (camelCase keys and such)
  // console.info('talk', talk);
  const reduxTalk = apiToReduxFormat(talk);
  // console.info('reduxTalk', reduxTalk);

  // step 2: normalize (i.e. flatten) the the incoming object
  const normalizedTalk = normalize(reduxTalk, talkSchema);
  // console.info('normalized', normalizedTalk);

  return {
    type: RECEIVE_TALK,
    payload: {
      ...normalizedTalk.entities,
    },
  };
}

function receiveMultipleTalks(talks, page) {
  // step 1: ensure the incoming object follows js ideoms (camelCase keys and such)
  const reduxTalks = apiToReduxFormat(talks);

  // step 2: normalize (i.e. flatten) the the incoming object
  const normalizedTalks = normalize(reduxTalks, [talkSchema]);

  return {
    type: RECEIVE_MULTIPLE_TALKS,
    payload: {
      ...normalizedTalks.entities,
      page,
    },
  };
}


/**
 * Async (i.e. thunk / saga) Action Creators
 */
export function getTalk(talkId, forceRequest = false) {
  return function getTalkThunk(dispatch, getState) {
    if (typeof getState().talkStore.byId[talkId] === 'object' && forceRequest === false) {
      // if we know the objects are already in the store, don't hit the db again
      // (unless we explecitly want to, i.e. "force")
      return null;
    }
    dispatch(getTalkRequest(talkId));
    return get(`api/v1/talks/${talkId}/`)
      .then((response) => {
        if (response.status === 200) {
          // when we get a 200 response (i.e. everything works as expected)
          response.json()
            .then(json => dispatch(receiveTalk(json)))
            .then(() => dispatch(getTalkSuccess(talkId)));
        } else {
          // not a 200 response
          dispatch(getTalkFailure(talkId, response.status));
        }
      })
      .catch(() => {
        // this happens when an error we didn't / account for occurs
        // (all other errors SHOULD be caught in the above block)
        dispatch(getTalkFailure(talkId, 520));
      });
  };
}

export function getMultipleTalks(page = 1, forceRequest = false) {
  return function getMultipleTalksThunk(dispatch, getState) {
    if (getState().talkStore.byPage[page] && forceRequest === false) {
      // if we know the objects are already in the store, don't hit the db again
      // (unless we explecitly want to, i.e. "force")
      return null;
    }
    dispatch(getMultipleTalksRequest(page));
    return get(`api/v1/talks/?page=${page}`)
      .then((response) => {
        if (response.status === 200) {
          // when we get a 200 response (i.e. everything works as expected)
          response.json()
            .then(json => dispatch(receiveMultipleTalks(json, page)))
            .then(() => dispatch(getMultipleTalksSuccess(page)));
          // not a 200 response
          dispatch(getMultipleTalksFailure(page, response.status));
        }
      })
      .catch(() => {
        // this happens when an error we didn't / account for occurs
        // (all other errors SHOULD be caught in the above block)
        dispatch(getMultipleTalksFailure(page, 520));
        // alert('unknown error 520 in getUser');
      });
  };
}

export function postTalk(body) {
  return function postTalkThunk(dispatch) {
    dispatch(postTalkRequest());
    const apiBody = reduxToApiFormat(body);

    return post('api/v1/talks/', apiBody)
      .then((response) => {
        if (response.status === 201) {
          // when we get a 201 response (i.e. everything works as expected)
          response.json()
            .then((json) => {
              dispatch(receiveTalk(json));
            })
            .then(() => dispatch(postTalkSuccess()));
        } else {
          dispatch(postTalkFailure(response.status));
        }
      })
      .catch(() => {
        // this happens when an error we didn't / account for occurs
        // (all other errors SHOULD be caught in a previous .then() statement)
        dispatch(postTalkFailure(520));
      });
  };
}
