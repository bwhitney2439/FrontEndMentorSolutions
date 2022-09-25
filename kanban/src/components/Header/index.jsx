import React from "react";
import logoMobile from "../../assets/logo-mobile.svg";
import icomChevronDown from "../../assets/icon-chevron-down.svg";
import iconAddTaskMobile from "../../assets/icon-add-task-mobile.svg";
import VerticalEllipsisIcon from "../Icons/VerticalEllipsisIcon";

const Header = () => {
  return (
    <header className="flex w-full fixed">
      <div className="hidden sm:flex w-[300px] h-[97px] bg-gray-dark border-b-[1px] border-b-lines-dark"></div>
      <div className="flex-1 h-[97px] bg-gray-dark border-b-lines-dark border-b-[1px] flex items-center px-4 sm:px-6">
        <img src={logoMobile} alt="" className="sm:hidden mr-4" />
        <div className="flex items-center">
          <button className="text-white text-lg sm:text-xl lg:text-2xl">
            Platform Launch
          </button>
          <img src={icomChevronDown} alt="" className="ml-2 sm:hidden" />
        </div>

        {/* Desktop Button */}
        <button className="hidden sm:block ml-auto mr-6 text-white w-[164px] h-12 bg-main-purple hover:bg-main-purple-hover rounded-3xl">
          + Add New Task
        </button>

        {/* Mobile Button */}
        <button className="w-12 h-8 ml-auto mr-4 text-white sm:hidden flex items-center justify-center bg-main-purple hover:bg-main-purple-hover rounded-3xl">
          <img src={iconAddTaskMobile} alt="" />
        </button>
        <VerticalEllipsisIcon className="fill-medium-grey cursor-pointer hover:fill" />
      </div>
    </header>
  );
};

export default Header;
