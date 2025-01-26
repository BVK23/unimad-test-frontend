import { cn } from "@/lib/utils";

export const ProgressBar = ({ value = 0, className }) => {
  const validProgress = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "overflow-hidden bg-primary-blue bg-opacity-10 h-2.5 rounded-full w-full",
        className
      )}
    >
      <span
        className="h-full bg-blue-500 block rounded-full"
        style={{ width: `${validProgress}%` }}
      ></span>
    </div>
  );
};
