import React from "react";

const Tasks = (column) => {
  return  column.tasks.map((task) => {
    return (
      <div
        onClick={() => handleTaskOnClick(task)}
        className="bg-white dark:bg-gray-dark px-4 py-6 rounded-lg my-6  min-w-[280px] max-w-[280px] shadow-[0_4px_6px_0px_rgba(54, 78, 126, 0.101545)]"
        style={{
          boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
        }}
        key={task.title}
      >
        <h3 className="mb-2">{task.title}</h3>
        <p className="text-xs dark:text-medium-grey">
          {
            task?.subtasks.filter((subtask) => subtask.isCompleted === true)
              .length
          }{" "}
          of {task.subtasks.length} subtasks
        </p>
      </div>
    );
  })
  <div className="dark:bg-gray-dark px-4 py-6 rounded-lg my-6  min-w-[280px] max-w-[280px] shadow-[0_4px_6px_0px_rgba(54, 78, 126, 0.101545)] cursor-pointer">
    <h2 className="dark:text-medium-grey text-medium-grey text-center">
      + New Task
    </h2>
  </div>
  )
};

export default Tasks;
