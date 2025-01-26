import ReactMarkdown from "react-markdown";
import Chip from "@/components/chip";
import { cn } from "@/lib/utils";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const ProgressFormLayout = ({
  title,
  description,
  descriptionClassName,
  helperText,
  helperTextClassName,
  heading,
  headingClassName,
  state = "progress", // progress, completed
  children,
}) => {
  return (
    <div className="flex flex-col gap-6 md:max-h-[calc(100vh-9.5rem)] max-h-[calc(100vh-16.5rem)] min-h-full text-sm text-primary-dark-gray">
      <div className="flex justify-between">
        <h1 className=" font-bold text-base text-[#373737]">{title}</h1>
        {state === "progress" && <Chip state="progress">In progress</Chip>}
        {state === "completed" && <Chip state="completed">Completed</Chip>}
      </div>
      <div className="flex flex-col gap-6 overflow-y-auto no-scrollbar md:min-h-[calc(100vh-12rem)]">
        {description && (
          <div className={cn("text-sm text-[#373737] max-w-[41.25rem]", descriptionClassName)}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {description}
            </ReactMarkdown>
          </div>
        )}
        {helperText && (
          <div
            className={cn(
              "text-sm font-semibold text-primary-blue px-3 py-2.5 rounded bg-primary-blue/10 max-w-[41.25rem]",
              helperTextClassName
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {helperText}
            </ReactMarkdown>
          </div>
        )}
        {heading && (
          <div className={cn("text-sm text-[#373737] max-w-[41.25rem]", headingClassName)}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {heading}
            </ReactMarkdown>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ProgressFormLayout;
