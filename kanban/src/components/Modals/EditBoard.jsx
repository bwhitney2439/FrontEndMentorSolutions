import React, { useState } from "react";
import CrossIcon from "../../assets/icon-cross.svg";
import { useAppManager } from "../../context/AppContext";
import { useModalsManager } from "../../context/ModalsManager";
import { randomId } from "../../utils/createId";
import Button from "../Button";

const EditBoard = () => {
  const { selectedBoardData, kanBanData, setKanBanData } = useAppManager();
  const { setActiveModal } = useModalsManager();
  const [columns, setColumns] = useState(
    selectedBoardData.columns.map((column) => column)
  );
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());

    const { boardName } = fieldValues;

    const updateKanBanData = {
      boards: kanBanData.boards.map((board) => {
        if (board.id === selectedBoardData.id) {
          return {
            ...board,
            name: boardName,
            columns: columns,
          };
        }

        return board;
      }),
    };

    setKanBanData(updateKanBanData);
    setActiveModal("");
  }

  return (
    <form className="px-6 py-2" onSubmit={handleSubmit}>
      <h2>Edit Board</h2>
      <p htmlFor="board-name" className="text-xs mb-2 mt-6 text-white">
        Board Name
      </p>
      <input
        required
        name="boardName"
        id="board-name"
        className="block w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px]"
        type="text"
        placeholder="e.g. Web Design"
        defaultValue={selectedBoardData.name}
      />

      <p htmlFor="board-name" className="text-xs mb-2 mt-6 text-white">
        Board Columns
      </p>
      {columns.map((column) => {
        return (
          <div className="flex mb-3" key={column.id}>
            <input
              name={column.id}
              value={column.name}
              onChange={(event) => {
                setColumns((prev) => {
                  return prev.map((prevColumn) => {
                    if (prevColumn.id === column.id) {
                      return {
                        ...prevColumn,
                        name: event.target.value,
                        tasks: prevColumn.tasks.map((task) => {
                          return {
                            ...task,
                            status: event.target.value,
                          };
                        }),
                      };
                    }
                    return { ...prevColumn };
                  });
                });
              }}
              required
              className="block w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px] mr-4"
              type="text"
              placeholder="e.g. Web Design"
            />
            <button
              type="button"
              onClick={() =>
                setColumns((prev) =>
                  prev.filter((prevColumn) => prevColumn.id !== column.id)
                )
              }
            >
              <img src={CrossIcon} alt="cross-icon" srcSet="" />
            </button>
          </div>
        );
      })}

      <Button
        type="button"
        onClick={() =>
          setColumns((prev) => [
            ...prev,
            { id: randomId(), name: "", tasks: [] },
          ])
        }
        className="w-full mb-6 bg-white text-main-purple hover:bg-white"
      >
        + Add New Column
      </Button>
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  );
};

export default EditBoard;
