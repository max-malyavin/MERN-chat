import { istance } from "./api";

export const loginAPI = {
  login(postData) {
    return istance.post(`user/signin`, postData);
  },
  getMe() {
    return istance.get(`user/me`);
  },
  register(postData) {
    return istance.post(`user/signup`, postData);
  },
  findUser(query) {
    return istance.get(`user/find?query=${query}`);
  },
};
