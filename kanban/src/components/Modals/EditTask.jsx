import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useAppManager } from "../../context/AppContext";
import Button from "../Button";
import CrossIcon from "../../assets/icon-cross.svg";
import Input from "../Input";
import { randomId } from "../../utils/createId";

const EditTask = ({}) => {
  const {
    selectedTaskData,
    selectedBoardData,
    selectedBoard,
    setKanBanData,
    kanBanData,
  } = useAppManager();
  const [subTasks, setSubTasks] = useState(
    selectedTaskData.subtasks.map((subtask) => ({ id: randomId(), ...subtask }))
  );
  const ellipsisRef = useRef();

  useEffect(() => {}, [ellipsisRef.current]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    // const formIsValid = Object.values(fieldValues).every(
    //   (value) => !getFieldError(value)
    // );
    // setWasSubmitted(true);

    // defaultValue={selectedTaskData?.status}

    const { description, status, title, ...rest } = fieldValues;

    const newData = kanBanData.boards.map((board) => {
      return {
        name: board.name,
        columns: board.columns.map((column) => {}),
      };
    });

    let tempData = { ...kanBanData };
    const boardIndex = tempData.boards.findIndex(
      (board) => board.name === selectedBoardData.name
    );
    const columnIndex = tempData.boards[boardIndex].columns.findIndex(
      (column) => column.name === selectedTaskData.status
    );
    const taskIndex = tempData.boards[boardIndex].columns[
      columnIndex
    ].tasks?.findIndex((task) => task?.title === selectedTaskData?.title);

    tempData.boards[boardIndex].columns[columnIndex].tasks[taskIndex] = {
      title,
      description,
      status,
      subtasks: subTasks,
    };

    const existingTask =
      tempData.boards[boardIndex].columns[columnIndex].tasks[taskIndex];

    if (status !== existingTask.status) {
      tempData.boards[boardIndex].columns[columnIndex].tasks.splice(
        taskIndex,
        1
      );

      const newColumnIndex = tempData.boards[boardIndex].columns.findIndex(
        (column) => column.name === status
      );

      tempData.boards[boardIndex].columns[columnIndex].tasks[taskIndex] = {
        title,
        description,
        status,
        subtasks: subTasks,
      };
    }

    console.log(tempData);

    // tempData.boards[boardIndex].columns[newColumnIndex].tasks.push({
    //   ...thing[0],
    //   status,
    //   title,
    //   description,
    //   subtasks: [],
    // });

    // setKanBanData({ boards: updatedKanBanData });

    // handleCreateNewBoard({ boardName, columns: Object.values(rest) });

    // if (formIsValid) {
    //   console.log(`Fast Form Submitted`, fieldValues);
    // }
  }

  return (
    <form className="px-6 py-2" onSubmit={handleSubmit}>
      <h2>Edit Task</h2>
      <p htmlFor="task-name" className="text-xs mb-2 mt-6 text-white">
        Title
      </p>
      <Input
        name="title"
        type="text"
        required
        placeholder="e.g. Take coffee break"
        defaultValue={selectedTaskData?.title}
      />
      <p htmlFor="task-description" className="text-xs mb-2 mt-6 text-white">
        Description
      </p>
      <textarea
        defaultValue={selectedTaskData?.description}
        name="description"
        rows={4}
        placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
        className="block w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px] resize-none"
      />
      <p htmlFor="task-description" className="text-xs mb-2 mt-6 text-white">
        Subtasks
      </p>
      {subTasks.map((subtask) => {
        return (
          <div key={subtask.id} className="flex mb-3">
            <Input
              name={subtask.id}
              value={subtask.title}
              onChange={(event) => {
                setSubTasks((prev) => {
                  return prev.map((prevSubtask) => {
                    if (prevSubtask.id === subtask.id) {
                      return {
                        ...prevSubtask,
                        title: event.target.value,
                      };
                    }
                    return { ...prevSubtask };
                  });
                });
              }}
              // defaultValue={subtask.title}
              required
              type="text"
              className="mr-4"
              placeholder="e.g. Make coffee"
            />
            <button
              onClick={() =>
                setSubTasks((prev) =>
                  prev.filter((prevSubtask) => prevSubtask.id !== subtask.id)
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
        className="mt-3 w-full bg-white text-main-purple"
        onClick={() =>
          setSubTasks((prev) => [
            ...prev,
            { id: randomId(), title: "", isCompleted: false },
          ])
        }
      >
        + Add New Subtask
      </Button>

      <p className="text-xs mb-2 mt-6">Status</p>
      <select
        name="status"
        defaultValue={selectedTaskData?.status}
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
      <Button type="submit" className="mt-6 w-full">
        Update Task
      </Button>
    </form>
  );
};

export default EditTask;
