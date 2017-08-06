import { normalize } from 'normalizr';

import { get } from 'website/api/base';
import { apiToReduxFormat } from 'website/api/helpers';
import userSchema from 'website/api/schemas/userSchema';

/**
 * Action Constants
 */
const GET_USER_REQUEST = 'user/GET_USER_REQUEST';
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'user/GET_USER_FAILURE';
const RECEIVE_USER = 'user/RECEIVE_USER';

/**
 * Reducer
 */
const defaultState = {
  byId: {},
  loading: 0,
  updating: 0,
  self: null,
};
export function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return Object.assign({}, state, {
        loading: state.loading + 1,
      });
    }
    case GET_USER_FAILURE:
    case GET_USER_SUCCESS: {
      return Object.assign({}, state, {
        loading: state.loading - 1,
      });
    }
    case RECEIVE_USER: {
      const payload = action.payload;
      if (payload.requestingSelf) {
        return Object.assign({}, state, {
          byId: {
            ...state.byId,
            ...payload.user,
          },
          self: payload.user.id,
        });
      }
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          ...payload.user,
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
function getUserRequest(userId) {
  return {
    type: GET_USER_REQUEST,
    payload: {
      userId,
    },
  };
}

function getUserSuccess(userId) {
  return {
    type: GET_USER_SUCCESS,
    payload: {
      userId,
    },
  };
}

function getUserFailure(userId, status) {
  return {
    type: GET_USER_FAILURE,
    payload: {
      userId,
      status,
    },
  };
}

function receiveUser(user, requestingSelf) {
  // step 1: ensure the incoming object follows js ideoms (camelCase keys and such)
  const reduxUser = apiToReduxFormat(user);

  // step 2: normalize (i.e. flatten) the the incoming object based on a schema
  // you define
  const normalizedUser = normalize(reduxUser, userSchema);

  return {
    type: RECEIVE_USER,
    payload: {
      ...normalizedUser.entities,
      requestingSelf,
    },
  };
}

/**
 * Async (i.e. thunk / saga) Action Creators
 */
export function getUser(userId, forceRequest = false) {
  /**
   * GET an individual user object based on the userId
   */
  return function getUserThunk(dispatch, getState) {
    if (typeof getState().userStore.byId[userId] === 'object' && forceRequest === false) {
      // if the object is already in the store, don't hit the db again
      // (unless we explecitly want to, i.e. "force")
      return null;
    }
    dispatch(getUserRequest(userId));
    // if the userId is 'me', we know that the user in the response is the
    // authenticated user
    const requestingSelf = (userId === 'me');
    return get(`api/v1/users/${userId}/`)
      .then((response) => {
        if (response.status === 200) {
          // 200 response - everything works as expected
          response.json()
            .then(json => dispatch(receiveUser(json, requestingSelf)))
            .then(() => dispatch(getUserSuccess(userId)));
        } else {
          // not a 200 response
          dispatch(getUserFailure(userId, response.status));
        }
      })
      .catch(() => {
        // this happens when an error we didn't / account for occurs
        // (all other errors SHOULD be caught in the above block)
        dispatch(getUserFailure(userId, 520));
        // alert('unknown error 520 in getUser');
      });
  };
}
