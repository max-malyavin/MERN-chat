import { istance } from "./api";

export const gialogsAPI = {
  getAll() {
    return istance.get(`dialogs`);
  },
  getId(id) {
    return istance.get(`user/${id}`);
  },
  create({ partner, text }) {
    return istance.post(`dialogs`, { partner, text });
  },
};
