import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../actionTypes/postsAT';

export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((post) => (post.id === action.payload.id ? action.payload : post));
    case DELETE:
      return state.filter((post) => post.id !== action.payload);
    case LIKE:
      return state.map((post) => (post.id === action.payload.id ? action.payload : post));
    default:
      return state;
  }
};
