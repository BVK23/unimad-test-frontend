"use client";

import { cn } from "@/lib/utils";

const Input = ({
  state = "default", // default, error
  label,
  className,
  inputClassName,
  helperText,
  buttonIcon,
  buttonOnClick,
  buttonShowOnHover = false,
  textarea = false,
  disableHelper = false,
  ...props
}) => {
  const inputClassNameFinal = cn(
    "w-full flex-1 rounded p-2 border border-black/30 text-sm focus:ring-1 focus:outline-none",
    state === "default" &&
      "placeholder-text-[#808080] focus:border-primary-blue focus:ring-primary-blue",
    state === "error" && "placeholder-text-[#D80707] focus:border-[#D80707] focus:ring-[#D80707]",
    inputClassName
  );

  return (
    <div className={cn("flex flex-col gap-1 group", className)}>
      {label && (
        <label
          className={cn(
            "text-xs",
            state === "default" && "text-[#808080]",
            state === "error" && "text-[#D80707]",
            buttonShowOnHover && "group",
            state !== "error" && "group-focus-within:text-primary-blue"
          )}
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {textarea ? (
          <textarea className={inputClassNameFinal} {...props} />
        ) : (
          <input className={inputClassNameFinal} {...props} />
        )}

        {buttonIcon && (
          <div
            className={cn(buttonShowOnHover && "opacity-0 group-hover:opacity-100")}
            onCLick={buttonOnClick}
          >
            {buttonIcon}
          </div>
        )}
      </div>

      {!disableHelper && (
        <p
          className={cn(
            "text-[.75em] ml-0",
            state === "default" && "text-[#808080]",
            state === "error" && "text-[#D80707]"
          )}
        >
          {helperText || "\u00A0"}
        </p>
      )}
    </div>
  );
};

export default Input;
