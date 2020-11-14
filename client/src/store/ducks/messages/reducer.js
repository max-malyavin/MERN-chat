import produce, { Draft } from "immer";
import {
  MESSAGES_ADD_MESSAGE,
  MESSAGES_SET_IS_LOADING,
  MESSAGES_SET_ITEMS,
} from "./constants";

const initialUserState = {
  items: null,
  isLoading: false,
};

export const MessagesReducer = produce((draft, action) => {
  switch (action.type) {
    // case UserActionsType.SET_USER:
    case MESSAGES_SET_ITEMS:
      draft.items = action.payload;
      draft.isLoading = false;
      break;

    case MESSAGES_SET_IS_LOADING:
      draft.isLoading = action.payload;
      break;
    case MESSAGES_ADD_MESSAGE:
      draft.items.push(action.payload);
      // draft.items.splice(0, 0, action.payload);
      break;

    // case UserActionsType.SET_LOADING_STATE:
    // case "US":
    // draft.loadingState = action.payload;
    // break;

    default:
      break;
  }
}, initialUserState);
