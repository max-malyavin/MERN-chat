import produce, { Draft } from "immer";
import { ERROR_SET_ERROR } from "./constants";

const initialUserState = {
  error: null,
};

export const ErrorReducer = produce((draft, action) => {
  switch (action.type) {
    case ERROR_SET_ERROR:
      draft.error = action.payload;
      break;
    default:
      break;
  }
}, initialUserState);
