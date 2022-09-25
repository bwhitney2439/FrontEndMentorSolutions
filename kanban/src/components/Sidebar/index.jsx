import React from "react";
import logoLight from "../../assets/logo-light.svg";
import BoardIcon from "../Icons/BoardIcon";
import Toggle from "../Toggle";
import LightThemeIcon from "../Icons/LightThemeIcon";
import DarkThemeIcon from "../Icons/DarkThemeIcon";
import HideSidebarIcon from "../Icons/HideSidebarIcon";

const Sidebar = () => {
  return (
    <aside className="hidden fixed z-20 h-full top-0 sm:flex flex-col w-[300px]">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-dark pt-0 border-r-[1px] border-r-lines-dark">
        <div className="ml-8 mt-8 ">
          <img src={logoLight} alt="" />
        </div>
        <div className="mt-14 mr-6">
          <p className="text-xs  ml-8 tracking-[2.4px] text-medium-grey mb-[19px]">
            ALL BOARDS
          </p>

          <div className="flex items-center pl-8 pt-[14px] pb-[15px] bg-main-purple hover:bg-main-purple-hover rounded-r-[100px] cursor-pointer">
            <BoardIcon className="fill-white" />
            <p className="text-white ml-4">Platform Launch</p>
          </div>

          <div className="flex group items-center pl-8 pt-[14px] pb-[15px] hover:bg-white rounded-r-[100px] cursor-pointer">
            <BoardIcon className="fill-medium-grey group-hover:fill-main-purple" />
            <p className="text-medium-grey ml-4 group-hover:text-main-purple">
              Marketing Plan
            </p>
          </div>

          <div className="flex group items-center pl-8 pt-[14px] pb-[15px] hover:bg-white rounded-r-[100px] cursor-pointer">
            <BoardIcon className="fill-medium-grey group-hover:fill-main-purple" />
            <p className="text-medium-grey ml-4 group-hover:text-main-purple">
              Roadmap
            </p>
          </div>

          <div className="flex items-center pl-8 pt-[14px] pb-[15px] rounded-r-[100px]">
            <BoardIcon className="fill-main-purple group-hover:fill-main-purple" />
            <p className="ml-4 text-main-purple">+ Create New Board</p>
          </div>
        </div>

        <div className="mt-auto flex py-[14px] justify-center items-center mx-6 bg-very-dark-grey rounded-md">
          <LightThemeIcon />
          <Toggle className="mx-6" />
          <DarkThemeIcon />
        </div>

        <div className="flex group items-center pl-8 pt-[14px] pb-[15px] rounded-r-[100px] mb-8 cursor-pointer mr-6 hover:bg-white mt-2">
          <HideSidebarIcon className="fill-medium-grey group-hover:fill-main-purple" />
          <h3 className="ml-[15px] text-medium-grey group-hover:text-main-purple">
            Hide Sidebar
          </h3>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
