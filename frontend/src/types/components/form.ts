import { Dispatch, SetStateAction } from "react";
import { FieldErrors } from "react-hook-form";

export type CommonProps = {
  textSize?: string;
  useCustomClass?: boolean;
  classProps?: string;
  labelWidth?: string;
  inputWidth?: string;
};

export type RadioButtonProps = CommonProps & {
  label: string;
  name: string;
  selectable: Array<{ key: string; value: string }>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  register: any;
};

export type InputPropsProps = CommonProps & {
  label: string;
  isNotLabel?: boolean;
  name: string;
  type: string;
  step?: number | null;
  min?: number;
  max?: number;
  register: any;
  required?: boolean;
  minLen?: number;
  maxLen?: number;
  getValues?: ((name: string) => any) | undefined;
  getValueKey?: string;
  trigger?: string | null;
  wrapperClassProp?: string | null;
  labelClassProp?: string | null;
  inputClassProp?: string | null;
};

export type FormErrorMessageProps = {
  errorProp: FieldErrors | string | null;
};
