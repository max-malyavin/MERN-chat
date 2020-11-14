import { Badge } from "antd";
import React from "react";

import { useSelector } from "react-redux";
import { selectDialogs } from "../../store/ducks/dialogs/selectors";
import { selectUser } from "../../store/ducks/user/selectors";

const Status = () => {
  const { data } = useSelector(selectUser);
  const { currentDialog, items } = useSelector(selectDialogs);

  if (!items.length || !currentDialog) {
    return null;
  }

  const currentDialogObj = items.filter(
    (dialog) => dialog._id === currentDialog
  )[0];

  let partner = {};

  if (currentDialogObj.author._id === data._id) {
    partner = currentDialogObj.partner;
  } else {
    partner = currentDialogObj.author;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span style={{ marginRight: "25px" }}>{partner.fullname}</span>
      {/* <Badge
        // dot={true}
        offset={[-50, 9]}
        style={{
          height: "10px",
          width: "10px",
          backgroundColor: partner.isOnline ? "#52c41a" : "red",
        }}
      >
        {partner.isOnline ? "online" : "offline"}
      </Badge> */}
    </div>
  );
};

export default Status;
