import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action?.data);
      localStorage.setItem("profile", JSON.stringify({ ...action?.data })); //sending all login data to local storage
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear(); //clear login data from storage when log out
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
