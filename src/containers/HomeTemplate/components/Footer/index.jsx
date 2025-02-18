import React from "react";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faSnapchat,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

// Material UI
import { Grid } from "@mui/material";

import "./style.scss";

function Footer() {
  return (
    <footer>
      <Grid
        container
        maxWidth="lg"
        sx={{ mx: "auto" }}
        id="footer__container"
        className="container"
      >
        <Grid container className="footer__list">
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">Finnkino</p>
            <a className="footer__list-link" href="/">
              Sự kiện
            </a>
            <a className="footer__list-link" href="/">
              B2B
            </a>
            <a className="footer__list-link" href="/">
              Việc làm
            </a>
            <a className="footer__list-link" href="/">
              Finnkino Oy
            </a>
          </Grid>
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">Chăm sóc khách hàng</p>
            <a className="footer__list-link" href="/">
              Liên hệ
            </a>
            <a className="footer__list-link" href="/">
              Câu hỏi thường gặp
            </a>
          </Grid>
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">Web shop</p>
            <a className="footer__list-link" href="/">
              Chính sách bảo mật
            </a>
            <a className="footer__list-link" href="/">
              Điều khoản sử dụng
            </a>
            <a className="footer__list-link" href="/">
              Các điều khoản của Finnkino Lab
            </a>
          </Grid>
          <Grid item xs={12} lg={3} md={12} className="footer__list-item  list--social">
            <p className="footer__list-title">Mạng xã hội</p>
            <a className="footer__list-link" href="/">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className="footer__list-link" href="/">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="footer__list-link" href="/">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a className="footer__list-link" href="/">
              <FontAwesomeIcon icon={faSnapchat} />
            </a>
            <a className="footer__list-link" href="/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a className="footer__list-link" href="/">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </Grid>
        </Grid>
        <p className="footer__rights pt-5 pb-5">Finnkino Oy - All rights reserved</p>
      </Grid>
    </footer>
  );
}

export default Footer;
