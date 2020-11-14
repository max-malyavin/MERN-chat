import { Button as BaseButton } from "antd";
import React from "react";
import classNames from "classnames";
import "./Button.scss";

const Button = (props) => {
  return (
    <BaseButton className={classNames("button", props.className)} {...props} />
  );
};

export default Button;
