import React from "react";
import { useAppManager } from "../../context/AppContext";
import { useModalsManager } from "../../context/ModalsManager";
import CreateNewBoardModalContent from "./CreateNewBoardModalContent";
import EditTaskModalContent from "./EditTaskModalContent";
import MobileSidebar from "./MobileSideBar";
import { useTransition, animated } from "react-spring";
import EditTask from "./EditTask";

const Modal = (props) => {
  return (
    <div
      className={`fixed inset-0 bg-black duration-500 bg-opacity-50 flex justify-center items-start z-50 `}
      aria-labelledby="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={() => props.setActiveModal("")}
    >
      <div
        className={`w-full mx-4 sm:m-14  dark:bg-gray-dark bg-white mt-20 rounded-lg py-4 ${props.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};
const Modals = () => {
  const {
    handleCreateNewBoard,
    handleTaskStatusOnChange,
    handleSubTaskOnChange,
    selectedBoard,
    setSelectedBoard,
    selectedBoardData,
    selectedTaskData,
    toggleTheme,
    isDarkTheme,
    kanBanData,
  } = useAppManager();

  const { activeModal, setActiveModal } = useModalsManager();

  switch (activeModal) {
    case "createNewBoard":
      return (
        <Modal setActiveModal={setActiveModal}>
          <CreateNewBoardModalContent
            handleCreateNewBoard={handleCreateNewBoard}
          />
        </Modal>
      );
    case "editTask":
      return (
        <Modal setActiveModal={setActiveModal}>
          <EditTask
            selectedBoardData={selectedBoardData}
            selectedTaskData={selectedTaskData}
            handleTaskStatusOnChange={handleTaskStatusOnChange}
            handleSubTaskOnChange={handleSubTaskOnChange}
          />
        </Modal>
      );
    case "editTaskContent":
      return (
        <Modal setActiveModal={setActiveModal}>
          <EditTaskModalContent
            selectedBoardData={selectedBoardData}
            selectedTaskData={selectedTaskData}
            handleTaskStatusOnChange={handleTaskStatusOnChange}
            handleSubTaskOnChange={handleSubTaskOnChange}
          />
        </Modal>
      );
    case "mobileSidebar":
      return (
        <Modal setActiveModal={setActiveModal} activeModal={activeModal}>
          <MobileSidebar
            data={kanBanData}
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
            handleCreateNewBoard={handleCreateNewBoard}
          />
        </Modal>
      );
    default:
      return null;
  }
};

export default Modals;
