// import React, { useRef, useState } from "react";
// import {
//   Avatar,
//   Button,
//   Calendar,
//   Collapse,
//   Drawer,
//   Input,
//   Switch,
// } from "antd";
// import Icon, {
//   AudioOutlined,
//   CameraOutlined,
//   SendOutlined,
//   SmileOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import ContentMain from "../ContentMain";
// import { useDispatch, useSelector } from "react-redux";
// import { actionsMessages } from "../../store/ducks/messages/actions";
// import { selectDialogs } from "../../store/ducks/dialogs/selectors";
// import { useHistory } from "react-router-dom";

// const Content = () => {
//   const { currentDialog } = useSelector(selectDialogs);
//   const dispatch = useDispatch();
//   const messagesRef = useRef(null);
//   const [values, setValues] = useState("");
//   const history = useHistory();

//   // if (!currentDialog) {
//   //   history.push("/home");
//   //   return null;
//   // }

//   let online = false;
//   const onSendMessage = (value) => {
//     dispatch(actionsMessages.fetchSendMessage(value));
//   };
//   return <div>s</div>;
// };

// export default Content;
