import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useAppManager } from "../../context/AppContext";
import { useModalsManager } from "../../context/ModalsManager";
import VerticalEllipsisIcon from "../Icons/VerticalEllipsisIcon";

const EditTaskModalContent = ({}) => {
  const {
    selectedTaskData,
    selectedBoardData,
    handleTaskStatusOnChange,
    handleSubTaskOnChange,
  } = useAppManager();
  const { setActiveModal } = useModalsManager();
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const ellipsisRef = useRef();

  useEffect(() => {}, [ellipsisRef.current]);

  return (
    <div className="px-6 py-2" onClick={() => setIsTaskMenuOpen(false)}>
      <div ref={ellipsisRef} className="flex justify-between items-center mb-6">
        <h2>{selectedTaskData?.title}</h2>
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
        {selectedTaskData?.description}
      </p>

      <p className="mb-4">
        Subtasks (
        {
          selectedTaskData?.subtasks?.filter(
            (subtask) => subtask.isCompleted === true
          ).length
        }{" "}
        of {selectedTaskData?.subtasks?.length})
      </p>
      {selectedTaskData?.subtasks.map((subtask) => {
        return (
          <div
            key={subtask.title}
            className="flex items-center dark:bg-very-dark-grey rounded-[4px] p-4 mb-2"
          >
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={() => handleSubTaskOnChange(subtask)}
              className="peer"
            />
            <p className="ml-4 peer-checked:text-medium-grey peer-checked:line-through">
              {subtask.title}
            </p>
          </div>
        );
      })}
      <p className="text-xs mb-2 mt-6">Current Status</p>
      <select
        value={selectedTaskData?.status}
        onChange={(event) => handleTaskStatusOnChange(event)}
        className={`w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px] `}
      >
        {selectedBoardData.columns.map((column, index) => {
          return (
            <option className="text-black" key={index} value={column.name}>
              {column.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EditTaskModalContent;
