import React, { memo } from "react";
import "./Footer.scss";
import { Typography } from "antd";
const { Text } = Typography;

const Footer = memo(() => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div> © 2020</div>
          <div>
            <Text strong>Дизайн</Text> - Malyavin
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
