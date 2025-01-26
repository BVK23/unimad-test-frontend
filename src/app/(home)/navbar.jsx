"use client";

import { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/button";
import { LinkedInLoginButton } from "@/components/linkedin-login-button";
import { UnimadLogo } from "@/components/unimad-logo";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    name: "About us",
    href: "/about",
  },
  
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-md shadow-primary-blue/10 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/home/logo.png"
            alt="Logo"
            width={215}
            height={64}
            priority={true}
            quality={100}
            className="md:block hidden"
          />
          <Image
            src="/home/logo-mobile.png"
            alt="Logo"
            width={174}
            height={52}
            priority={true}
            quality={100}
            className="block md:hidden"
          />
        </Link>
      </div>

      <div className="md:flex text-primary-light-gray text-sm gap-6 hidden">
        {LINKS.map(link => (
          <Link
            key={link.name}
            className={cn("hover:text-primary-blue", pathname === link.href && "text-primary-blue")}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div ref={buttonRef} className="mr-4 md:hidden">
        {!isOpen && (
          <HiOutlineMenuAlt4
            size={24}
            className="cursor-pointer ml-4 gap-2 text-primary-dark-gray"
            onClick={() => setIsOpen(true)}
          />
        )}
        {isOpen && (
          <IoClose
            size={24}
            className="cursor-pointer ml-4 gap-2 text-primary-dark-gray"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      <div className="px-3 md:pr-6 md:pl-[81.69px] hidden md:block">
        <LinkedInLoginButton type="Navbar" />
      </div>

      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute top-[52px] left-0 w-full bg-white shadow-lg p-4 z-50 rounded-b-lg md:hidden"
        >
          <div className="flex flex-col gap-8 mt-4">
            {LINKS.map(link => (
              <Link
                key={link.name}
                className={cn(
                  "hover:text-primary-blue text-primary-light-gray transition-colors duration-300",
                  pathname === link.href && "text-primary-blue"
                )}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <LinkedInLoginButton type="Navbar" />
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
