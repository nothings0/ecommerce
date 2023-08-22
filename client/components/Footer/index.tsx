import React from "react";
import Button from "../Button";
import "./index.scss";

const footerData = [
  {
    heading: "Về Digitis",
    texts: ["Giới thiệu", "Liên hệ", "Điều khoản", "Bảo mật"],
  },
  {
    heading: "Chăm sóc khách hàng",
    texts: [
      "Trung tâm trợ giúp",
      "Hướng dẫn bán hàng",
      "Hướng dẫn mua hàng",
      "Trả hàng & hoàn tiền",
    ],
  },
  {
    heading: "Liên hệ",
    texts: ["Facebook", "Instagram", "Linkedln"],
  },
  {
    heading: "General link",
    texts: ["Blog", "Shop", "Instagram", "Category"],
  },
];

const Header: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__text">
            {footerData.map((item, index) => (
              <div className="footer__item" key={index}>
                <h4>{item.heading}</h4>
                {item.texts.map((e, idx) => (
                  <span key={idx}>{e}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="footer__bottom">
          <span>© digitis. International Ltd. 2023</span>
        </div>
      </div>
    </footer>
  );
};

export default Header;
