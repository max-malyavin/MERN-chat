import produce, { Draft } from "immer";
import {
  DIALOGS_SET_CURRENT_DIALOG,
  DIALOGS_SET_ITEMS,
  DIALOGS_SET_LOADING,
  DIALOGS_SET_PARTNER,
} from "./constants";

const initialUserState = {
  items: [],
  currentDialog: null,
  isLoading: false,
  partner: null,
};

export const DialogsReducer = produce((draft, action) => {
  switch (action.type) {
    case DIALOGS_SET_ITEMS:
      draft.items = action.payload;
      break;

    case DIALOGS_SET_CURRENT_DIALOG:
      draft.currentDialog = action.payload;
      break;
    case DIALOGS_SET_LOADING:
      draft.isLoading = action.payload;
      break;
    case DIALOGS_SET_PARTNER:
      draft.partner = action.payload;
      break;

    default:
      break;
  }
}, initialUserState);
