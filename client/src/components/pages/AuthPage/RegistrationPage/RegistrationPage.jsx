import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import React, { memo, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { actionsUser } from "../../../../store/ducks/user/actions";
import {
  selectIsLoading,
  selectUser,
} from "../../../../store/ducks/user/selectors";
import Button from "../../../Button";
import LayoutAuth from "../LayoutAuth";
import "./RegistrationPage.scss";
const { Title, Paragraph } = Typography;

const RegistrationPage = memo(({ history }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading, shallowEqual);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values) => {
      dispatch(actionsUser.fetchUserReguster(values));
      form.resetFields();
    },
    [dispatch]
  );

  const { isAuth } = useSelector(selectUser, shallowEqual);

  if (isAuth) {
    history.replace("/home");
  }

  return (
    <LayoutAuth>
      <LayoutAuth.Title>
        <Title level={3}>Регистрация</Title>
        <Paragraph type="secondary">Пожалуйста,создайте свой аккаунт</Paragraph>
      </LayoutAuth.Title>
      <LayoutAuth.Form>
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            hasFeedback
            name="email"
            rules={[
              {
                required: true,
                message: "Введите почту",
              },
              {
                pattern: "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}",
                message: "Введите корректно почту!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
              type="email"
            />
          </Form.Item>

          <Form.Item
            name="fullname"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Введите имя",
              },
              {
                pattern: `.{2}`,
                message: "Минимальная длинна 2 символа",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Ваше имя"
            />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Введите пароль",
              },
              {
                pattern: `.{3}`,
                message: "Минимальная длинна 3 символа",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item
            name="password2"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Повторите пароль",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Пароли не верны");
                },
              }),
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Повторите пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={isLoading}
              type="primary"
              size="large"
            >
              {isLoading ? "Выполняется регистрация" : "Зарегистрироваться"}
            </Button>
          </Form.Item>

          <Link className="link" to="/login">
            Войти в аккаунт
          </Link>
        </Form>
      </LayoutAuth.Form>
    </LayoutAuth>
  );
});

export default RegistrationPage;
