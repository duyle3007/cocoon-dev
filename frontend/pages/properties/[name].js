import PropertyDetail from "@/components/pages/PropertyDetail/PropertyDetail";
import axios from "axios";

const PropertiesDetail = ({ propertyDetail }) => {
  return <PropertyDetail propertyDetail={propertyDetail} />;
};

export default PropertiesDetail;

export async function getServerSideProps({ resolvedUrl }) {
  const propertySlug = resolvedUrl.split("/")[2];
  try {
    const { data: resMoto } = await axios.get(
      "https://cocoonluxury.in/wp-json/mphb/v1/accommodation_types",
      {
        auth: {
          username: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
          password: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
        },
      }
    );
    const { data: resWp } = await axios.get(
      "https://cocoonluxury.in/wp-json/wp/v2/mphb_room_type"
    );
    const propertyDetailInWp = resWp.find(
      (property) => property.slug === propertySlug
    );
    const propertyDetailInMoto = resMoto.find(
      (property) => property.id === propertyDetailInWp.id
    );

    return {
      props: {
        propertyDetail: { ...propertyDetailInMoto, ...propertyDetailInWp },
      },
    };
  } catch (err) {
    console.log("Fetch list data", err);
  }
}
