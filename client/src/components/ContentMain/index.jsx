import { Empty, Spin } from "antd";
import React, { useEffect, memo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../api/socket";
import { selectDialogs } from "../../store/ducks/dialogs/selectors";
import { actionsMessages } from "../../store/ducks/messages/actions";
import { selectMessages } from "../../store/ducks/messages/selectors";
import { selectUser } from "../../store/ducks/user/selectors";
import Message from "../Message";
import usePrevious from "./usePrev";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import InfoBlock from "../InfoBlock/InfoBlock";
import Status from "../Status/Status";
const ContentMain = memo(() => {
  const [values, setValues] = useState("");
  const { items, isLoading } = useSelector(selectMessages);
  const { data } = useSelector(selectUser);
  const { currentDialog } = useSelector(selectDialogs);
  const prevCurrentDialog = usePrevious({ currentDialog });
  const dispatch = useDispatch();

  const onNewMessage = (data) => {
    dispatch(actionsMessages.addMessages(data));
  };

  useEffect(() => {
    if (
      prevCurrentDialog &&
      prevCurrentDialog.currentDialog !== currentDialog
    ) {
      dispatch(actionsMessages.fetchMessages(currentDialog));
    }
    socket.on("SERVER:NEW_MESSAGE", onNewMessage);
    return () => {
      socket.removeAllListeners("SERVER:NEW_MESSAGE", onNewMessage);
    };
  }, [currentDialog, dispatch]);

  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    messagesRef.current &&
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [items]);

  const onSendMessage = (value) => {
    if (values !== "") {
      dispatch(actionsMessages.fetchSendMessage(value));
      setValues("");
    }
  };

  if (!currentDialog) {
    return <InfoBlock />;
  }

  return (
    <>
      <div className="content">
        <div className="content__header">
          <Status />
        </div>

        <div className="content__main">
          {isLoading ? (
            <Spin size="large" />
          ) : items && items.length ? (
            items.map((item) => {
              return (
                <>
                  <Message text={item.text} isMe={data._id === item.user._id} />
                  <div ref={messagesRef} />
                </>
              );
            })
          ) : (
            <Empty description="Пустой диалог" />
          )}
        </div>
      </div>
      <div className="chat-input">
        <div className="chat-input__smile-btn">
          {/* <Picker set='emojione'/> */}
          {/* <SmileOutlined /> */}
        </div>
        <Input
          value={values}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              onSendMessage(values);
            }
          }}
          onChange={(e) => setValues(e.target.value)}
          placeholder="Введите текст"
          size="large"
        />
        <div className="chat-input__actions">
          <SendOutlined onClick={() => onSendMessage(values)} />
        </div>
      </div>
    </>
  );
});

export default ContentMain;
