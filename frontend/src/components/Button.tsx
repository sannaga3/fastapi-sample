import { useLoading } from "@/hooks/common/useLoadingContext";
import { ButtonProps } from "@/types/components/common";
import { FC } from "react";

const Button: FC<ButtonProps> = ({
  text,
  type,
  onClick,
  color,
  width,
  height,
  textSize = "md",
  useCustomClass = false,
  classProps = "",
  disabled = false,
}) => {
  const { isLoading } = useLoading();

  const size: object = { width: width, height: height };

  const style: string = useCustomClass
    ? classProps
    : `btn btn-${color} text-${textSize} ${classProps}`;

  return (
    <>
      {isLoading ? (
        <div className="mt-10">Loading...</div>
      ) : (
        <button
          onClick={onClick}
          type={type}
          style={size}
          className={style}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
