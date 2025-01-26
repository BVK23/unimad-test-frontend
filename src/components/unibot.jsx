"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbReload } from "react-icons/tb";
import { VscChromeMinimize } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import useSuggestionsStore from "@/store/useSuggestionsStore";
import { useUnibotStore } from "@/store/useUnibotStore";
import { useUnibotTriggerStore } from "@/store/useUnibotTriggerStore";
import { useUserStore } from "@/store/useUserStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { set } from "lodash";
import { usePathname, useSearchParams } from "next/navigation";
import { SendIcon, UniBotIcon } from "./icons";
import { UserMessage, BotMessage, MsgLoadAnimation } from "./unibot/Messages";
import { fetchChatHistory, fetchInitialChat } from "./unibot/actions";
import HomeUnibotWidgets from "./unibot/home-unibot-widgets";
import { isPathWithoutUniBot, isHomePage } from "./unibot/pathUtils";
import { extractSuggestions, processHistorySuggestions } from "./unibot/processSuggestions";
import { createSectionName } from "./unibot/sectionNameUtils";
import { useUpdateChat } from "./unibot/useUpdateChat";

export const UniBot = ({ className, rootClassName }) => {
  const [minimize, setMinimize] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const {
    isUniBotOpen,
    isUnibotLoading,
    updateIsUniBotOpen,
    updateIsUnibotLoading,
    setUnibotTriggerHome,
  } = useUnibotStore();

  const userData = useUserStore(state => state.userData);

  const textareaRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  // Derive sectionName from pathname and query params
  const sectionName = useMemo(
    () => createSectionName(pathname, Object.fromEntries(searchParams)),
    [pathname, searchParams]
  );

  // Add useEffect to close UniBot when pathname or searchParams change
  useEffect(() => {
    if (!sectionName.includes("home")) {
      updateIsUniBotOpen(false); // Close UniBot only if sectionName doesn't include "home"
    }
  }, [sectionName]);

  const queryClient = useQueryClient();

  // Fetch chat history using React Query
  const {
    data: chat = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chatHistory", sectionName],
    queryFn: async () => {
      const chatHistory = await fetchChatHistory(sectionName);

      // Check if sectionName is of type home<uuid>
      if (sectionName.startsWith("home") && sectionName.length > 4) {
        return chatHistory;
      }

      // If the chat history is empty, fetch the initial chat message
      if (chatHistory.length === 0) {
        const initialChat = await fetchInitialChat(sectionName);
        const processedData = processSuggestions(
          [{ type: "bot", message: initialChat }],
          sectionName,
          true
        );
        return processedData;
      } else {
        // Process the existing chat history
        const processedData = processSuggestions(chatHistory, sectionName, true).slice(1);
        return processedData;
      }
    },
    // Control refetching behavior
    refetchOnWindowFocus: false, // Refetching when the window regains focus
    // refetchOnMount: false,        // Disable refetching when the component remounts if the data is already cached
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    updateIsUnibotLoading(isLoading);
  }, [isLoading]);

  // Mutation to update chat history
  const updateChat = useUpdateChat(sectionName);

  // Access functions and variables from the store
  const { setSuggestions, isSectionInSuggestions, shouldPreserveContent, isAppendSection } =
    useSuggestionsStore();

  const { unibotGenMessage, setUnibotGenMessage } = useUnibotTriggerStore();

  useEffect(() => {
    if (unibotGenMessage !== "") {
      if (!errorMessage && !isUnibotLoading) {
        chatBotMessage(unibotGenMessage);
      }
      setUnibotGenMessage(""); // Reset the trigger after processing
    }
  }, [unibotGenMessage]);

  const toggleDrawer = () => {
    if (!isUniBotOpen) {
      updateIsUniBotOpen(true);
    }
  };

  const handleDragEnd = (event, info) => {
    // If the user drags the component more than 50% of its height, close it
    if (info.offset.y > 100) {
      updateIsUniBotOpen(false);
    }
  };

  const triggerRefresh = () => {
    // window.location.reload();
    queryClient.invalidateQueries(["chatHistory", sectionName]);
    setErrorMessage(null);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = event => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    setInputValue(event.target.value);
  };

  const textAreaHandleKeyDown = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!errorMessage && !isUnibotLoading) {
        sendMessage();
      }
    }
  };

  const sendMessage = () => {
    const newMessage = inputValue.trim();
    if (!newMessage) return;
    chatBotMessage(newMessage);
  };

  const chatBotMessage = async newMessage => {
    if (newMessage !== "") {
      updateChat.mutate(currentHistory => [
        ...(currentHistory?.length > 0 ? currentHistory.filter(msg => !msg.isError) : []),
        { type: "user", message: newMessage },
        { type: "bot", message: "", loading: true }, // Temporary loading message
      ]);
      if (inputValue !== "") {
        setInputValue("");
        textareaRef.current.style.height = "auto";
      }
      updateIsUnibotLoading(true);
    }

    try {
      const response = await fetch("/api/unibot-api-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage, sectionName: sectionName }),
      });
      if (response.ok) {
        // const data = await response.json();
        // updateChat((currentHistory) => [
        //   ...currentHistory.filter((msg) => !msg.loading),
        //   { type: 'bot', message: data.response },
        // ]);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let botMessage = "";
        let stopStreaming = false;
        updateChat.mutate(currentHistory => [
          ...currentHistory.filter(msg => !msg.loading),
          { type: "bot", message: "" },
        ]);
        updateIsUnibotLoading(false);

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode the streamed chunk into a string
          const chunk = decoder.decode(value, { stream: true });

          // Regex to find JSON strings in the chunk
          const regex = /data: ({.*?})\n\n/g;
          let match;

          // Process each match
          while ((match = regex.exec(chunk)) !== null) {
            try {
              // Parse the JSON data
              const jsonData = match[1];
              const jsonChunk = JSON.parse(jsonData);

              if (jsonChunk.text.includes("```")) {
                // If the backtick pattern is found, stop updating the streaming message
                stopStreaming = true;
              }

              // Append the text from the JSON to the bot message
              botMessage += jsonChunk.text;
            } catch (error) {
              console.log("Error parsing JSON:", error);
            }
          }

          if (!stopStreaming) {
            // Update the last bot message in the chat array
            updateChat.mutate(currentHistory => {
              const updatedHistory = [...currentHistory];
              updatedHistory[updatedHistory.length - 1] = {
                ...updatedHistory[updatedHistory.length - 1],
                message: botMessage,
              };
              return updatedHistory;
            });
          }
        }

        const cleanedBotMessage = processSuggestions(botMessage, sectionName);
        // Update the last bot message in the chat array without the suggestions part
        updateChat.mutate(currentHistory => {
          const updatedHistory = [...currentHistory];
          updatedHistory[updatedHistory.length - 1] = {
            ...updatedHistory[updatedHistory.length - 1],
            message: cleanedBotMessage,
          };
          return updatedHistory;
        });
        if (sectionName === "home") {
          // queryClient.invalidateQueries(["historyHome"]);
          setUnibotTriggerHome(true);
        }
      } else {
        const errorData = await response.json();
        console.error("Error in unibot - chatBotMessage api call not okay:", errorData?.error);
        updateIsUnibotLoading(false);
        updateChat.mutate(currentHistory => {
          const filteredHistory = currentHistory.filter(msg => !msg.loading);
          const lastMessage = filteredHistory[filteredHistory.length - 1];
          const updatedLastMessage = { ...lastMessage, isError: true };
          return [
            ...filteredHistory.slice(0, -1), // All but the last message
            updatedLastMessage,
          ];
        });
        setErrorMessage(
          `Oops! Unibot ran into issue responding to your message. He says ${errorData}. Please give him a breather and try again.`
        );
      }
    } catch (error) {
      console.error("Error in unibot - chatBotMessage:", error);
      updateIsUnibotLoading(false);
      updateChat.mutate(currentHistory => {
        const filteredHistory = currentHistory.filter(msg => !msg.loading);
        const lastMessage = filteredHistory[filteredHistory.length - 1];
        const updatedLastMessage = { ...lastMessage, isError: true };
        return [
          ...filteredHistory.slice(0, -1), // All but the last message
          updatedLastMessage,
        ];
      });
      setErrorMessage(
        "We encountered an error sending or processing your message to Unibot. Give a quick refresh and try again."
      );
    }
  };

  const processSuggestions = (msgOrHistory, sectionName, isHistory = false) => {
    if (!isSectionInSuggestions(sectionName)) {
      return msgOrHistory; // Return original chat (message or history) if no processing needed
    }

    const preserveContent = shouldPreserveContent(sectionName);
    const append = isAppendSection.includes(sectionName);

    if (isHistory) {
      const { processedHistory, suggestions } = processHistorySuggestions(
        msgOrHistory,
        preserveContent,
        append
      );
      if (suggestions.length > 0) {
        setSuggestions(sectionName, suggestions);
      }
      return processedHistory;
    } else {
      const { cleanedBotMessage, extractedSuggestions } = extractSuggestions(
        msgOrHistory,
        preserveContent
      );
      if (extractedSuggestions.length > 0) {
        setSuggestions(sectionName, extractedSuggestions);
      }
      return cleanedBotMessage;
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <section
      className={cn(
        "md:mb-6 md:block",
        isPathWithoutUniBot(pathname) && "!hidden",
        isUniBotOpen && "block",
        !isUniBotOpen && "hidden md:block",
        rootClassName
      )}
    >
      <div className="w-full h-10" />
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        className={cn(
          "absolute bottom-0 w-full backdrop-blur-2xl bg-white/30 z-[60] flex flex-col rounded-xl md:rounded-[2.625rem]",
          isUniBotOpen && !minimize && "h-[calc(100%-4rem)] md:h-[calc(100%-3rem)]",
          isUniBotOpen && minimize && "h-[calc(50%-1.5rem)]",
          className
        )}
      >
        <div className={cn("hidden", isUniBotOpen && "flex justify-between p-2 w-full px-6")}>
          <div className="max-w-12 w-full" />
          <div className="w-20 rounded-full h-2 bg-primary-light-gray/30 cursor-pointer" />
          <div className="flex gap-2 justify-center items-center max-w-12 w-full">
            <div
              className="bg-primary-blue text-primary-blue bg-opacity-20 rounded-full cursor-pointer  h-4 w-4 flex justify-center items-center"
              onClick={() => setMinimize(!minimize)}
            >
              {minimize ? <RiExpandDiagonalLine size={13} /> : <VscChromeMinimize />}
            </div>
            <div
              className="bg-[#D80707] text-[#D80707] bg-opacity-20 rounded-full cursor-pointer h-4 w-4 flex justify-center items-center"
              onClick={() => {
                updateIsUniBotOpen(false);
              }}
            >
              <RxCross2 />
            </div>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className={cn(
            "hidden",
            isUniBotOpen &&
              "flex-grow flex flex-col gap-8 px-4 py-2 mb-2 no-scrollbar overflow-y-scroll"
          )}
        >
          {chat.map((item, index) =>
            item.type === "user" ? (
              <UserMessage
                key={index}
                msgData={item}
                profilePicture={userData?.profilePictureUrl || "/images/person.png"}
              />
            ) : item.loading ? (
              <MsgLoadAnimation key={index} />
            ) : (
              <BotMessage key={index} msgData={item} />
            )
          )}
          {isError || errorMessage ? (
            <div className="flex justify-center items-center">
              <div className="relative rounded group p-4 max-w-2xl w-2xl text-sm text-primary-dark-gray bg-[#D80707] bg-opacity-10 flex gap-3">
                <div className="text-white">
                  <MdErrorOutline className="h-5 w-5 text-[#D80707]" />
                </div>
                <span>
                  {errorMessage || "Error while loading unibot, check your connect and try again"}
                </span>
                <div className="absolute flex gap-4 items-center -bottom-5 right-2 opacity-0 group-hover:opacity-100">
                  <TbReload className="cursor-pointer" size={18} onClick={triggerRefresh} />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div
          onClick={toggleDrawer}
          className={cn(
            "p-2 pr-4 rounded-[2.625rem] bg-white w-full flex gap-4 border md:border-transparent border-primary-light-gray border-opacity-25",
            isUniBotOpen && "border-primary-light-gray"
          )}
        >
          <div className={cn("flex h-full gap-2 items-end", !isUniBotOpen && "items-center")}>
            <div
              onClick={e => {
                e.stopPropagation();
                updateIsUniBotOpen(!isUniBotOpen);
              }}
              className="bg-primary-blue rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0"
            >
              {isUnibotLoading ? <UniBotIcon className="custom-spin" /> : <UniBotIcon />}
            </div>
            {isHomePage(pathname) && <HomeUnibotWidgets />}
          </div>

          <div className="flex-grow flex gap-4" onClick={toggleDrawer}>
            <div className="w-full h-full flex items-center">
              <textarea
                ref={textareaRef}
                value={inputValue}
                rows={1}
                className={cn(
                  "bg-transparent text-sm text-primary-dark-gray w-full h-min outline-none resize-none",
                  isUniBotOpen && "mb-1.75"
                )}
                placeholder="Shoot your queries ..."
                onKeyDown={textAreaHandleKeyDown}
                onChange={handleInputChange}
                style={{
                  maxHeight: "200px",
                }}
              />
            </div>
          </div>
          <div
            className={cn(
              "flex items-end",
              !isUniBotOpen && "items-center",
              isUniBotOpen && "mb-2"
            )}
          >
            {!errorMessage && !isUnibotLoading ? (
              <IoSend onClick={sendMessage} className="text-primary-blue h-5 w-5" />
            ) : (
              <IoSend className="text-gray-500 h-5 w-5" />
            )}
            {/* <SendIcon onClick={sendMessage} /> */}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
