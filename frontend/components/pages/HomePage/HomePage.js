import Header from "../../Header/Header";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      This is homepage
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBMFpople89Rc8M0oXW0UTdeQbBr_cntkU" }}
        defaultCenter={{
          lat: 10.99835602,
          lng: 77.01502627,
        }}
        defaultZoom={11}
      >
        <LocationPin
          lat={37.42216}
          lng={-122.08427}
          text="1600 Amphitheatre Parkway, Mountain View, california."
        />
      </GoogleMapReact> */}
    </div>
  );
};

export default HomePage;
