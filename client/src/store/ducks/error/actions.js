import { ERROR_SET_ERROR } from "./constants";

export const actionsError = {
  setError: (data) => ({
    type: ERROR_SET_ERROR,
    payload: data,
  }),
};
