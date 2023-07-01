import React from "react";
import Link from "next/link";
const Sidebar = ({ showSidebar, setSidebar }) => {
  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <div
      className={
        showSidebar
          ? "fixed left-0 top-0 bottom-0 w-full md:w-1/5 h-screen border-l-gray-900 z-20 bg-white ease-in-out transition-all duration-300"
          : "fixed left-[-100%] top-0 bottom-0 w-1/5 h-screen border-l-gray-900 z-10 bg-white ease-in-out transition-all duration-300"
      }
    >
      <ul className="pt-16 pl-14 pr-14 md:pr-4 uppercase">
        <Link href={"/"}>
          <li
            className="py-4 border-b border-gray-200 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={closeSidebar}
          >
            Home
          </li>
        </Link>
        <Link href={"/livestream"}>
          <li
            className="py-4 border-b border-gray-200 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={closeSidebar}
          >
            Live Stream
          </li>
        </Link>
        <Link href={"#"}>
          <li
            className="py-4 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={closeSidebar}
          >
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
