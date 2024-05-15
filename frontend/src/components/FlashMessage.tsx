import { FlashMessageProps } from "@/types/components/common";
import { FC } from "react";

const FlashMessage: FC<FlashMessageProps> = ({ flashMessage }) => {
  const successColor: string = "border-teal-500 text-teal-500";
  const errorColor: string = "border-red-700 text-red-700";
  const color: string =
    flashMessage?.type && flashMessage.type === "success"
      ? successColor
      : errorColor;

  return (
    <>
      {flashMessage?.message &&
        Object.keys(flashMessage.message).length > 0 && (
          <div className={`border-2 ${color} p-3 mb-4`}>
            <p>{flashMessage.message}</p>
          </div>
        )}
    </>
  );
};

export default FlashMessage;
