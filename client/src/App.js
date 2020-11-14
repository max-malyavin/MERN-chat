import React, { memo, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Home from "./components/pages/Home";
import { actionsUser } from "./store/ducks/user/actions";
import { LoginPage, RegistrationPage } from "./components/pages/AuthPage";
import { selectUser } from "./store/ducks/user/selectors";
import { Loader } from "./components/Loader/Loader";
import "./styles/App.scss";

const App = memo(() => {
  const history = createBrowserHistory();
  const { data, isAuth } = useSelector(selectUser, shallowEqual);
  const dispatch = useDispatch();

  if (!isAuth) {
    history.replace("/login");
  }

  useEffect(() => {
    if (!data) {
      dispatch(actionsUser.fetchUserData());
    }
  }, [data, dispatch]);

  if (isAuth && !data) {
    return <Loader />;
  }
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </div>
  );
});

export default App;
