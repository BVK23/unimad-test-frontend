"use client";

import ReactMarkdown from "react-markdown";
import Image from "next/image";
import CopyToClipboard from "../copy-to-clipboard";
import { UniBotIcon } from "../icons";
import UnibotDeleteButton from "./UnibotDeleteButton";

const UserMessage = ({ msgData, profilePicture }) => (
  <div className="flex items-end flex-row-reverse gap-2">
    <div className="rounded-full h-8 w-8 hidden md:flex items-center justify-center flex-shrink-0">
      <Image
        src={profilePicture}
        width={60}
        height={60}
        alt="Profile Picture"
        className="rounded-full"
      />
    </div>
    <div className="relative rounded group p-4 max-w-2xl w-2xl text-sm text-primary-dark-gray bg-[#F5F8FD]">
      <ReactMarkdown className="prose">{msgData.message}</ReactMarkdown>
      <div className="absolute flex gap-4 items-center -bottom-5 left-2 opacity-0 group-hover:opacity-100">
        <CopyToClipboard text={msgData.message} />
        {msgData.isFirstMessage === false && (
          <UnibotDeleteButton sectionName={msgData.sectionName} messageId={msgData.message_id} />
        )}
      </div>
    </div>
  </div>
);

// BotMessage component
const BotMessage = ({ msgData }) => (
  <div className="flex items-end gap-2">
    <div className="bg-primary-blue rounded-full h-8 w-8 hidden md:flex items-center justify-center flex-shrink-0">
      <UniBotIcon className="h-5 w-5" />
    </div>
    <div className="relative rounded group p-4 max-w-2xl w-2xl text-sm text-primary-dark-gray bg-primary-blue bg-opacity-20">
      <ReactMarkdown className="prose">{msgData.message}</ReactMarkdown>
      <div className="absolute flex gap-4 items-center -bottom-5 right-2 opacity-0 group-hover:opacity-100">
        <CopyToClipboard text={msgData.message} />
        {msgData.isFirstMessage === false && (
          <UnibotDeleteButton sectionName={msgData.sectionName} messageId={msgData.message_id} />
        )}
      </div>
    </div>
  </div>
);

// MsgLoadAnimation component
const MsgLoadAnimation = () => (
  <div className="flex items-end gap-2">
    <div className="bg-primary-blue rounded-full h-8 w-8 hidden md:flex items-center justify-center">
      <UniBotIcon className="h-5 w-5" />
    </div>
    <div className="relative rounded group p-4 max-w-2xl w-2xl text-sm text-primary-dark-gray bg-primary-blue bg-opacity-20">
      <div className="flex items-center gap-2 text-sm">
        <div className="lds-dots relative flex items-center gap-2">
          <div className="bg-primary-blue w-2 h-2 rounded-full"></div>
          <div className="bg-primary-blue w-2 h-2 rounded-full"></div>
          <div className="bg-primary-blue w-2 h-2 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

export { UserMessage, BotMessage, MsgLoadAnimation };
