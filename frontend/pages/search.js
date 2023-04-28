import dynamic from "next/dynamic";
import Head from "next/head";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Search - Cocoon Luxury Properties</title>
      </Head>
      <LeafletMap />
    </>
  );
}
