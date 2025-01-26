import BottomNavMenuMobile from "@/components/bottom-nav-menu-mobile";
import InitializeUserStore from "@/components/initialize-user-store";
import { Sidebar } from "@/components/sidebar";
import TopNavMenuMobile from "@/components/top-nav-menu-mobile";
import { UniBot } from "@/components/unibot";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UniBoardLayout = async ({ children }) => {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get("access_token");

  const fetchUserData = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-data/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
      redirect: "follow",
    });

    const data = await res.json();
    return data;
  };

  const userData = await fetchUserData();

  return (
    <main className="flex flex-col md:flex-row min-h-screen h-screen md:h-auto overflow-hidden">
      <InitializeUserStore userData={userData} />
      <Sidebar userData={userData} />
      <TopNavMenuMobile userData={userData} />
      <div className="md:flex md:flex-col grow md:ml-[18rem] overflow-hidden md:relative">
        {children}
        <UniBot
          className="md:bottom-6 bottom-[7px] md:w-[calc(100%-2rem)] w-[calc(100%-1rem)] ml-2 md:ml-4"
          rootClassName=""
        />
      </div>
      <BottomNavMenuMobile />
    </main>
  );
};

export default UniBoardLayout;
