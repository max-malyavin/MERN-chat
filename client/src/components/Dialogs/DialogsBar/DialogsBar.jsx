import { TeamOutlined } from "@ant-design/icons";
import React, { memo, useState } from "react";
import { Modal, Button, Typography, Select, Input, Form } from "antd";
import { loginAPI } from "../../../api/user";
import { gialogsAPI } from "../../../api/dialogs";
import openNotification from "../../../utils/helpers/openNotification";
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

// TODO Use to debounce on search users!!!

const DialogsBar = memo(() => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messageText, setMessageText] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleChangeInput = (value) => {
    setInputValue(value);
  };

  const onSearch = (value) => {
    setIsLoading(true);
    loginAPI
      .findUser(value)
      .then(({ data }) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleCancel = (e) => {
    setVisible(false);
    setSelectedUserID(false);
    setInputValue(false);
  };

  const onSelectUser = (userID) => {
    setSelectedUserID(userID);
  };

  const onAddDialog = () => {
    setIsLoading(true);
    gialogsAPI
      .create({ partner: selectedUserID, text: messageText })
      .then(({ data }) => {
        // setUsers(data);
        handleCancel();
        setIsLoading(false);
        setMessageText("");
        setInputValue("");
      })
      .catch(() => {
        handleCancel();
        setIsLoading(false);
        setMessageText("");
        setInputValue("");
        setSelectedUserID(false);
        openNotification({
          title: "Такой диалог уже есть",
          type: "error",
          placement: "topLeft",
        });
      });
  };

  const onChangeTextArea = (e) => {
    setMessageText(e.target.value);
  };

  const options = users.map((user) => (
    <Option key={user._id}>{user.fullname}</Option>
  ));

  return (
    <>
      <Text strong>Список диалогов</Text>

      <div>
        <Button shape={"round"} type="primary" onClick={showModal}>
          Создать диалог
        </Button>
        <Modal
          onCancel={handleCancel}
          title="Создать диалог"
          visible={visible}
          footer={[
            <Button key="back" onClick={handleCancel}></Button>,
            <Button
              onClick={onAddDialog}
              disabled={!messageText}
              key="submit"
              type="primary"
              loading={isLoading}
            >
              Создать
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item
              label="Введите имя пользователя или почту"
              rules={[{ required: true, message: "Выберите пользователя" }]}
            >
              <Select
                showSearch
                value={inputValue}
                placeholder={"Введите имя или почту пользователя"}
                style={{ width: "100%" }}
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onSearch={onSearch}
                onChange={handleChangeInput}
                notFoundContent={"Такого пользователя не существует"}
                onSelect={onSelectUser}
              >
                {options}
              </Select>
            </Form.Item>
            {selectedUserID && (
              <Form.Item
                label="Введите текст сообщения"
                rules={[{ required: true, message: "Введите текст" }]}
              >
                <TextArea
                  onChange={onChangeTextArea}
                  value={messageText}
                  placeholder="Введите текст сообщения"
                  autoSize={{ minRows: 3, maxRows: 10 }}
                />
              </Form.Item>
            )}
          </Form>
        </Modal>

        <TeamOutlined style={{ marginLeft: "10px" }} />
      </div>
    </>
  );
});

export default DialogsBar;
