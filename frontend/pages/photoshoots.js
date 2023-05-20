import dynamic from "next/dynamic";

const PhotoshootPage = dynamic(
  () => import("@/components/pages/PhotoshootPage/PhotoshootPage"),
  {
    ssr: false,
  }
);

export default function Photoshoots() {
  return <PhotoshootPage />;
}
