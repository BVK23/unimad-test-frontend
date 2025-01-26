import React from "react";
import { IoReloadOutline } from "react-icons/io5";
import Chip from "@/components/chip";
import { cn } from "@/lib/utils";

const InterviewPrepCard = ({ data, ...props }) => {
  return (
    <div
      className={cn(
        "flex w-full md:w-80 h-16 justify-between items-center rounded bg-white shadow-md py-2 px-4",
        props.className
      )}
    >
      <div className="space-y-2">
        <div className="text-primary-dark-gray font-semibold">{data.role}</div>
        <div className="text-xs">{data.company}</div>
      </div>
      <div>
        <Chip icon={<IoReloadOutline />}>Retake</Chip>
      </div>
    </div>
  );
};

export default InterviewPrepCard;
