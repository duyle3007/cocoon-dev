import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Checkbox, Form, Modal } from "antd";

import { SORT_VALUES } from "../SearchByFilter/SearchByFilter";

import styles from "./SortModal.module.scss";

// eslint-disable-next-line react/display-name
const SortModal = forwardRef(({ tabActive }, ref) => {
  const formRef = Form.useFormInstance();

  const [checkList, setCheckList] = useState(SORT_VALUES[0].value);
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openSortModal: () => {
      setIsOpen(true);
    },
    closeSortModal: () => {
      setIsOpen(false);
    },
  }));

  const onChooseSort = (selectedSort) => {
    setCheckList(selectedSort);
    formRef.setFieldsValue({ sort: selectedSort });
  };

  const onSort = () => {
    formRef.submit();
    setIsOpen(false);
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onOk={() => formRef.submit()}
      onCancel={() => setIsOpen(false)}
      footer={null}
      getContainer={false}
      wrapClassName={styles.sortModalWrapper}
    >
      <div className={styles.modalHeader}>SORT</div>
      <Form.Item hidden name="sort" />
      <div className={styles.modalBody}>
        {SORT_VALUES.map((sort) => (
          <Checkbox
            key={sort.value}
            checked={sort.value === checkList}
            onChange={() => onChooseSort(sort.value)}
          >
            {sort.label}
          </Checkbox>
        ))}
      </div>
      <Button className={styles.applyBtn} onClick={() => onSort()}>
        APPLY
      </Button>
    </Modal>
  );
});

export default SortModal;
