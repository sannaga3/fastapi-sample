import { ModalProps } from "@/types/components/common";
import { FC } from "react";
import Button from "./Button";

const Modal: FC<ModalProps> = ({
  children,
  isShow = false,
  closeModal,
  sizeProps = { width: null, height: null },
}) => {
  return (
    <>
      {isShow && (
        <div
          className="border border-slate-300 rounded-md bg-slate-100 pb-3 shadow-lg"
          style={{
            width: sizeProps?.width ?? "100%",
            height: sizeProps?.height ?? "auto",
          }}
        >
          <div className="relative w-full mb-7">
            <Button
              text="✖︎"
              type="button"
              onClick={() => closeModal()}
              useCustomClass={true}
              classProps="absolute right-2 top-1 text-red-600 font-semibold cursor-pointer hover:scale-105 z-10"
            />
          </div>
          <div>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
