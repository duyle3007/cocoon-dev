import { Button } from "antd";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "../Image/Image";
import moment from "moment";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.signupContainer}>
        <div className={styles.title}>GET INSPIRED</div>
        <div className={styles.sub}>
          To receive updates about exclusive experiences, events, new
          destinations and more, please register your interest.
        </div>
        <Button>SIGN UP</Button>
      </div>

      <div className={styles.cocoonInfo}>
        <div className={styles.left}>
          <Image src="/blackLogo.svg" className={styles.logo} />
          Cocoon Luxury Properties provides luxury homes for holiday and
          vacations, corporate events and photoshoots.
        </div>

        <div className={styles.middle}>
          <div className={styles.cocoon}>
            <h4>COCOON</h4>
            <Link href="/about-us">About us</Link>
            <Link href="/photoshoots">Photoshoots / Events</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-conditions">Term & Conditions</Link>
          </div>

          <div className={styles.contact}>
            <h4>CONTACT US</h4>
            <div className={styles.info}>
              <Image src="/locationIcon.svg" />
              90, Pitt St, Sydney, NSW 2000
            </div>
            <div className={styles.info}>
              <Image src="/phoneIcon.svg" />
              0407 008 176
            </div>
            <div className={styles.info}>
              <Image src="/emailIcon.svg" />
              julian@cocoonluxuryproperties.com
            </div>
            <div className={styles.info}>
              <Image src="/emailIcon.svg" />
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
            Copyright {moment().format("YYYY")} Cocoon Luxury Properties All
            Rights Reserved.
          </div>

          <div className={styles.right}>
            <h5>Follow us on</h5>
            <div className={styles.socialMedia}>
              <Image
                className={styles.icon}
                src="/homepage/facebookLogo.png"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/cocoonluxuryproperties/"
                  )
                }
              />
              <Image
                className={styles.icon}
                src="/homepage/instagram.png"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/cocoonluxuryproperties"
                  )
                }
              />
              <Image
                className={styles.icon}
                src="/homepage/youtubeLogo.png"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/channel/UCxprkxhJ9FodghRyyXUfPdw"
                  )
                }
              />
              <Image
                className={styles.icon}
                src="/homepage/linkedInLogo.png"
                onClick={() =>
                  window.open(
                    "https://au.linkedin.com/company/cocoon-luxury-properties"
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
