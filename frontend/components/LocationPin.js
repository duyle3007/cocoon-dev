import { SendOutlined } from "@ant-design/icons";

const LocationPin = ({ text }) => (
  <div className="pin">
    <SendOutlined />
    <p className="pin-text">{text}</p>
  </div>
);

export default LocationPin;
