import Image from "@/components/Image/Image";
import { LeftOutlined } from "@ant-design/icons";

import styles from "./ToolBarMobile.module.scss";
import { useRouter } from "next/router";

const ToolBarMobile = ({ onClickFilter }) => {
  const router = useRouter();

  return (
    <div className={styles.toolBarMobile}>
      <LeftOutlined onClick={() => router.back()} />
      <div className="flex gap-4">
        <Image src="/searchPage/sort.svg" />
        <Image src="/searchPage/filterMobile.svg" onClick={onClickFilter} />
      </div>
    </div>
  );
};

export default ToolBarMobile;
