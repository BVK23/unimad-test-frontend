"use client";

import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import DropdownNavMenu from "./dropdown-nav-menu";

const TopNavMenuMobile = ({ userData }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-primary-blue w-full flex md:hidden justify-between px-3 py-3 items-center flex-shrink-0">
      <IoChevronBack
        className="text-white cursor-pointer"
        size={24}
        onClick={() => router.back()}
      />
      <span className="text-white text-lg font-semibold">
        {pathname
          .split("/")[2]
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
      <DropdownNavMenu userData={userData} />
    </div>
  );
};

export default TopNavMenuMobile;
