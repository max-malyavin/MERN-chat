import React, { memo } from "react";
import Block from "../../Block";
import "./LayoutAuth.scss";

const LayoutAuth = memo(({ children }) => {
  children = React.Children.toArray(children);
  let titleComponent = children.find((node) => node.type == LayoutAuth.Title);
  let FormComponent = children.find((node) => node.type == LayoutAuth.Form);
  return (
    <div className="auth">
      <div className="content">
        <div className="auth__top">{titleComponent && titleComponent}</div>
        <Block>{FormComponent && FormComponent}</Block>
      </div>
    </div>
  );
});

LayoutAuth.Title = ({ children }) => children;
LayoutAuth.Form = ({ children }) => children;

export default LayoutAuth;
