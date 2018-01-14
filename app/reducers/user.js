import { SET_USER_ID } from '../actions/user';

const initialState = {
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.userId };
    default:
      return state;
  }
};