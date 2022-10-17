import React from "react";
import { useAppManager } from "../../context/AppContext";
import { useModalsManager } from "../../context/ModalsManager";
import EditTaskModalContent from "./EditTaskModalContent";
import MobileSidebar from "./MobileSideBar";
import EditTask from "./EditTask";
import CreateTask from "./CreateTask";
import EditBoard from "./EditBoard";
import CreateBoard from "./CreateBoard";
import DeleteBoard from "./DeleteBoard";

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
    case "createBoard":
      return (
        <Modal setActiveModal={setActiveModal}>
          <CreateBoard />
        </Modal>
      );
    case "editBoard":
      return (
        <Modal setActiveModal={setActiveModal}>
          <EditBoard />
        </Modal>
      );
    case "deleteBoard":
      return (
        <Modal setActiveModal={setActiveModal}>
          <DeleteBoard />
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
          <EditTaskModalContent />
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
    case "createNewTask":
      return (
        <Modal setActiveModal={setActiveModal} activeModal={activeModal}>
          <CreateTask />
        </Modal>
      );
    case "deleteTask":
      return (
        <Modal setActiveModal={setActiveModal} activeModal={activeModal}>
          <CreateTask />
        </Modal>
      );
    default:
      return null;
  }
};

export default Modals;
