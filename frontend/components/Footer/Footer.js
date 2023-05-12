import { Button } from "antd";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.signupContainer}>
        <div>GET INSPIRED</div>
        <div>
          To receive updates about exclusive experiences, events, new
          destinations and more, please register your interest.
        </div>
        <Button>SIGN UP</Button>
      </div>

      <div className={styles.cocoonInfo}>
        <div className={styles.left}>
          <img src="/blackLogo.svg" className={styles.logo} />
          Cocoon Luxury Properties provides luxury homes for holiday and
          vacations, corporate events and photoshoots.
        </div>

        <div className={styles.middle}>
          <div className={styles.cocoon}>
            <h4>COCOON</h4>
            <a href="/about-us">About us</a>
            <a href="/photoshoots">Photoshoots / Events</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Term & Conditions</a>
          </div>

          <div className={styles.contact}>
            <h4>CONTACT US</h4>
            <div className={styles.info}>
              <img src="/locationIcon.svg" />
              90, Pitt St, Sydney, NSW 2000
            </div>
            <div className={styles.info}>
              <img src="/phoneIcon.svg" />
              0407 008 176
            </div>
            <div className={styles.info}>
              <img src="/emailIcon.svg" />
              julian@cocoonluxuryproperties.com
            </div>
            <div className={styles.info}>
              <img src="/emailIcon.svg" />
              manish@cocoonluxuryproperties.com
            </div>
          </div>
        </div>
        <div className={styles.seoDaddy}>
          <img
            src="https://seal.godaddy.com/images/3/en/siteseal_gd_3_h_l_m.gif"
            onClick={() =>
              window.open(
                "https://seal.godaddy.com/verifySeal?sealID=BkBJVgIxGHzIUnL8TZHXNpoLFYpajWTOffUkfw0Y0KEXhZVIkMVxZIGfcwVG"
              )
            }
          />
        </div>
      </div>

      <div className={styles.copyrightContainer}>
        <div className={styles.copyright}>
          <div className={styles.left}>
            Copyright 2022 Cocoon Luxury Properties All Rights Reserved.
          </div>

          <div className={styles.right}>
            <h5>Follow us on</h5>
            <img
              src="/homepage/facebookLogo.svg"
              onClick={() =>
                window.open("https://www.facebook.com/cocoonluxuryproperties/")
              }
            />
            <img
              src="/homepage/youtubeLogo.svg"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/channel/UCxprkxhJ9FodghRyyXUfPdw"
                )
              }
            />
            <img
              src="/homepage/linkedInLogo.svg"
              onClick={() =>
                window.open(
                  "https://au.linkedin.com/company/cocoon-luxury-properties"
                )
              }
            />
            <img
              src="/homepage/twitterLogo.svg"
              onClick={() =>
                window.open("https://www.instagram.com/cocoonluxuryproperties/")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
