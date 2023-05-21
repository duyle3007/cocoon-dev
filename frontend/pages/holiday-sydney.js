import dynamic from "next/dynamic";

const HolidaySydneyPage = dynamic(
  () => import("@/components/pages/HolidaySydneyPage/HolidaySydneyPage"),
  {
    ssr: false,
  }
);
export default function HolidaySydneyPageWrapper() {
  return <HolidaySydneyPage mode="sydney" />;
}
