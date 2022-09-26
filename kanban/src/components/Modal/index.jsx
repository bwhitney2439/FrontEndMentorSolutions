import React, { useState } from "react";
import BoardIcon from "../Icons/BoardIcon";
import DarkThemeIcon from "../Icons/DarkThemeIcon";
import LightThemeIcon from "../Icons/LightThemeIcon";
import Toggle from "../Toggle";

const Modal = (props) => {
  const { toggle, setToggle } = props;
  if (!props.show) {
    return null;
  }

  return (
    // {/* Modal Header */}
    <div
      className="sm:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity flex justify-center items-start"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={props.onClose}
    >
      <div
        className="w-full m-14 dark:bg-gray-dark bg-white mt-20 rounded-lg py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="ml-6 mb-[19px]">
          <p className="text-xs tracking-[2.4px] text-medium-grey ">
            ALL BOARDS
          </p>
        </div>
        {/* Modal Body */}

        <div className="mr-6 mb-4">
          {["Platform Launch", "Marketing Plan", "Roadmap"].map(
            (item, index) => {
              return (
                <div
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
                    {item}
                  </h3>
                </div>
              );
            }
          )}

          {/* <div className="flex items-center pl-6 pt-[14px] pb-[15px] bg-main-purple hover:bg-main-purple-hover rounded-r-[100px] cursor-pointer">
            <BoardIcon className="fill-white" />
            <p className="text-white ml-4">Platform Launch</p>
          </div>

          <div className="flex group items-center pl-6 pt-[14px] pb-[15px] hover:bg-white rounded-r-[100px] cursor-pointer">
            <BoardIcon className="fill-medium-grey group-hover:fill-main-purple" />
            <p className="text-medium-grey ml-4 group-hover:text-main-purple">
              Marketing Plan
            </p>
          </div>

          <div className="flex group items-center pl-6 pt-[14px] pb-[15px] hover:bg-white rounded-r-[100px] cursor-pointer">
            <BoardIcon className="fill-medium-grey group-hover:fill-main-purple" />
            <p className="text-medium-grey ml-4 group-hover:text-main-purple">
              Roadmap
            </p>
          </div> */}

          <div className="flex items-center pl-8  pt-[14px] pb-[15px] rounded-r-[100px]">
            <BoardIcon className="fill-main-purple group-hover:fill-main-purple" />
            <h3 className="ml-4 text-main-purple">+ Create New Board</h3>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex h-12 justify-center items-center mx-4 dark:bg-very-dark-grey bg-light-grey rounded-md">
          <LightThemeIcon />
          <Toggle
            toggle={toggle}
            setToggle={setToggle}
            className="mx-6 sm:hidden"
          />
          <DarkThemeIcon />
        </div>
      </div>
    </div>
  );
};

export default Modal;
