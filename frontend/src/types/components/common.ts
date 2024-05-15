import { MouseEvent, PropsWithChildren } from "react";

export type ButtonProps = {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  width?: number;
  height?: number;
  textSize?: string;
  useCustomClass?: boolean;
  classProps?: string;
  disabled?: boolean;
};

export type FlashMessageProps = {
  flashMessage: {
    message: string | null;
    type: string | null;
  };
};

export type ModalProps = PropsWithChildren<{
  isShow: boolean;
  closeModal: () => void;
  sizeProps?: {
    width: number | string;
    height: number | string;
  } | null;
}>;
