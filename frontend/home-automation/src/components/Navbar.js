"use client";
import { RxHamburgerMenu } from "react-icons/rx";

import { useState } from "react";
import { MdClose } from "react-icons/md";
import Sidebar from "./Sidebar";
import dynamic from "next/dynamic";
const CurrentTime = dynamic(() => import("@/lib/utils/CurrentTime"), {
  ssr: false,
});
const Navbar = () => {
  const [showSidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!showSidebar);
  };

  return (
    <div className="Nav bg-white w-full h-16 py-3 px-8 md:px-14 flex items-center justify-between">
      <div className="cursor-pointer z-30 relative" onClick={toggleSidebar}>
        {showSidebar ? (
          <MdClose fontSize={26} className="fixed top-4" />
        ) : (
          <RxHamburgerMenu fontSize={24} />
        )}
      </div>
      <div className="flex flex-col text-center">
        <div className="font-bold text-xl">Remote Control Home</div>
        <div className="text-xs">Online home automation</div>
      </div>
      <div className="text-sm md:text-lg">
        <CurrentTime />
      </div>

      <Sidebar showSidebar={showSidebar} setSidebar={setSidebar} />
    </div>
  );
};

export default Navbar;
