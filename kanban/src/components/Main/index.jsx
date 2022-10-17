import React from "react";
import Column from "../Column";
import Task from "../Task";
import { useAppManager } from "../../context/AppContext";
import { useModalsManager } from "../../context/ModalsManager";

const Main = ({ toggleSidebar }) => {
  const { kanBanData, selectedBoard, setSelectedTask } = useAppManager();
  const { setActiveModal } = useModalsManager();

  const handleTaskOnClick = (task) => {
    setSelectedTask(task);
    setActiveModal("editTaskContent");
  };

  return (
    <div
      className={`dark:bg-very-dark-grey bg-light-grey flex-1 ${
        toggleSidebar ? "sm:ml-0" : "sm:ml-[300px]"
      } mt-[64px] sm:mt-[81px] lg:mt-[97px] transition-all`}
    >
      <main className="h-full">
        {kanBanData.boards.length > 0 ? (
          <div className="flex pt-6 pl-3 overflow-x-scroll h-full">
            {selectedBoard.columns.map((column) => {
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
                  {/* <div className="dark:bg-gray-dark px-4 py-6 rounded-lg my-6  min-w-[280px] max-w-[280px] shadow-[0_4px_6px_0px_rgba(54, 78, 126, 0.101545)] cursor-pointer group">
                      <h2 className="dark:text-medium-grey text-medium-grey text-center group-hover:text-main-purple">
                        + New Task
                      </h2>
                    </div> */}
                </Column>
              );
            })}
            <div className="bg-gradient-to-tr from-[#E9EFFA] to-[rgba(233, 239, 250, 0.5)] dark:bg-gradient-to-tr dark:from-[#282c34] dark:to-[#282838] min-w-[280px] max-w-[280px] rounded-md flex items-center justify-center mt-[40px] mb-[24px] mr-36 ml-3 group cursor-pointer">
              <h1 className="text-medium-grey dark:text-medium-grey group-hover:text-main-purple">
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
    </div>
  );
};

export default Main;
