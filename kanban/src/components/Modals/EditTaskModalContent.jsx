import React, { useRef } from "react";
import { useState } from "react";
import { useAppManager } from "../../context/AppContext";
import { useModalsManager } from "../../context/ModalsManager";
import VerticalEllipsisIcon from "../Icons/VerticalEllipsisIcon";
import Select from "../Select";

const EditTaskModalContent = () => {
  const {
    selectedBoard,
    selectedTask,
    setSelectedTask,
    kanBanData,
    setKanBanData,
  } = useAppManager();
  const { setActiveModal } = useModalsManager();
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const ellipsisRef = useRef();

  const handleSubTaskOnChange = (subtask) => {
    setSelectedTask((prev) => {
      return {
        ...prev,
        subtasks: prev.subtasks.map((prevSubtask) => {
          if (prevSubtask.id === subtask.id) {
            return { ...prevSubtask, isCompleted: !prevSubtask.isCompleted };
          }
          return prevSubtask;
        }),
      };
    });

    const updatedKanBanData = {
      boards: kanBanData.boards.map((board) => {
        if (board.id === selectedBoard.id) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              return {
                ...column,
                tasks: column.tasks.map((task) => {
                  if (task.id === selectedTask.id) {
                    return {
                      ...task,
                      subtasks: task.subtasks.map((currentSubtask) => {
                        if (currentSubtask.id === subtask.id) {
                          return {
                            ...currentSubtask,
                            isCompleted: !currentSubtask.isCompleted,
                          };
                        }
                        return currentSubtask;
                      }),
                    };
                  }

                  return task;
                }),
              };
            }),
          };
        }
        return board;
      }),
    };

    setKanBanData(updatedKanBanData);
  };

  const handleTaskStatusOnChange = (value) => {
    let tempData = { ...kanBanData };
    const boardIndex = tempData.boards.findIndex(
      (board) => board.id === selectedBoard.id
    );
    const columnIndex = tempData.boards[boardIndex].columns.findIndex(
      (column) => column.name === selectedTask.status
    );
    const taskIndex = tempData.boards[boardIndex].columns[
      columnIndex
    ].tasks?.findIndex((task) => task?.id === selectedTask?.id);

    const thing = tempData.boards[boardIndex].columns[columnIndex].tasks.splice(
      taskIndex,
      1
    );
    console.log(value);
    const newColumnIndex = tempData.boards[boardIndex].columns.findIndex(
      (column) => column.name === value
    );

    const newColumnName =
      tempData.boards[boardIndex].columns[newColumnIndex].name;

    tempData.boards[boardIndex].columns[newColumnIndex].tasks.push({
      ...thing[0],
      status: newColumnName,
    });

    setKanBanData(tempData);

    setSelectedTask((prev) => {
      return { ...prev, status: newColumnName };
    });
  };

  return (
    <div className="px-6 py-2" onClick={() => setIsTaskMenuOpen(false)}>
      <div ref={ellipsisRef} className="flex justify-between items-center mb-6">
        <h2>{selectedTask?.title}</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsTaskMenuOpen((prev) => !prev);
          }}
        >
          <VerticalEllipsisIcon className="fill-medium-grey cursor-pointer hover:fill" />
        </button>

        {ellipsisRef?.current && (
          <ul
            className={`absolute text-white right-0 bg-very-dark-grey transition-all ${
              isTaskMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              top:
                ellipsisRef?.current?.offsetTop +
                ellipsisRef?.current?.clientHeight +
                5,
            }}
          >
            <li className="px-4 py-4  font-medium text-[13px] text-medium-grey">
              <button onClick={() => setActiveModal("editTask")}>
                Edit Task
              </button>
            </li>
            <li className="px-4 pb-4 text-red font-medium text-[13px]">
              <button onClick={() => console.log("delete task")}>
                Delete Task
              </button>
            </li>
          </ul>
        )}
      </div>
      <p className="dark:text-medium-grey text-[13px] leading-[23px] mb-6">
        {selectedTask?.description}
      </p>

      <p className="mb-4">
        Subtasks (
        {
          selectedTask?.subtasks?.filter(
            (subtask) => subtask.isCompleted === true
          ).length
        }{" "}
        of {selectedTask?.subtasks?.length})
      </p>
      {selectedTask?.subtasks.map((subtask) => {
        return (
          <div
            key={subtask.title}
            className="flex items-center dark:bg-very-dark-grey rounded-[4px] p-4 mb-2 dark:hover:bg-main-purple"
          >
            <input
              id={subtask.id}
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={() => handleSubTaskOnChange(subtask)}
              className="peer w-4 h-4"
            />{" "}
            <label
              className="ml-4 text-xs peer-checked:text-medium-grey peer-checked:line-through text-white"
              htmlFor={subtask.id}
            >
              {subtask.title}
            </label>
          </div>
        );
      })}
      <p className="text-xs mb-2 mt-6">Current Status</p>

      <Select
        value={selectedTask.status}
        onChange={handleTaskStatusOnChange}
        options={selectedBoard.columns}
      />

      {/* <select
        value={selectedTask.status}
        onChange={handleTaskStatusOnChange}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      >
        {selectedBoard.columns.map((column, index) => {
          return (
            <option
              className="text-black"
              key={column.id}
              value={column.name}
              name={column.name}
            >
              {column.name}
            </option>
          );
        })}
      </select> */}
    </div>
  );
};

export default EditTaskModalContent;
