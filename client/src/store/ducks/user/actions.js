import { loginAPI } from "../../../api/user";
import openNotification from "../../../utils/helpers/openNotification";
import { actionsError } from "../error/actions";
import { USER_SET_DATA, USER_SET_LOADING } from "./constants";

export const actionsUser = {
  setUserData: (data) => ({
    type: USER_SET_DATA,
    payload: data,
  }),
  setLoading: (data) => ({
    type: USER_SET_LOADING,
    payload: data,
  }),
  fetchUserData: () => async (dispatch) => {
    const token = window.localStorage.token;
    window.axios.defaults.headers.common["token"] = token;
    try {
      if (token) {
        const { data } = await loginAPI.getMe();
        dispatch(actionsUser.setUserData(data));
      }
    } catch (error) {
      dispatch(actionsError.setError(1));
      openNotification({
        title: "Перелогиньтесь!",
        text: "Произошел сбой при аутентификации.",
        type: "error",
        duration: 3,
      });
    }
  },
  fetchUserLogin: (postData) => async (dispatch) => {
    try {
      dispatch(actionsUser.setLoading(true));
      const { data } = await loginAPI.login(postData);
      const { status, token } = data;

      if (status === "error") {
        openNotification({
          title: "Ошибка при авторизации",
          text: "Неверный логин или пароль",
          type: "error",
        });
      }

      openNotification({
        title: "Супер =)",
        text: "Авторизация успешна!",
        type: "success",
      });

      window.axios.defaults.headers.common["token"] = token;
      window.localStorage.token = token;
      window.location.replace("/home");
      dispatch(actionsUser.setLoading(false));
    } catch (error) {
      dispatch(actionsUser.setLoading(false));
      openNotification({
        title: "Ошибка при авторизации",
        text: "Аккаунта не существует",
        type: "error",
      });
    }
  },
  fetchUserReguster: (postData) => async (dispatch) => {
    try {
      dispatch(actionsUser.setLoading(true));
      const { data } = await loginAPI.register(postData);
      dispatch(actionsUser.setLoading(false));
      openNotification({
        title: "Регистрация прошла успешна!",
        text: "Попробуйте войти в аккаунт!",
        type: "success",
        duration: 5,
      });
      // setTimeout(() => {
      //   window.location.replace("/login");
      // }, 3000);
    } catch (error) {
      dispatch(actionsUser.setLoading(false));
      openNotification({
        title: "Ошибка при создании",
        type: "error",
      });
    }
  },
};
