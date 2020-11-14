import produce, { Draft } from "immer";
import { USER_SET_DATA, USER_SET_LOADING } from "./constants";

const initialUserState = {
  data: null,
  isAuth: window.localStorage.token ? true : false,
  isLoading: false,
};

export const UserReducer = produce((draft, action) => {
  switch (action.type) {
    case USER_SET_DATA:
      draft.data = action.payload;
      draft.isAuth = true;
      break;
    case USER_SET_LOADING:
      draft.isLoading = action.payload;
      break;

    default:
      break;
  }
}, initialUserState);
