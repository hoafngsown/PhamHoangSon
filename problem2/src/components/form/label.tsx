import React from "react";
import { cn } from "../../lib/utils";

export type LabelProps = {
  title?: string;
  className?: string;
  required?: boolean;
  htmlFor?: string;
  classNameWrapper?: string;
  labelClassName?: string;
};

export function Label({
  title,
  className,
  classNameWrapper,
  required,
  htmlFor = "",
  labelClassName = "",
}: LabelProps) {
  return (
    <div className={cn("flex items-center gap-x-1", classNameWrapper)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          "text-sm whitespace-nowrap font-semibold",
          labelClassName
        )}
      >
        {title}
      </label>
      {required && (
        <span className={cn("text-[red] font-bold", className)}>＊</span>
      )}
    </div>
  );
}
