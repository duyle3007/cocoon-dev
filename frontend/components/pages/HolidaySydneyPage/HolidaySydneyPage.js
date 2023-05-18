import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const HolidaySydneyPage = ({ mode = "holiday" }) => {
  return <LeafletMap mode={mode} />;
};

export default HolidaySydneyPage;
