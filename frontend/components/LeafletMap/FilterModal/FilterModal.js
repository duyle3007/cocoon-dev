import { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import SearchForm from "../SearchForm/SearchForm";

import styles from "./FilterModal.module.scss";

// eslint-disable-next-line react/display-name
const FilterModal = forwardRef(({ tabActive }, ref) => {
  const formRef = Form.useFormInstance();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openFilterModal: () => {
      setIsOpen(true);
    },
    closeFilterModal: () => {
      setIsOpen(false);
    },
  }));

  return (
    <Modal
      title={null}
      open={isOpen}
      onOk={() => formRef.submit()}
      onCancel={() => {
        // Remove query "destination" from url
        const { route } = router;
        router.replace(route, undefined, { shallow: true });

        formRef.setFieldsValue({
          destination: null,
          searchValue: null,
          selectedLocation: [],
          villaType: null,
          rangeDate: [null, null],
          rangePrice: [800, 5000],
          maxGuest: null,
          selectedBedroom: "Any",
          selectedBed: "Any",
          selectedBadroom: "Any",
          feature: [],
        });
      }}
      getContainer={false}
      closable={false}
      wrapClassName={styles.modalWrapper}
      okText="APPLY"
      cancelText="RESET"
    >
      <div className={styles.modalHeader}>
        <span>FILTER</span>
        <CloseOutlined onClick={() => setIsOpen(false)} />
      </div>
      <SearchForm tabActive={tabActive} />
    </Modal>
  );
});

export default FilterModal;
