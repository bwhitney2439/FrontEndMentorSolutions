import React from "react";
import BoardIcon from "../Icons/BoardIcon";
import DarkThemeIcon from "../Icons/DarkThemeIcon";
import LightThemeIcon from "../Icons/LightThemeIcon";
import { Modal, ModalContents, ModalOpenButton } from "../Modal";
import CreateNewBoardModalContent from "../Modals/CreateNewBoardModalContent";
import Toggle from "../Toggle";

const MobileSidebar = ({
  isDarkTheme,
  toggleTheme,
  data,
  setSelectedBoard,
  selectedBoard,
  handleCreateNewBoard,
}) => {
  return (
    <>
      {/* Header */}
      <div className="ml-6 mb-[19px]">
        <p className="text-xs tracking-[2.4px] text-medium-grey ">ALL BOARDS</p>
      </div>
      {/* Body */}
      <div className="mr-6 mb-4">
        {data.boards.map((board, index) => {
          return (
            <div
              onClick={() => setSelectedBoard(board)}
              key={board.name}
              className={`flex items-center pl-8 pt-[14px] pb-[15px] ${
                selectedBoard.name === board.name ? "bg-main-purple" : null
              }  rounded-r-[100px] cursor-pointer`}
            >
              <BoardIcon
                className={`dark:fill-white  group-hover:fill-main-purple ${
                  selectedBoard.name === board.name
                    ? "fill-white"
                    : "fill-medium-grey"
                }   `}
              />
              <h3
                className={`dark:text-white ${
                  selectedBoard.name === board.name
                    ? "text-white"
                    : "text-medium-grey"
                }  group-hover:text-main-purple ml-4`}
              >
                {board.name}
              </h3>
            </div>
          );
        })}

        {/* <Modal> */}
        <Modal>
          <ModalOpenButton>
            <button className="flex items-center pl-8  pt-[14px] pb-[15px] rounded-r-[100px]">
              <BoardIcon className="fill-main-purple group-hover:fill-main-purple" />
              <h3 className="ml-4 dark:text-main-purple text-main-purple">
                + Create New Board
              </h3>
            </button>
          </ModalOpenButton>
          <ModalContents className="m-6">
            <CreateNewBoardModalContent
              handleCreateNewBoard={handleCreateNewBoard}
              data={data}
            />
          </ModalContents>
        </Modal>

        {/* </Modal> */}
      </div>

      {/* Footer */}
      <div className="flex h-12 justify-center items-center mx-4 dark:bg-very-dark-grey bg-light-grey rounded-md">
        <LightThemeIcon />
        <Toggle
          toggle={isDarkTheme}
          setToggle={toggleTheme}
          className="mx-6 sm:hidden"
        />
        <DarkThemeIcon />
      </div>
    </>
  );
};

export default MobileSidebar;
