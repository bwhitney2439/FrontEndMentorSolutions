import React, { useState } from "react";
import logoLight from "../../assets/logo-light.svg";
import logoDark from "../../assets/logo-dark.svg";
import BoardIcon from "../Icons/BoardIcon";
import Toggle from "../Toggle";
import LightThemeIcon from "../Icons/LightThemeIcon";
import DarkThemeIcon from "../Icons/DarkThemeIcon";
import HideSidebarIcon from "../Icons/HideSidebarIcon";

const Sidebar = ({
  data,
  toggleSidebar,
  settoggleSidebar,
  isDarkTheme,
  toggleTheme,
  setSelectedBoard,
  selectedBoard,
}) => {
  return (
    <aside
      className={`hidden fixed z-20 h-full top-0 sm:flex flex-col w-[300px] transition-all ${
        toggleSidebar ? "-translate-x-full" : ""
      }`}
    >
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-dark pt-0 border-r-[1px] border-r-lines-light dark:border-r-lines-dark">
        <div className="ml-8 mt-8 ">
          <img src={isDarkTheme ? logoLight : logoDark} alt="" />
        </div>
        <div className="mt-14 mr-6">
          <p className="text-xs  ml-8 tracking-[2.4px] text-medium-grey mb-[19px]">
            ALL BOARDS
          </p>

          {data.boards.map((board, index) => {
            const { name } = board;

            return (
              <div
                onClick={() => setSelectedBoard(board)}
                key={name}
                className={`flex items-center pl-8 pt-[14px] pb-[15px] ${
                  selectedBoard.name === name ? "bg-main-purple" : null
                } dark:hover:bg-white hover:bg-main-purple hover:bg-opacity-10 hover:text-main-purple rounded-r-[100px] cursor-pointer group`}
              >
                <BoardIcon
                  className={`dark:fill-white  group-hover:fill-main-purple ${
                    selectedBoard.name === name
                      ? "fill-white"
                      : "fill-medium-grey"
                  }   `}
                />
                <h3
                  className={`dark:text-white ${
                    selectedBoard.name === name
                      ? "text-white"
                      : "text-medium-grey"
                  }  group-hover:text-main-purple ml-4`}
                >
                  {name}
                </h3>
              </div>
            );
          })}

          <div className="flex items-center pl-8 pt-[14px] pb-[15px] rounded-r-[100px]">
            <BoardIcon className="fill-main-purple group-hover:fill-main-purple" />
            <h3 className="ml-4 dark:text-main-purple text-main-purple">
              + Create New Board
            </h3>
          </div>
        </div>

        <div className="mt-auto flex py-[14px] justify-center items-center mx-6 bg-light-grey dark:bg-very-dark-grey rounded-md">
          <LightThemeIcon />
          <Toggle
            className="mx-6"
            toggle={isDarkTheme}
            setToggle={toggleTheme}
          />
          <DarkThemeIcon />
        </div>

        <div
          onClick={() => settoggleSidebar((prev) => !prev)}
          className="flex items-center pl-8 pt-[14px] pb-[15px] mb-8 dark:hover:bg-white hover:bg-main-purple hover:bg-opacity-10 hover:text-main-purple rounded-r-[100px] cursor-pointer group mr-6 mt-2"
        >
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
