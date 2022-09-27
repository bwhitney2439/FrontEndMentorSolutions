import React from "react";
import BoardIcon from "../Icons/BoardIcon";
import DarkThemeIcon from "../Icons/DarkThemeIcon";
import LightThemeIcon from "../Icons/LightThemeIcon";
import Modal from "../Modal";
import Toggle from "../Toggle";

const MobileSidebar = ({ show, onClose, isDarkTheme, toggleTheme, data }) => {
  return (
    <Modal show={show} onClose={onClose} className="sm:hidden">
      {/* Modal Header */}
      <div className="ml-6 mb-[19px]">
        <p className="text-xs tracking-[2.4px] text-medium-grey ">ALL BOARDS</p>
      </div>
      {/* Modal Body */}

      <div className="mr-6 mb-4">
        {data.boards.map((board, index) => {
          return (
            <div
              key={board.name}
              className={`flex items-center pl-8 pt-[14px] pb-[15px] ${
                index === 0 ? "bg-main-purple" : null
              } dark:hover:bg-white hover:bg-main-purple hover:bg-opacity-10 hover:text-main-purple rounded-r-[100px] cursor-pointer group`}
            >
              <BoardIcon
                className={`dark:fill-white  group-hover:fill-main-purple ${
                  index === 0 ? "fill-white" : "fill-medium-grey"
                }   `}
              />
              <h3
                className={`dark:text-white ${
                  index === 0 ? "text-white" : "text-medium-grey"
                }  group-hover:text-main-purple ml-4`}
              >
                {board.name}
              </h3>
            </div>
          );
        })}

        <div className="flex items-center pl-8  pt-[14px] pb-[15px] rounded-r-[100px]">
          <BoardIcon className="fill-main-purple group-hover:fill-main-purple" />
          <h3 className="ml-4 text-main-purple">+ Create New Board</h3>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="flex h-12 justify-center items-center mx-4 dark:bg-very-dark-grey bg-light-grey rounded-md">
        <LightThemeIcon />
        <Toggle
          toggle={isDarkTheme}
          setToggle={toggleTheme}
          className="mx-6 sm:hidden"
        />
        <DarkThemeIcon />
      </div>
    </Modal>
  );
};

export default MobileSidebar;
