"use client";

import { cn } from "@/lib/utils";

export const Button = ({
  children,
  className,
  type,
  icon,
  onClick,
  iconClassName,
  variant = "primary",
  iconOnly,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "inline-flex justify-center h-min items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium space-x-2",
        variant === "primary" && "bg-primary-blue text-white",
        variant === "ghost" && "bg-primary-blue bg-opacity-10 text-primary-blue",
        variant === "ghost-on-hover" &&
          "bg-transparent hover:bg-primary-blue hover:bg-opacity-10 text-primary-blue",
        iconOnly && "h-10 w-10 p-0",
        className
      )}
      disabled={disabled}
    >
      {icon && <div className={cn("w-max h-max", iconClassName)}>{icon}</div>}
      {children}
    </button>
  );
};
