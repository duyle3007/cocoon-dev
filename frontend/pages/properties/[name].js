import axios from "axios";
import Head from "next/head";

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const {wordpressAPIUrl} = publicRuntimeConfig;

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
      `${wordpressAPIUrl}/mphb_room_type?slug=${propertySlug}`
    );

    return {
      props: {
        propertyDetail: resWp,
      },
    };
  } catch (err) {
    console.log("Fetch list data", err);
    return {
      notFound: true,
    };
  }
}
