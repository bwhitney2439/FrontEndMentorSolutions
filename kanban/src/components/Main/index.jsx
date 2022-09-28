import React from "react";
import Column from "../Column";
import Task from "../Task";
import { useState } from "react";
import Modal from "../Modal";

const Main = ({ kanBanData, selectedBoard, setKanBanData, toggleSidebar }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [toggleTaskModal, setToggleTaskModal] = useState(false);

  const handleTaskOnClick = (task) => {
    setSelectedTask(task);
    setToggleTaskModal(true);
  };

  const handleSubTaskOnChange = (selectedSubtask) => {
    const updatedKanBanData = kanBanData.boards.map((board) => {
      const newColums = board.columns.map((column) => {
        const newTasks = column.tasks.map((task) => {
          const newSubtasks = task.subtasks.map((subtask) => {
            if (subtask.title === selectedSubtask.title) {
              return {
                ...subtask,
                isCompleted: !selectedSubtask.isCompleted,
              };
            }
            return {
              ...subtask,
            };
          });

          return { ...task, subtasks: newSubtasks };
        });

        return { ...column, tasks: newTasks };
      });

      return { ...board, columns: newColums };
    });

    setKanBanData({ boards: updatedKanBanData });
  };

  const handleTaskStatusOnChange = (event) => {
    let tempData = { ...kanBanData };
    const boardIndex = tempData.boards.findIndex(
      (board) => board.name === selectedBoard.name
    );
    const columnIndex = tempData.boards[boardIndex].columns.findIndex(
      (column) => column.name === selectedTaskData.status
    );
    const taskIndex = tempData.boards[boardIndex].columns[
      columnIndex
    ].tasks.findIndex((task) => task.title === selectedTaskData.title);
    const thing = tempData.boards[boardIndex].columns[columnIndex].tasks.splice(
      taskIndex,
      1
    );

    const newColumnIndex = tempData.boards[boardIndex].columns.findIndex(
      (column) => column.name === event.target.value
    );

    console.log(thing);
    tempData.boards[boardIndex].columns[newColumnIndex].tasks.push({
      ...thing[0],
      status: event.target.value,
    });

    setKanBanData(tempData);
  };

  const selectedBoardData = kanBanData.boards.find(
    (board) => board.name === selectedBoard.name
  );

  const selectedTaskData = selectedBoardData.columns.reduce(
    (prev, curr) => {
      const foundTask = curr.tasks.find(
        (task) => task?.title === selectedTask?.title
      );

      return foundTask ?? prev;
    },
    {
      title: "",
      description: "",
      status: "",
      subtasks: [],
    }
  );

  return (
    <div
      className={`dark:bg-very-dark-grey bg-light-grey flex-1 ${
        toggleSidebar ? "sm:ml-0" : "sm:ml-[300px]"
      } mt-[64px] sm:mt-[81px] lg:mt-[97px] transition-all`}
    >
      <main className="h-full">
        {kanBanData.boards.length > 0 ? (
          <div className="flex pt-6 pl-3 overflow-x-scroll h-full">
            {selectedBoardData.columns.map((column) => {
              return (
                <Column key={column.name} column={column}>
                  {column.tasks.map((task) => {
                    return (
                      <Task
                        key={task.title}
                        onClick={() => handleTaskOnClick(task)}
                        task={task}
                      />
                    );
                  })}
                  <div className="dark:bg-gray-dark px-4 py-6 rounded-lg my-6  min-w-[280px] max-w-[280px] shadow-[0_4px_6px_0px_rgba(54, 78, 126, 0.101545)] cursor-pointer">
                    <h2 className="dark:text-medium-grey text-medium-grey text-center">
                      + New Task
                    </h2>
                  </div>
                </Column>
              );
            })}
            <div className="bg-gradient-to-tr from-[#E9EFFA] to-[rgba(233, 239, 250, 0.5)] dark:bg-gradient-to-tr dark:from-[#282c34] dark:to-[#282838] min-w-[280px] max-w-[280px] rounded-md flex items-center justify-center mt-[40px] mb-[24px] mr-36 ml-3 ">
              <h1 className="text-medium-grey dark:text-medium-grey">
                + New Column
              </h1>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center px-8">
              <h2 className="text-medium-grey text-center ">
                This board is empty. Create a new column to get started.
              </h2>
              <button className="text-white w-[174px] h-[48px] bg-main-purple hover:bg-main-purple-hover rounded-3xl mt-6">
                + Add New Column
              </button>
            </div>
          </div>
        )}
      </main>

      <Modal
        show={toggleTaskModal}
        onClose={() => setToggleTaskModal(false)}
        className="mx-4"
      >
        <div className="px-6 py-2">
          <h2 className="mb-6">{selectedTaskData?.title}</h2>
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
            defaultValue={selectedTaskData?.status}
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
      </Modal>
    </div>
  );
};

export default Main;
