import React from "react";
import { useAppManager } from "../../context/AppContext";
import { useModalsManager } from "../../context/ModalsManager";
import Button from "../Button";

const DeleteBoard = () => {
  const { kanBanData, setKanBanData, selectedBoardData, setSelectedBoard } =
    useAppManager();
  const { setActiveModal } = useModalsManager();

  const handleDeleteBoard = () => {
    console.log(
      kanBanData.boards.filter((board) => board.id !== selectedBoardData.id)[0]
        .name
    );
    // setSelectedBoard(
    //   kanBanData.boards.filter((board) => board.id !== selectedBoardData.id)[0]
    //     .name
    // );

    setKanBanData((prev) => {
      return {
        boards: prev.boards.filter(
          (board) => board.id !== selectedBoardData.id
        ),
      };
    });
  };

  return (
    <div className="px-6 py-2">
      <h2 className="dark:text-red mb-6">Delete this board</h2>
      <p className="mb-6 dark:text-medium-grey">
        Are you sure you want to delete the ‘Platform Launch’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>

      <Button
        type="button"
        onClick={handleDeleteBoard}
        className="w-full mb-4 bg-red  hover:bg-red-hover"
      >
        Delete
      </Button>
      <Button
        type="button"
        onClick={() => setActiveModal("")}
        className="w-full bg-white text-main-purple"
      >
        Cancel
      </Button>
    </div>
  );
};

export default DeleteBoard;
