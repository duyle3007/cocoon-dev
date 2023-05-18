import { ArrowRightOutlined } from "@ant-design/icons";

import HotelCard from "../../../HotelCard/HotelCard";

import styles from "./Holiday.module.scss";
import { isMobile } from "@/utils/utils";
import Link from "next/link";

const DATA = [
  {
    name: "Matilda Mansion – Kyle Bay",
    price: "5000",
    location: "New York",
    thumbnailUrl:
      "https://img.freepik.com/free-photo/swimming-pool_74190-2109.jpg",
  },
  {
    name: "Matilda Mansion – Kyle Bay",
    price: "5000",
    location: "New York",
    thumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRovxzbdrLatFAbY6nfi7mAaL0lB3xDB3rIMNKBk5338h0mkud6-XGx5y9ngXRr2kMHVUU&usqp=CAU",
  },
  {
    name: "Matilda Mansion – Kyle Bay",
    price: "5000",
    location: "New York",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzb3J0fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  },
  {
    name: "Matilda Mansion – Kyle Bay",
    price: "5000",
    location: "New York",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/df/Town_and_Country_fh000023.jpg",
  },
  {
    name: "Matilda Mansion – Kyle Bay",
    price: "5000",
    location: "New York",
    thumbnailUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/387643196.jpg?k=b8bb3d79272b39b1b5ed7d130096419770251fc6f6b6302d445990d2d1c2aa39&o=&hp=1",
  },
];
const Holiday = () => {
  return (
    <div className={styles.holidayContainer}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <div>Holiday</div>
          <div>All activities are allowed.</div>
        </div>
        <Link href="/holiday">
          <div className={styles.rightHeader}>
            CHECK ALL
            <span>
              <ArrowRightOutlined />
            </span>
          </div>
        </Link>
      </div>

      <div className={styles.listHotel}>
        {DATA.length > 0 && isMobile()
          ? DATA.slice(0, 3).map((hotel, index) => (
              <HotelCard key={index} item={hotel} className={styles.hotel} />
            ))
          : DATA.map((hotel, index) => (
              <HotelCard key={index} item={hotel} className={styles.hotel} />
            ))}
      </div>
      {isMobile() && (
        <Link href="/holiday">
          <div className={styles.checkAll}>
            CHECK ALL
            <span>
              <ArrowRightOutlined />
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Holiday;
