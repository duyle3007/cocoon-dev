import dynamic from "next/dynamic";

const HolidayPage = dynamic(
  () => import("@/components/pages/HolidayPage/HolidayPage"),
  {
    ssr: false,
  }
);
export default function HolidayPageWrapper() {
  return <HolidayPage />;
}
