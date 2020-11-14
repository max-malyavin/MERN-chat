import Axios from "axios";

export const istance = Axios.create({
  // withCredentials: true,
  baseURL: "",
  // headers: {
  //   // token: window.localStorage.token ? window.localStorage.token : "",
  // },
});
window.axios = istance;
