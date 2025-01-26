import { cn } from "@/lib/utils";

const Chip = ({ children, className, state = "default", icon, ...props }) => {
  return (
    <div
      className={cn(
        "rounded px-2 py-1 text-xs font-medium shadow-sm flex items-center gap-1",
        state === "default" && "text-white bg-primary-blue",
        state === "progress" && "text-white bg-primary-yellow",
        state === "completed" && "text-white bg-[#299935]",
        state === "error" && "text-white bg-error",
        state === "gray" && "text-gray-900 bg-gray",
        state === "ghost" && "text-primary-blue bg-primary-blue bg-opacity-10",
        state === "ghost-inactive" &&
          "text-primary-blue bg-primary-blue bg-opacity-5 text-opacity-50",
        className
      )}
      {...props}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      {children}
    </div>
  );
};

export default Chip;
