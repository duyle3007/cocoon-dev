import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const HolidayPage = ({ mode = "holiday" }) => {
  return <LeafletMap mode={mode} />;
};

export default HolidayPage;
