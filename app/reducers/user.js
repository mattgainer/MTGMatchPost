import { SET_USER_ID } from '../actions/user';

const initialState = {
  userId: null,
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state,
        userId: action.userId,
        token: action.token,
      };
    default:
      return state;
  }
};