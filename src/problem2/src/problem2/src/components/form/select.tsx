import React, { ReactNode, SelectHTMLAttributes, useEffect } from "react";
import {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface Option {
  value: string | number;
  label: string | ReactNode;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
  options: Option[];
  name: string;
  setValue?: UseFormSetValue<any>;
  classNameSelect?: string;
  classNameWrapper?: string;
}

const Select: React.FC<Props> = ({
  errorMessage,
  register,
  rules,
  options,
  name,
  setValue,
  classNameSelect,
  classNameWrapper,
  defaultValue,
  ...rest
}) => {
  const registerResult = register && name ? register(name, rules) : null;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue && setValue(name, event.target.value, { shouldValidate: true });
    if (rest.onChange) {
      rest.onChange(event);
    }
  };

  useEffect(() => {
    if (defaultValue && setValue) setValue(name, defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, defaultValue]);

  return (
    <div className={classNameWrapper}>
      <select
        {...registerResult}
        onChange={handleChange}
        className={`w-full h-[34px] py-1.5 rounded-[10px] border px-3 outline-none disabled:cursor-not-allowed disabled:bg-[#eee]  ${
          errorMessage ? "border-[#E85445] bg-[#FAEDEC]" : "border-gray"
        } ${classNameSelect}`}
        {...rest}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="mt-2.5 whitespace-nowrap text-[13px] text-[#E74C3C]">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Select;
