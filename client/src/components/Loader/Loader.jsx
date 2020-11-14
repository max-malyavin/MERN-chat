import { useSelector } from "react-redux";
import React from "react";

import { selectError } from "../../store/ducks/error/selectors";
import "./Loader.scss";
import { Button } from "antd";

const Relogin = () => {
  localStorage.removeItem("token");
  window.location.replace("/login");
}; // OR useCallback

export const Loader = () => {
  const { error } = useSelector(selectError);

  return (
    <div id="cube-loader">
      <div className="caption">
        <div className="cube-loader">
          <div className="cube loader-1" />
          <div className="cube loader-2" />
          <div className="cube loader-4" />
          <div className="cube loader-3" />
        </div>
        <div className="link-to-relogin">
          {error && (
            <Button className="link-to-relogin__btn" onClick={Relogin}>
              Перелогиниться
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
