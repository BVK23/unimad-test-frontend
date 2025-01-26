"use client";

import { useState } from "react";
import { TbChecks } from "react-icons/tb";
import { Button } from "@/components/button";
import { CopyIcon } from "@/components/icons";
import copy from "clipboard-copy";

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);

      // Reset the icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <Button
      icon={isCopied ? <TbChecks /> : <CopyIcon />}
      className="w-fit"
      onClick={handleCopyClick}
    >
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
};

export default CopyToClipboardButton;
