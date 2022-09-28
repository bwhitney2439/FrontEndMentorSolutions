import { useState } from "react";
import AppShell from "./components/AppShell";
import Header from "./components/Header";
import ShowSidebarIcon from "./components/Icons/ShowSidebarIcon";
import Modal from "./components/Modal";
import Sidebar from "./components/SIdebar";
import useLocalStorage from "./hooks/useLocalStorage";
import data from "./data.json";
import MobileSidebar from "./components/MobileSidebar";
import chevronDown from "./assets/icon-chevron-down.svg";
const getInitialState = () => {
  if (
    localStorage.darkTheme === "dark" ||
    (!("darkTheme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return true;
  } else {
    return false;
  }
};

const getInitialStateData = () => {
  if ("data" in localStorage) {
    return JSON.parse(localStorage.data);
  }
  return data;
};

function App() {
  const [show, setShow] = useState(false);
  const [isDarkTheme, setDarkTheme] = useLocalStorage(
    "darkTheme",
    getInitialState()
  );
  const [kanBanData, setKanBanData] = useLocalStorage(
    "data",
    getInitialStateData()
  );

  const [toggleSidebar, settoggleSidebar] = useState(false);
  const [toggleTaskModal, setToggleTaskModal] = useState(false);

  const [selectedBoard, setSelectedBoard] = useState(kanBanData.boards[0]);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleTheme = () => {
    setDarkTheme((prevValue) => !prevValue);
  };

  const handleTaskOnClick = (task) => {
    setSelectedTask(task);
    setToggleTaskModal(true);
  };

  const handleSubTaskOnChange = (subtask) => {
    const updatedKanBanData = kanBanData.boards.map((board) => {
      const newColums = board.columns.map((column) => {
        const newTasks = column.tasks.map((task) => {
          const newElements = task.subtasks.map((element) => {
            if (element.title === subtask.title) {
              return {
                ...element,
                isCompleted: !subtask.isCompleted,
              };
            }
            return {
              ...element,
            };
          });

          return { ...task, subtasks: newElements };
        });

        return { ...column, tasks: newTasks };
      });

      return { ...board, columns: newColums };
    });

    setKanBanData({ boards: updatedKanBanData });
  };

  const handleTaskStatusOnChange = (event) => {
    const updatedKanBanData = kanBanData.boards.map((board) => {
      const newColums = board.columns.map((column) => {
        const newTasks = column.tasks.map((task) => {
          if (task.title === selectedTask.title) {
            return { ...task, status: event.target.value };
          }
          return { ...task };
        });

        return { ...column, tasks: newTasks };
      });

      return { ...board, columns: newColums };
    });

    setKanBanData({ boards: updatedKanBanData });
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
    <div className={`${isDarkTheme && "dark"}`}>
      <AppShell
        header={
          <Header
            setShow={setShow}
            toggleSidebar={toggleSidebar}
            isDarkTheme={isDarkTheme}
            selectedBoard={selectedBoard}
          />
        }
        sidebar={
          <Sidebar
            data={kanBanData}
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
            toggleSidebar={toggleSidebar}
            settoggleSidebar={settoggleSidebar}
            setSelectedBoard={setSelectedBoard}
            selectedBoard={selectedBoard}
          />
        }
      >
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
                    <div className="mx-3 min-w-[280px]" key={column.name}>
                      <div className="flex items-center">
                        <div className="w-[15px] h-[15px] mr-3 rounded-full bg-main-purple" />
                        <h4 className="text-medium-grey tracking-[2.5px] uppercase">
                          {column.name} ({column.tasks.length})
                        </h4>
                      </div>
                      {column.tasks.map((task) => {
                        return (
                          <div
                            onClick={() => handleTaskOnClick(task)}
                            className="bg-white dark:bg-gray-dark px-4 py-6 rounded-lg my-6  min-w-[280px] max-w-[280px] shadow-[0_4px_6px_0px_rgba(54, 78, 126, 0.101545)]"
                            style={{
                              boxShadow:
                                "0px 4px 6px rgba(54, 78, 126, 0.101545)",
                            }}
                            key={task.title}
                          >
                            <h3 className="mb-2">{task.title}</h3>
                            <p className="text-xs dark:text-medium-grey">
                              {
                                task?.subtasks.filter(
                                  (subtask) => subtask.isCompleted === true
                                ).length
                              }{" "}
                              of {task.subtasks.length} subtasks
                            </p>
                          </div>
                        );
                      })}
                      <div className="dark:bg-gray-dark px-4 py-6 rounded-lg my-6  min-w-[280px] max-w-[280px] shadow-[0_4px_6px_0px_rgba(54, 78, 126, 0.101545)] cursor-pointer">
                        <h2 className="dark:text-medium-grey text-medium-grey text-center">
                          + New Task
                        </h2>
                      </div>
                    </div>
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
        </div>

        <div
          onClick={() => settoggleSidebar((prev) => !prev)}
          className="sm:flex  items-center bottom-8 pl-[18px] hover:bg-main-purple-hover rounded-r-[100px] cursor-pointer group mr-6 mt-2 w-14 h-12 bg-main-purple fixed hidden "
        >
          <ShowSidebarIcon className="fill-white" />
        </div>

        <MobileSidebar
          data={kanBanData}
          toggleTheme={toggleTheme}
          onClose={() => setShow(false)}
          show={show}
          isDarkTheme={isDarkTheme}
        />

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
                  <option
                    className="text-black"
                    key={index}
                    value={column.name}
                  >
                    {column.name}
                  </option>
                );
              })}
            </select>
          </div>
        </Modal>
      </AppShell>
    </div>
  );
}

export default App;
