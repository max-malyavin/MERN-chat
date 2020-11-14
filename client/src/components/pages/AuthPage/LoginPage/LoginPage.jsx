import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Button from "../../../Button";
import LayoutAuth from "../LayoutAuth";
import { actionsUser } from "../../../../store/ducks/user/actions";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  selectIsLoading,
  selectUser,
} from "../../../../store/ducks/user/selectors";
import { Form, Input, Typography } from "antd";
const { Title, Paragraph } = Typography;

const LoginPage = memo(({ history }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading, shallowEqual);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values) => dispatch(actionsUser.fetchUserLogin(values)),
    [dispatch]
  );

  const { isAuth } = useSelector(selectUser, shallowEqual);

  if (isAuth) {
    history.replace("/home");
  }

  return (
    <LayoutAuth>
      <LayoutAuth.Title>
        <Title level={3}>Вход</Title>
        <Paragraph type="secondary">
          Пожалуйста,войдите в свой аккаунт
        </Paragraph>
      </LayoutAuth.Title>
      <LayoutAuth.Form>
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            name="email"
            hasFeedback
            rules={[
              { required: true, message: "Введите почту!" },
              {
                pattern: "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}",
                message: "Введите корректно почту!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Логин"
            />
          </Form.Item>
          <Form.Item
            name="password"
            hasFeedback
            rules={[
              { required: true, message: "Введите пароль!" },
              {
                pattern: `.{3}`,
                message: "Минимальная длинна 3 символа",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Пароль"
            />
          </Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="button"
            loading={isLoading}
          >
            {isLoading ? "Запрос выполняется" : "Войти в аккаунт"}
          </Button>
          <Link to="/registration" className="link">
            Регистрация
          </Link>
        </Form>
      </LayoutAuth.Form>
    </LayoutAuth>
  );
});

export default LoginPage;
