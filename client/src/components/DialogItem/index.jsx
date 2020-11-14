import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import React, { memo, useCallback } from "react";
import "./DialogItem.scss";
import { actionsDialogs } from "../../store/ducks/dialogs/actions";
import { useDispatch, useSelector } from "react-redux";
import { isToday } from "date-fns";
import { selectDialogs } from "../../store/ducks/dialogs/selectors";
import { selectUser } from "../../store/ducks/user/selectors";
import formatDistance from "date-fns/formatDistance";
import ruLang from "date-fns/locale/ru";

const getMessageTime = (createdAt) => {
  console.log(createdAt);
  if (isToday(createdAt)) {
    return "timer";
  } else {
    return "time";
  }
};

const renderLastMessage = (message, userId) => {
  let text = "";
  if (!message.text && message.attachments.length) {
    text = "прикрепленный файл";
  } else {
    text = message.text;
  }

  return `${message.user._id === userId ? "Вы: " : ""}${text}`;
};

export const formatDate = (date) => {
  const now = Date.parse(date);
  return formatDistance(now, new Date(), { locale: ruLang });
};

const DialogItem = memo((props) => {
  const { _id, lastMessage, partner, author } = props;
  console.log(author);
  const dispatch = useDispatch();
  const { currentDialog } = useSelector(selectDialogs);
  const { data } = useSelector(selectUser);

  const setDialogId = useCallback(() => {
    dispatch(actionsDialogs.setCurrentDialog(_id));
  }, [dispatch]);
  return (
    <div
      className="dialogs__inner"
      onClick={setDialogId}
      style={{
        backgroundColor: currentDialog === _id && "#40A9FF",
        borderRadius: "15px",
        width: "100%",
      }}
    >
      <div className="dialogs__item">
        <div className="dialogs__avatar">
          <Badge
            // dot={lastMessage.user.isOnline}
            offset={[-8, 40]}
            style={{
              height: "10px",
              width: "10px",
              backgroundColor: "#52c41a",
            }}
          >
            <Avatar size={45} icon={<UserOutlined />} />
          </Badge>
        </div>
        <div className="dialogs__info">
          <div className="dialogs__info-top">
            <b>{partner.fullname}</b>
            <span className="dialogs__date">
              {formatDate(lastMessage.createdAt)}
            </span>
          </div>
          <div
            className="dialogs__info-bottom"
            style={{ position: "relative" }}
          >
            {/* <p>{lastMessage.text}</p> */}
            <p>{renderLastMessage(lastMessage, data._id)}</p>

            <div style={{ position: "absolute", right: "0", top: "0" }}>
              {/* {unreaded > 0 && <Badge count={unreaded} />} */}
              {/* {isMe &&
                  (isReaded ? (
                    <CheckCircleOutlined
                      className={classNames("check", {
                        "check-me": isMe,
                      })}
                    />
                  ) : (
                    <CheckOutlined
                      className={classNames("check", {
                        "check-me": isMe,
                      })}
                    />
                  ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DialogItem;
