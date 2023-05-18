import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const PhotoshootPage = () => {
  return <LeafletMap mode="photoshoot" />;
};

export default PhotoshootPage;
