"use client";

import { BsThreeDotsVertical } from "react-icons/bs";
import { logout } from "@/lib/actions/logoutAction";
import { useUserStore } from "@/store/useUserStore";
import { Menu, MenuButton, MenuItem, MenuSeparator, MenuItems } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";
import { UnimadLogo } from "./unimad-logo";

const DropdownNavMenu = () => {
  const userData = useUserStore(state => state.userData);

  return (
    <Menu>
      {({ open }) => (
        <>
          <MenuButton>
            <BsThreeDotsVertical size={18} className="text-primary-dark-gray hidden md:block" />
            <Image
              src={userData?.profilePictureUrl || "/images/person.png"}
              width={30}
              height={30}
              alt="Profile Picture"
              className="rounded-full flex-shrink-0 md:hidden"
            />
          </MenuButton>
          <AnimatePresence>
            {open && (
              <MenuItems
                static
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                anchor="bottom"
                className="origin-top bg-white shadow-md rounded-lg min-w-48 md:min-w-36 z-[51]"
              >
                <div className="font-bold p-4 text-primary-dark-gray md:hidden">
                  {userData?.name || "Guest"}
                </div>
                <MenuItem>
                  <Link
                    className="block data-[focus]:text-primary-blue text-sm px-4 md:pt-2 font-medium text-primary-light-gray"
                    href="/uniboard/user/profile"
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuSeparator className="my-2 h-px bg-[#808080]/25" />
                <MenuItem>
                  <Link
                    className="block data-[focus]:text-primary-blue text-sm px-4 md:pt-2 font-medium text-primary-light-gray"
                    href="/uniboard/user/subscription"
                  >
                    Subscription
                  </Link>
                </MenuItem>
                <MenuSeparator className="my-2 h-px bg-[#808080]/25" />
                <MenuItem>
                  <Link
                    className="block data-[focus]:text-primary-blue text-sm px-4 font-medium text-primary-light-gray"
                    href="/about"
                  >
                    About
                  </Link>
                </MenuItem>
                <MenuSeparator className="my-2 h-px bg-[#808080]/25" />
                <MenuItem>
                  <Link
                    className="block data-[focus]:text-primary-blue text-sm px-4 font-medium text-primary-light-gray"
                    href="/mad-stories"
                  >
                    MAD Stories
                  </Link>
                </MenuItem>
                <MenuSeparator className="my-2 h-px bg-[#808080]/25" />
                <MenuItem>
                  <Link
                    className="block data-[focus]:text-primary-blue text-sm px-4 font-medium text-primary-light-gray"
                    href="/blogs"
                  >
                    Blogs
                  </Link>
                </MenuItem>
                <MenuSeparator className="my-2 h-px bg-[#808080]/25" />
                <MenuItem>
                  <button
                    className="block text-sm font-medium text-[#D80707] px-4"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </MenuItem>
                <MenuSeparator className="mt-2 h-px bg-[#808080]/25" />
                <div className="flex justify-center items-center my-1 md:hidden">
                  <UnimadLogo className="w-20 md:w-[4.5rem] text-[#808080]/25" />
                </div>
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
};

export default DropdownNavMenu;
