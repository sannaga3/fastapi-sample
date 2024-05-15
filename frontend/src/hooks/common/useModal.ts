import { useState } from "react";

const useModal = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  return { isShowModal, setIsShowModal };
};

export default useModal;
