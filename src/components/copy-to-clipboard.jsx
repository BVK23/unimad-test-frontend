"use client";

import { useState } from "react";
import { TbChecks } from "react-icons/tb";
import { CopyIcon } from "@/components/icons";
import copy from "clipboard-copy";

const CopyToClipboard = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  const handleMouseLeave = () => {
    setIsCopied(false);
  };

  return (
    <span onMouseLeave={handleMouseLeave}>
      {isCopied ? (
        <TbChecks className="cursor-pointer text-[#299935]" />
      ) : (
        <CopyIcon
          className="cursor-pointer text-primary-light-gray hover:text-primary-blue"
          onClick={handleCopyClick}
        />
      )}
    </span>
  );
};

export default CopyToClipboard;
