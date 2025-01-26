"use client";

import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { SIDEBAR_NAV_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
import { MenuItem } from "./menu-item";

export const SidebarNavMenu = () => {
  const pathname = usePathname();

  const initialOpenState = SIDEBAR_NAV_LINKS.reduce((acc, link) => {
    if (link.subMenu) {
      acc[link.name] = true;
    }
    return acc;
  }, {});

  const [openSubMenus, setOpenSubMenus] = useState(initialOpenState);

  const toggleSubMenu = name => {
    setOpenSubMenus(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };


  return (
    <div className="mt-6 mx-4 flex flex-col gap-2 max-h-[31rem] overflow-y-auto no-scrollbar">
      {SIDEBAR_NAV_LINKS.map(link => (
        <React.Fragment key={link.name}>
          <MenuItem
            href={link.noLink ? "" : `/uniboard/${link.href}`}
            key={link.name}
            isActive={
              pathname.split("/")[2] === link.href ||
              pathname.split("/")[2] === link.href.split("/")[0]
            }
            isLocked={false}
          >
            {link.name}
            {link.subMenu && (
              <span className="ml-auto" onClick={() => link.subMenu && toggleSubMenu(link.name)}>
                {openSubMenus[link.name] ? <FaCaretUp /> : <FaCaretDown />}
              </span>
            )}
          </MenuItem>
          {link.subMenu && openSubMenus[link.name] && (
            <div className="ml-4">
              {link.subMenu.map(subLink => {
                return (
                  <MenuItem
                    key={subLink.name}
                    href={`/uniboard/${link.href}/${subLink.href}`}
                    isActive={pathname.includes(subLink.href)}
                    isLocked={false}
                  >
                    {subLink.name}
                  </MenuItem>
                );
              })}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
