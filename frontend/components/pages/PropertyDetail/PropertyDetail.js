import { Breadcrumb } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

import PropertyImage from "./PropertyImage/PropertyImage";
import PropertyIntro from "./PropertyIntro/PropertyIntro";
import MainTab from "./MainTab/MainTab";
import Calendar from "./Calendar/Calendar";
import RelatedVilla from "./RelatedVilla/RelatedVilla";

import styles from "./PropertyDetail.module.scss";

const dumb_data = {
  name: "Villa Palm Beach",
  location: "Whale Beach",
  price: "3500",
  numBedrooms: 4,
  numBadrooms: 5,
  numSleep: 6,
  minNight: 7,
  description: `Contemporary home for rent near Bondi Beach
  The palm beach accommodation villa is located in the prestigious district of Palm Beach, known for its glamorous settings. The villa is overlooking the Pittwater river with beautiful views of the water and the Ku-ring-gai Chase National park, less than a 10-minute walk to Whale Beach.
  The villa built in the 1930s is a magnificent 4-storey sandstone house offering views of the water. The interior design blends an old and new design to create a comfortable and stately environment. This mansion is an idyllic private hideaway that is likely to leave you with excessive feelings of grandeur. A beautiful cabana with barbeque adjoins the horizon swimming pool, with a pool room adjoining the main house with separate lounge, entertainment, and kitchen areas.
  The outdoor dining area on the rooftop is great for a BBQ lunch. A small play area for kids.
  The pool is not a heated pool. While the adjoining Jacuzzi is heated for free.`,
  img: [
    "https://stylesatlife.com/wp-content/uploads/2021/02/Latest-villa-designs15.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/314234927.jpg?k=21291418450e2c1802e02864677b7cf811321797b1d36aaa55e1019133f82698&o=&hp=1",
    "https://img.staticmb.com/mbcontent/images/uploads/2021/7/villa-vs-house-designs.jpg",
    "https://res.akamaized.net/domain/image/upload/t_web/v1574124428/2015765017_1_1_191015_063210-w4134-h2756_jxraey.jpg",
  ],
  details: {
    bedroom: {
      bedroom1: "1 Queen-size bed with ensuite bathroom",
      bedroom2: "2 single beds, bathroom and walk-in wardrobe",
      bedroom3: "1 Queen-size bed, bathroom and terrace",
      bedroom4: "1 Queen-size bed",
      notice:
        "Strictly no parties are allowed. Villa Palm Beach allows only for family accommodation.",
    },
    concierge:
      "We will do everything we can to make your stay enjoyable. We can provide transport, babysitting, catering and Chefs, on request. Please find out more on our Services Page.",
    neighbourhood:
      "The house is situated in the world-famous beachside suburb of Palm Beach. Located above exclusive Palm Beach, a 3-minute drive from the beachfront and a seven-minute walk.",
    getArround: "A car is considered essential.",
  },
  amenities: [
    "TV / Cable TV",
    "Free Parking",
    "Children",
    "Dryer",
    "Kitchen",
    "Essentials",
    "Heating",
    "Indoor Fireplace",
    "Washer",
  ],
  videos: [
    "https://drive.google.com/uc?id=1w5xZgy1RW6rGWSIT5Y64A8WU5oUdcVIc&export=download",
    "https://drive.google.com/uc?id=1w5xZgy1RW6rGWSIT5Y64A8WU5oUdcVIc&export=download",
  ],
  reviews: [
    {
      name: "BARRY WHITE - DECODED, LONDON",
      title: "Wonderful place",
      date: "Mar 20, 2023",
      rate: 5,
      avatar: "/homepage/aboutus_1.png",
      description:
        "Genuinely surprised at the speed and ease I had with Marbellapads when buying my new home in Marbella. [...] we really did buy the home of our dreams and its only because of the incredible work put in by the Marbellapads team.",
    },
    {
      name: "BARRY WHITE - DECODED, LONDON",
      title: "Wonderful place",
      date: "Mar 20, 2023",
      rate: 5,
      avatar: "/homepage/aboutus_1.png",
      description:
        "Genuinely surprised at the speed and ease I had with Marbellapads when buying my new home in Marbella. [...] we really did buy the home of our dreams and its only because of the incredible work put in by the Marbellapads team.",
    },
    {
      name: "BARRY WHITE - DECODED, LONDON",
      title: "Wonderful place",
      date: "Mar 20, 2023",
      rate: 5,
      avatar: "/homepage/aboutus_1.png",
      description:
        "Genuinely surprised at the speed and ease I had with Marbellapads when buying my new home in Marbella. [...] we really did buy the home of our dreams and its only because of the incredible work put in by the Marbellapads team.",
    },
  ],
  bookedDate: ["4/5/2023", "9/5/2023"],
  relatedVilla: [
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
  ],
};
const PropertyDetail = ({ propertyDetail }) => {
  const [renderClientSideComponent, setRenderClientSideComponent] =
    useState(false);

  useEffect(() => {
    setRenderClientSideComponent(true);
  }, []);

  if (!renderClientSideComponent) {
    return <></>;
  }
  return (
    <div className={styles.propertyDetail}>
      <Breadcrumb
        className={styles.breadcumb}
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: <Link href="/search">Holiday</Link>,
          },
          {
            title: (
              <div
                className={styles.breadcumbActive}
                dangerouslySetInnerHTML={{
                  __html: propertyDetail?.title?.rendered,
                }}
              ></div>
            ),
          },
        ]}
      />
      <div className={styles.propertyMainView}>
        <PropertyImage listImage={propertyDetail?.images} />
        <PropertyIntro info={propertyDetail} />
      </div>

      <MainTab info={propertyDetail} />
      <Calendar info={propertyDetail} />
      {propertyDetail.acf.related_villas.length > 0 && (
        <RelatedVilla info={propertyDetail} />
      )}
    </div>
  );
};

export default PropertyDetail;
