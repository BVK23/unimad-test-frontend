"use client";

import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { LuHistory, LuPlus } from "react-icons/lu";
import UnibotLoadingModal from "@/components/unibot-loading-modal";
import { cn } from "@/lib/utils";
import { useUnibotStore } from "@/store/useUnibotStore";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { fetchUnibotHomeData } from "./actions";

// import { DeleteIcon } from "@/components/icons";

const HomeUnibotWidgets = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { isUniBotOpen, unibotTriggerHome, setUnibotTriggerHome } = useUnibotStore();

  const [unibotLoading, setUnibotLoading] = useState("");

  const {
    data: historyHome = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["historyHome"],
    queryFn: () => fetchUnibotHomeData(),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,    // Disable refetching when the component remounts if the data is already cached
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    const updateAndNavigate = async () => {
      if (unibotTriggerHome) {
        await refetch();
        setUnibotLoading("working on something...");
      }
    };

    updateAndNavigate();
  }, [unibotTriggerHome]);

  useEffect(() => {
    if (unibotTriggerHome) {
      // Get the most recent chat after refreshing
      const mostRecentChat = historyHome[historyHome.length - 1];

      // Navigate to the most recent chat's page
      if (mostRecentChat) {
        queryClient.invalidateQueries(["chatHistory", "home"]);
        router.push(`/uniboard/home?id=${mostRecentChat.id}`);
      }

      setUnibotTriggerHome(false);
      setUnibotLoading("");
    }
  }, [historyHome]);

  if (historyHome.length === 0 || isLoading) {
    return null;
  }

  return (
    <>
      {unibotLoading && <UnibotLoadingModal loadingMessage={unibotLoading} />}
      <Popover>
        <div className="w-full flex justify-center relative">
          <PopoverButton
            className={cn(
              "p-1 rounded-full bg-primary-blue bg-opacity-10 outline-none",
              isUniBotOpen && "mb-2"
            )}
          >
            <LuHistory className="text-primary-blue outline-none" size={18} />
          </PopoverButton>

          <PopoverPanel
            anchor={{ to: "top", gap: "1rem" }}
            className="z-[70] border-2 ml-10 bg-white flex flex-col rounded-lg w-60"
          >
            <div className="h-fill overflow-y-auto no-scrollbar flex flex-col-reverse gap-2 p-2">
              {historyHome.map(({ title, id }) => {
                return (
                  <div
                    key={id}
                    className={cn(
                      "bg-transparent rounded text-primary-light-gray text-sm truncate px-1.5 py-2.5 hover:bg-primary-blue hover:bg-opacity-10 hover:text-primary-dark-gray",
                      searchParams.has("id") &&
                        searchParams.get("id") === id &&
                        "text-primary-dark-gray bg-primary-blue bg-opacity-10"
                    )}
                    onClick={() => router.push(`/uniboard/home?id=${id}`)}
                  >
                    {title}
                    {/* <GoKebabHorizontal /> */}
                  </div>
                );
              })}
            </div>
          </PopoverPanel>
        </div>
      </Popover>
      <div
        className={cn(
          "p-1 rounded-full bg-primary-blue bg-opacity-10 cursor-pointer",
          isUniBotOpen && "mb-2"
        )}
      >
        <LuPlus
          className="text-primary-blue"
          size={18}
          onClick={() => router.push("/uniboard/home")}
        />
      </div>
    </>
  );
};

export default HomeUnibotWidgets;
