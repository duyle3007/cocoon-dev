import Header from "../../Header/Header";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      This is homepage
      <LeafletMap />
    </div>
  );
};

export default HomePage;
