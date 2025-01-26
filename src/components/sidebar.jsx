import Image from "next/image";
import DropdownNavMenu from "./dropdown-nav-menu";
import { SidebarNavMenu } from "./sidebar-nav-menu";
import { UnimadLogoBeta } from "./unimad-logo-beta";

export const Sidebar = async ({ userData }) => {
  return (
    <nav className="h-screen flex-col bg-white w-[18rem] fixed top-0 left-0 md:flex hidden">
      {/* Logo */}
      <div className="relative">
        <Image
          src="/sidebar/dashboard-ellipse.png"
          width={320}
          height={320}
          alt="Dashboard Ellipse For Logo"
          className="object-cover w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <UnimadLogoBeta className="w-[8rem]" />
        </div>
      </div>

      {/* Profile */}
      <div className="mx-2 p-2 flex gap-2 mt-6 mb-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={userData?.profilePictureUrl || "/images/person.png"}
            width={45}
            height={45}
            alt="Profile Picture"
            className="rounded-full flex-shrink-0"
          />
          <h3 className="text-xl font-semibold text-primary-blue">{userData.name || "Guest"}</h3>
        </div>
        {/* <BsThreeDotsVertical size={18} className="text-primary-dark-gray cursor-pointer" /> */}
        <DropdownNavMenu />
      </div>

      <hr className="border-[#D9D9D9] border-t-2" />

      {/* Navigation */}
      <SidebarNavMenu />

      {/* Footer */}
      <div className="flex-grow flex justify-end items-end mb-4 mx-4">
      </div>
    </nav>
  );
};
