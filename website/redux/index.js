import { combineReducers } from 'redux';

import { reducer as commentStore } from 'website/redux/comment';
import { reducer as talkStore } from 'website/redux/talk';
import { reducer as userStore } from 'website/redux/user';
import { reducer as voteStore } from 'website/redux/vote';

const rootReducer: Function = combineReducers({
  // model reducers (correspond with backend data models and corresponding apis)
  commentStore,
  talkStore,
  userStore,
  voteStore,
  // other reducers (no corresponding backend data model and api)
});

export default rootReducer;
