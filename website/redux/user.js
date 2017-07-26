/**
 * Action Constants
 */


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
    default:
      return state;
  }
}

/**
 * Normal (i.e. non-thunk / non-async) Action Creators
 */


/**
 * Async (i.e. thunk / saga) Action Creators
 */
