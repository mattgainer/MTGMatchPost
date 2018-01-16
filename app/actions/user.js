export const SET_USER_ID = 'SET_USER_ID';

export const setUserId = (userId, token) => ({
  type: SET_USER_ID,
  userId: userId,
  token: token,
});