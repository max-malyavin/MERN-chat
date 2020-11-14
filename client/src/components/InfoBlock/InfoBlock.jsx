import { Typography } from "antd";
import React from "react";
import "./InfoBlock.scss";
const { Title, Paragraph } = Typography;

const InfoBlock = () => {
  return (
    <div className="info__block">
      <Title>Добро пожаловать!</Title>
      <Paragraph>
        В процессе пользования и нахождения багов - прошу написать мне в личку!
      </Paragraph>
      <Paragraph>
        Чат будет постепенно пополняться новым функционалом и дизайном :)
      </Paragraph>
    </div>
  );
};

export default InfoBlock;
