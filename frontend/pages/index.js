import axios from "axios";

import HomePage from "components/pages/HomePage/HomePage";

export default function Home() {
  return <HomePage />;
}

// export async function getServerSideProps(context) {
//   try {
//     const { data: resMoto } = await axios.get(
//       "https://cocoonluxury.in/wp-json/mphb/v1/accommodation_types",
//       {
//         auth: {
//           username: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
//           password: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
//         },
//       }
//     );
//     const { data: resWp } = await axios.get(
//       "https://cocoonluxury.in/wp-json/wp/v2/mphb_room_type"
//     );
//     return {
//       props: { propertyList: resMoto.data },
//     };
//   } catch (err) {
//     console.log("Fetch list data", err);
//   }
// }
