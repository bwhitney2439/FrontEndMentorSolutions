import React from "react";

const Task = ({ task, ...rest }) => {
  return (
    <div
      className="bg-white dark:bg-gray-dark px-4 py-6 rounded-lg my-6  min-w-[280px] max-w-[280px] shadow-[0_4px_6px_0px_rgba(54, 78, 126, 0.101545)] cursor-pointer group"
      style={{
        boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
      }}
      {...rest}
    >
      <h3 className="mb-2 group-hover:text-main-purple">{task.title}</h3>
      <p className="text-xs dark:text-medium-grey">
        {
          task?.subtasks.filter((subtask) => subtask.isCompleted === true)
            .length
        }{" "}
        of {task.subtasks.length} subtasks
      </p>
    </div>
  );
};

export default Task;
