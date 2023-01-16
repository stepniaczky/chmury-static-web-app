import * as actionTypes from "./actionTypes";

export const logOut = () => (dispatch) =>{
  dispatch({ type: actionTypes.LOAD_USER_START });
}

export const loadUser = () => (dispatch) => {
  dispatch({ type: actionTypes.LOAD_USER_START });


  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      dispatch({
        type: actionTypes.LOAD_USER_SUCCESS,
        payload: {
          user: payload.clientPrincipal.userDetails,
          userRoles: payload.clientPrincipal.userRoles
        },
      });

    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  getUserInfo()


};