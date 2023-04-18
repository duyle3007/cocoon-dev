import { Dropdown, Space } from "antd";
import { DownOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

const destinationItems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        All destinations
      </a>
    ),
  },
  {
    key: "2",
    label: "Australia",
    children: [
      {
        key: "2-1",
        label: "Lower North Shore",
      },
      {
        key: "2-2",
        label: "Central Sydney",
      },
      {
        key: "2-3",
        label: "Eastern Suburbs",
      },
      {
        key: "2-4",
        label: "Eastern Suburbs Beach",
      },
      {
        key: "2-5",
        label: "Bryon Bay",
      },
      {
        key: "2-6",
        label: "Hunter Valley",
      },
      {
        key: "2-7",
        label: "Gold Coast",
      },
      {
        key: "2-8",
        label: "Noosa",
      },
    ],
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        France
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    label: "Egypt",
  },
];

const serviceItems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Holiday
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Photoshoots / Events
      </a>
    ),
  },
];

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img
          src="https://www.edigitalagency.com.au/wp-content/uploads/Disney-logo-png.png"
          className={styles.logo}
        />

        <div className={styles.headerMenu}>
          <span>HOME</span>
          <span>ABOUT US</span>
          <Dropdown menu={{ items: destinationItems }}>
            <div className={styles.dropdown}>
              DESTINATION
              <DownOutlined />
            </div>
          </Dropdown>
          <Dropdown menu={{ items: serviceItems }}>
            <div className={styles.dropdown}>
              SERVICE
              <DownOutlined />
            </div>
          </Dropdown>
          <span>CONTACT US</span>
        </div>

        <div className={styles.contactInfo}>
          <PhoneOutlined />
          <MailOutlined />
          <span>BOOK NOW</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
