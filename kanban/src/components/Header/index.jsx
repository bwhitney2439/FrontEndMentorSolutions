import React from "react";
import logoMobile from "../../assets/logo-mobile.svg";
import icomChevronDown from "../../assets/icon-chevron-down.svg";
import iconAddTaskMobile from "../../assets/icon-add-task-mobile.svg";
import VerticalEllipsisIcon from "../Icons/VerticalEllipsisIcon";
import logoLight from "../../assets/logo-light.svg";
import logoDark from "../../assets/logo-dark.svg";

const Header = ({ setShow, toggleSidebar, isDarkTheme, selectedBoard }) => {
  return (
    <header className="flex w-full fixed">
      <div
        className={`hidden sm:flex ${
          toggleSidebar ? "w-[210px]" : "w-[300px]"
        } h-[81px] lg:h-[97px] dark:bg-gray-dark border-b-[1px] border-r-[1px] border-b-lines-light dark:border-b-lines-dark border-r-lines-light dark:border-r-lines-dark transition-all items-center justify-center `}
      >
        <div>
          <img src={isDarkTheme ? logoLight : logoDark} alt="" />
        </div>
      </div>
      <div className="flex-1 h-16 sm:h-[81px] lg:h-[97px] bg-white dark:bg-gray-dark border-b-lines-light dark:border-b-lines-dark border-b-[1px] flex items-center px-4 sm:px-6">
        <img src={logoMobile} alt="" className="sm:hidden mr-4" />
        <div className="flex items-center">
          <button
            className="dark:text-white text-black text-lg sm:text-xl lg:text-2xl font-bold"
            onClick={() => setShow(true)}
          >
            {selectedBoard.name}
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
