import { combineReducers } from "redux";
import { DialogsReducer } from "./ducks/dialogs/reducer";
import { ErrorReducer } from "./ducks/error/reducer";
import { MessagesReducer } from "./ducks/messages/reducer";
import { UserReducer } from "./ducks/user/reducer";

export default combineReducers({
  dialogs: DialogsReducer,
  messages: MessagesReducer,
  user: UserReducer,
  error: ErrorReducer,
});
