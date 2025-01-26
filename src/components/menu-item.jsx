"use client";

import { CheckIcon, HourglassIcon, LockIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const MenuItem = ({
  href,
  isActive,
  children,
  isLocked,
  isPending,
  isCompleted,
  ghostMode,
  className,
  onClick,
}) => {
  return (
    <Link
      href={isLocked ? "" : href || ""}
      className={cn(
        "flex items-center gap-4 px-3 text-[#808080] py-2.5 rounded text-sm font-medium justify-between hover:bg-primary-blue hover:bg-opacity-10",
        isActive && "text-primary-blue",
        isActive && ghostMode && "text-primary-blue bg-primary-blue bg-opacity-10",
        isLocked && "cursor-not-allowed text-[#D0D0D0]",
        className
      )}
      onClick={onClick}
    >
      {children}
      {isLocked && <LockIcon />}
      {isPending && <HourglassIcon />}
      {isCompleted && <CheckIcon />}
    </Link>
  );
};
