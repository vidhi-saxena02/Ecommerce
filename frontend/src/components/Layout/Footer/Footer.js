import React from "react";
import playstore from "../../../assets/playstore.png";
import appstore from "../../../assets/appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>ECM.</h1>
        <p>High Quality is Our priority</p>
        <p>Copyrights 2023 &copy</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="https://www.facebook.com/">Facebook</a>
        <a href="https://twitter.com/">Twitter</a>
        <a href="https://www.instagram.com/">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
