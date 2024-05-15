import { FormErrorMessageProps } from "@/types/components/form";
import { FC } from "react";

const FormErrorMessage: FC<FormErrorMessageProps> = ({ errorProp }) => {
  if (errorProp === null) return;

  const showErrorMessage = () => {
    if (typeof errorProp === "string") {
      return (
        <div className="border-2 border-red-700 p-3 mb-4">
          <li className="text-red-700">{errorProp}</li>
        </div>
      );
    }

    const errors = Object.values(errorProp).map(
      (error) => error!.message as string
    );
    return (
      <>
        {errors.length > 0 && (
          <div className="border-2 border-red-700 p-3 mb-4">
            {errors.map((error, index) => {
              return (
                <li className="text-red-700" key={index}>
                  {error}
                </li>
              );
            })}
          </div>
        )}
      </>
    );
  };

  return <>{showErrorMessage()}</>;
};

export default FormErrorMessage;
