import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

export default function SearchPage() {
  return <LeafletMap />;
}
