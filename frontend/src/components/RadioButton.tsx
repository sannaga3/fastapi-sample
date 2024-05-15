import { RadioButtonProps } from "@/types/components/form";
import { FC } from "react";

const RadioButton: FC<RadioButtonProps> = ({
  label,
  name,
  selectable,
  selected,
  setSelected,
  register,
  textSize = "md",
  useCustomClass = false,
  classProps = "",
  labelWidth = "200px",
  inputWidth = "80px",
}) => {
  const style: string = useCustomClass
    ? classProps
    : `flex items-center text-${textSize} ${classProps}`;

  return (
    <div className={`flex text-${textSize}`}>
      <div style={{ width: labelWidth }}>{label} : </div>
      {selectable.map((item) => (
        <div key={item.key} className={style} style={{ width: inputWidth }}>
          <input
            name={name}
            {...register(name)}
            type="radio"
            checked={selected === item.value}
            value={item.value}
            onChange={(e) => setSelected(e.target.value)}
            className="mr-2 bg-slate-400"
          />
          <label htmlFor={item.value}>{item.key}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
