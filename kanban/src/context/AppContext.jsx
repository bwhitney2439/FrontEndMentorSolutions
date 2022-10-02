import React, { createContext, useContext, useState } from "react";
import data from "../data.json";
import useLocalStorage from "../hooks/useLocalStorage";
const getInitialStateData = () => {
  if ("data" in localStorage) {
    return JSON.parse(localStorage.data);
  }
  return data;
};
const AppManagerContext = createContext(null);

const AppManager = ({ children, ...props }) => {
  const [kanBanData, setKanBanData] = useLocalStorage(
    "data",
    getInitialStateData()
  );
  const [selectedBoard, setSelectedBoard] = useState(kanBanData.boards[0]);
  const [selectedTask, setSelectedTask] = useState(null);

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
    ].tasks?.findIndex((task) => task?.title === selectedTaskData?.title);
    const thing = tempData.boards[boardIndex].columns[columnIndex].tasks.splice(
      taskIndex,
      1
    );
    const newColumnIndex = tempData.boards[boardIndex].columns.findIndex(
      (column) => column.name === event.target.value
    );

    tempData.boards[boardIndex].columns[newColumnIndex].tasks.push({
      ...thing[0],
      status: event.target.value,
    });

    setKanBanData(tempData);
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

  const handleCreateNewBoard = (newBoard) => {
    setKanBanData((prev) => ({
      ...prev,
      boards: [
        ...prev.boards,
        {
          name: newBoard.boardName,
          columns: newBoard.columns.map((column) => ({
            name: column,
            tasks: [],
          })),
        },
      ],
    }));
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

  const value = {
    kanBanData,
    setKanBanData,
    selectedBoard,
    selectedTask,
    setSelectedBoard,
    setSelectedTask,
    handleCreateNewBoard,
    handleSubTaskOnChange,
    handleTaskStatusOnChange,
    selectedBoardData,
    selectedTaskData,
    ...props,
  };

  return (
    <AppManagerContext.Provider value={value}>
      {children}
    </AppManagerContext.Provider>
  );
};
const useAppManager = () => useContext(AppManagerContext);
export { AppManager, useAppManager };
