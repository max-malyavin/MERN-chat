import { Empty, Input, Spin } from "antd";
import React, { memo, useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionsDialogs } from "../../store/ducks/dialogs/actions";
import { selectDialogs } from "../../store/ducks/dialogs/selectors";
import DialogItem from "../DialogItem";
import "./Dialogs.scss";
import socket from "../../api/socket";

const { Search } = Input;

const Dialogs = memo(({ children }) => {
  const { items, isLoading } = useSelector(selectDialogs, shallowEqual);
  const dispatch = useDispatch();
  const [inputValue, setValue] = useState("");
  const [filtered, setFilteredItems] = useState(Array.from(items));

  const onNewDialogs = useCallback(
    () => dispatch(actionsDialogs.fetchDialogs()),
    [dispatch]
  );

  const onChangeInput = (e) => {
    setFilteredItems(
      items.filter(
        (dialog) =>
          dialog.author.fullname
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) >= 0 ||
          dialog.partner.fullname
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) >= 0
      )
    );
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!items.length) {
      onNewDialogs();
    } else {
      setFilteredItems(items);
    }

    socket.on("SERVER:DIALOG_CREATED", onNewDialogs);
    socket.on("SERVER:NEW_MESSAGE", onNewDialogs);
    return () => {
      socket.removeAllListeners("SERVER:DIALOG_CREATED", onNewDialogs);
      socket.removeAllListeners("SERVER:NEW_MESSAGE", onNewDialogs);
    };
  }, [filtered, items]);

  return (
    <div className="dialogs">
      <div className="dialogs__search">{children}</div>

      <Search
        placeholder="Поиск по имени"
        onInput={onChangeInput}
        value={inputValue}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <div className="dialogs__wrapper">
        {!items.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Spin size="large" />
          </div>
        )}

        {
          // isLoading ? (
          //   <div
          //     style={{
          //       display: "flex",
          //       justifyContent: "center",
          //       marginTop: "50px",
          //     }}
          //   >
          //     <Spin size="large" />
          //   </div>
          // ) :
          filtered.length
            ? filtered.map((item) => (
                <DialogItem
                  unreaded={4}
                  // isMe={item.user.id === userId}
                  {...item}
                />
              ))
            : null
          // : (
          //   <Empty description="Ничего не найдено" />
          // )
        }
      </div>
    </div>
  );
});

export default Dialogs;
