import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: undefined,
  userRoles: []
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_START:
      return {
        ...state,
        user: undefined,
      };
    case actionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload["user"],
        userRoles: action.payload["userRoles"],
      };
    default:
      return state;
  }
};
export default auth