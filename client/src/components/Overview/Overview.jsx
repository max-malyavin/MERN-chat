import React, { memo, useEffect } from "react";
import "./Overview.scss";

import { Avatar, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDialogPartner,
  selectDialogs,
} from "../../store/ducks/dialogs/selectors";
import usePrevious from "../ContentMain/usePrev";
import { UserOutlined } from "@ant-design/icons";
import { actionsDialogs } from "../../store/ducks/dialogs/actions";
import formatDistance from "date-fns/formatDistance";
import ruLang from "date-fns/locale/ru";
const selectUser = (state) => state.user;

export const formatDate = (date) => {
  const now = Date.parse(date);
  return formatDistance(now, new Date(), { locale: ruLang });
};
const { Panel } = Collapse;

const Overview = memo(() => {
  const { currentDialog, partner, items } = useSelector(selectDialogs);
  const prevCurrentDialog = usePrevious({ currentDialog });
  const dispatch = useDispatch();
  let partnerObj = {};
  const { data } = useSelector(selectUser);

  useEffect(() => {
    if (currentDialog && prevCurrentDialog.currentDialog !== currentDialog) {
      dispatch(actionsDialogs.fetchPartner(currentDialog));
    }
  }, [currentDialog]);

  if (!items.length || !currentDialog) {
    return null;
  }

  const currentDialogObj = items.filter(
    (dialog) => dialog._id === currentDialog
  )[0];

  if (currentDialogObj.author._id === data._id) {
    partnerObj = currentDialogObj.partner;
  } else {
    partnerObj = currentDialogObj.author;
  }

  if (!currentDialog) {
    return null;
  }
  if (!currentDialog && !partnerObj) {
    return null;
  }
  console.log(partnerObj);
  return (
    <Collapse defaultActiveKey={["1"]} ghost>
      <Panel header="Информация" key="1" style={{ textAlign: "center" }}>
        <Avatar size={120} icon={<UserOutlined />} />
        <div style={{ marginTop: "20px" }}>{partnerObj.fullname}</div>
        <div style={{ marginTop: "20px" }}>
          Дата регистрации:
          <div> {formatDate(partnerObj.createdAt)}</div>
        </div>
      </Panel>
      <Panel header="Интересы" key="2" style={{ textAlign: "center" }}>
        <p>Функционал в разработке!</p>
      </Panel>
      <Panel header="Общие друзья" key="3" style={{ textAlign: "center" }}>
        <p>Функционал в разработке!</p>
      </Panel>
    </Collapse>
  );
});

export default Overview;
