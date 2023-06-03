import axios from "axios";
import Head from "next/head";

import PropertyDetail from "@/components/pages/PropertyDetail/PropertyDetail";

const PropertiesDetail = ({ propertyDetail }) => {
  return (
    <>
      <Head />
      <PropertyDetail propertyDetail={propertyDetail} />
    </>
  );
};

export default PropertiesDetail;

export async function getServerSideProps({ resolvedUrl }) {
  const propertySlug = resolvedUrl.split("/")[2];
  try {
    const { data: resWp } = await axios.get(
      "https://cocoonluxury.in/wp-json/wp/v2/mphb_room_type"
    );
    const propertyDetailInWp = resWp.find(
      (property) => property.slug === propertySlug
    );

    return {
      props: {
        propertyDetail: propertyDetailInWp,
      },
    };
  } catch (err) {
    console.log("Fetch list data", err);
    return {
      notFound: true,
    };
  }
}
