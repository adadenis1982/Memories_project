import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';

export const rootReducer = combineReducers({
  postsReducer,
});
