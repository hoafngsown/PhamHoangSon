import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

import React from "react";
import { cn } from "../../lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
  isError?: boolean;
}

const Input = ({
  errorMessage,
  isError,
  className,
  name,
  register,
  rules,
  classNameError = "mt-2.5 whitespace-nowrap text-[13px] text-[#E74C3C]",
  classNameInput = "",
  ...rest
}: Props) => {
  const registerResult = register && name ? register(name, rules) : null;

  return (
    <div className={"relative " + className}>
      <input
        className={cn(
          `flex w-full focus:border-[#f4751e] focus:shadow-none focus:ring-0 border border-solid rounded-[10px] px-4 py-2 text-sm file:border-0 file:bg-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-[#eee] outline-none border-gray ${
            isError || errorMessage
              ? "border-[#E85445] bg-[#FAEDEC]"
              : "border-[#E0E0E0]"
          }`,
          classNameInput
        )}
        {...registerResult}
        {...rest}
      />
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  );
};

export default Input;
