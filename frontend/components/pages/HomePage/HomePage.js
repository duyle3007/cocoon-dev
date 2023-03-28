import LeafletMap from "@/components/LeafletMap/LeafletMap";
import Header from "../../Header/Header";

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
