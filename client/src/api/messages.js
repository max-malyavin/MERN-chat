import { istance } from "./api";

export const messagesAPI = {
  getAll(id) {
    return istance.get(`messages?dialog=${id}`);
  },
  send(text, dialogId) {
    return istance.post(`messages`, {
      text: text,
      dialog_id: dialogId,
    });
  },
};
