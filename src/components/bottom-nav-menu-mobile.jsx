"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUnibotStore } from "@/store/useUnibotStore";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UnibotMobileIcon,
  LinkedinMobileIcon,
  UnimadHomeIconMobile,
  ResumeIconMobile,
  ApplicationIconMobile,
  PortfolioIconMobile,
} from "./icons";
import { isPathWithoutUniBot, isHomePage } from "./unibot/pathUtils";

const BottomNavMenuMobile = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { isUniBotOpen, isUnibotLoading, updateIsUniBotOpen } = useUnibotStore(state => state);

  const [navLinks, setNavLinks] = useState(
    queryClient.getQueryData(["userDashboardData"])?.sidebarNavLinks || []
  );

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(event => {
      const query = event?.query;

      if (query?.queryKey?.toString() === ["userDashboardData"].toString()) {
        const cachedData = queryClient.getQueryData(["userDashboardData"]);
        if (cachedData) setNavLinks(cachedData.sidebarNavLinks);
      }
    });

    return () => unsubscribe();
  }, []);

  // Helper function to get the href or disable the link if locked
  const getLinkHref = linkName => {
    const link = navLinks.find(l => l.name === linkName);
    return link?.isLocked ? "#" : `/uniboard/${link?.href}`; // Disable if locked by returning '#'
  };

  return (
    <div
      className={cn(
        "bg-white w-full flex items-center justify-around py-6 md:hidden overflow-hidden z-[50] flex-shrink-0",
        isUniBotOpen && "hidden"
      )}
    >
      <div className="relative">
        <Link href={getLinkHref("Home")}>
          <UnimadHomeIconMobile className="text-white" />
        </Link>
        <div className="absolute bg-primary-blue h-72 w-72 rounded-full left-0 translate-x-[-85%] top-1/2 -translate-y-1/2 z-[-1]" />
      </div>
      <Link href={getLinkHref("My Resume")}>
        <ResumeIconMobile
          className={cn("text-[#999999]", pathname.includes("my-resume") && "text-primary-blue")}
        />
      </Link>
      <Link href={getLinkHref("Applications")}>
        <ApplicationIconMobile
          className={cn("text-[#999999]", pathname.includes("applications") && "text-primary-blue")}
        />
      </Link>
      <Link href={getLinkHref("Portfolio")}>
        <PortfolioIconMobile
          className={cn("text-[#999999]", pathname.includes("portfolio") && "text-primary-blue")}
        />
      </Link>
      <Link href={getLinkHref("LinkedIn Optimisation")}>
        <LinkedinMobileIcon
          className={cn(
            "text-[#999999]",
            pathname.includes("linkedin-optimisation") && "text-primary-blue"
          )}
        />
      </Link>
      <div
        onClick={() => {
          if (!isPathWithoutUniBot(pathname)) {
            updateIsUniBotOpen(true);
          }
        }}
      >
        <UnibotMobileIcon
          className={cn(isUnibotLoading ? "custom-spin text-primary-blue" : "text-[#999999]")}
        />
      </div>
    </div>
  );
};

export default BottomNavMenuMobile;
