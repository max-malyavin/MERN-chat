import { messagesAPI } from "../../../api/messages";
import {
  MESSAGES_ADD_MESSAGE,
  MESSAGES_SET_IS_LOADING,
  MESSAGES_SET_ITEMS,
} from "./constants";

export const actionsMessages = {
  setMessages: (items) => ({
    type: MESSAGES_SET_ITEMS,
    payload: items,
  }),
  addMessages: (message) => (dispatch, getState) => {
    const { dialogs } = getState();

    const { currentDialog } = dialogs;

    if (currentDialog === message.dialog._id) {
      dispatch({
        type: MESSAGES_ADD_MESSAGE,
        payload: message,
      });
    }
  },
  fetchSendMessage: (text) => (dispatch, getState) => {
    const {
      dialogs: { currentDialog },
    } = getState();

    messagesAPI.send(text, currentDialog);
  },
  setIsLoading: (items) => ({
    type: MESSAGES_SET_IS_LOADING,
    payload: items,
  }),
  fetchMessages: (ID) => async (dispatch) => {
    try {
      dispatch(actionsMessages.setIsLoading(true));
      const response = await messagesAPI.getAll(ID);
      dispatch(actionsMessages.setMessages(response.data));
    } catch (error) {
      dispatch(actionsMessages.setIsLoading(true));
    }
  },
};
