import { gialogsAPI } from "../../../api/dialogs";
import {
  DIALOGS_SET_ITEMS,
  DIALOGS_SET_CURRENT_DIALOG,
  DIALOGS_SET_LOADING,
  DIALOGS_LAST_MESSAGE_READED_STATUS,
  DIALOGS_SET_PARTNER,
} from "./constants";
import openNotification from "../../../utils/helpers/openNotification";

export const actionsDialogs = {
  setDialogs: (items) => ({
    type: DIALOGS_SET_ITEMS,
    payload: items,
  }),
  updateReadedStatus: ({ userId, dialogId }) => ({
    type: DIALOGS_LAST_MESSAGE_READED_STATUS,
    payload: {
      userId,
      dialogId,
    },
  }),
  setCurrentDialog: (id) => ({
    type: DIALOGS_SET_CURRENT_DIALOG,
    payload: id,
  }),
  setPartner: (data) => ({
    type: DIALOGS_SET_PARTNER,
    payload: data,
  }),
  fetchPartner: (id) => async (dispatch) => {
    try {
      const response = await gialogsAPI.getId(id);
      dispatch(actionsDialogs.setPartner(response.data));
    } catch (error) {
      openNotification({
        text: "Ошибка",
        type: "error",
        duration: 2,
      });
    }
  },
  setLoading: (data) => ({
    type: DIALOGS_SET_LOADING,
    payload: data,
  }),
  fetchDialogs: () => async (dispatch) => {
    try {
      dispatch(actionsDialogs.setLoading(true));
      const response = await gialogsAPI.getAll();
      dispatch(actionsDialogs.setDialogs(response.data));
      dispatch(actionsDialogs.setLoading(false));
    } catch (error) {
      dispatch(actionsDialogs.setLoading(false));
    }
  },
};
