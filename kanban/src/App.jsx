import { useState } from "react";
import AppShell from "./components/AppShell";
import Header from "./components/Header";
import ShowSidebarIcon from "./components/Icons/ShowSidebarIcon";
import Modal from "./components/Modal";
import Sidebar from "./components/SIdebar";
import useLocalStorage from "./hooks/useLocalStorage";
import data from "./data.json";
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

function App() {
  const [show, setShow] = useState(false);
  const [isDarkTheme, setDarkTheme] = useLocalStorage(
    "darkTheme",
    getInitialState()
  );
  const [toggleSidebar, settoggleSidebar] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  const toggleTheme = () => {
    setDarkTheme((prevValue) => !prevValue);
  };

  return (
    <div className={`${isDarkTheme && "dark"}`}>
      <AppShell
        header={
          <Header
            setShow={setShow}
            toggleSidebar={toggleSidebar}
            isDarkTheme={isDarkTheme}
          />
        }
        sidebar={
          <Sidebar
            data={data}
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
            toggleSidebar={toggleSidebar}
            settoggleSidebar={settoggleSidebar}
          />
        }
      >
        <div
          className={`dark:bg-very-dark-grey bg-light-grey flex-1 ${
            toggleSidebar ? "sm:ml-0" : "sm:ml-[300px]"
          } mt-[64px] sm:mt-[81px] lg:mt-[97px] transition-all`}
        >
          <main className="h-full">
            <div className="flex pt-6 overflow-x-scroll h-full">
              {data.boards[0].columns.map((column) => {
                return (
                  <div>
                    <h4 className="text-medium-grey" key={column.name}>
                      {column.name} ({column.tasks.length})
                    </h4>
                    {column.tasks.map((task) => {
                      return (
                        <div className="dark:bg-gray-dark px-4 py-6 rounded-lg my-[10px] mx-3 min-w-[280px] shadow-gray-dark">
                          <h3>{task.title}</h3>
                          <p>0 of {task.subtasks.length} subtasks</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Empty Board Component */}
            {/* <div className="h-full flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center px-8">
                <h2 className="text-medium-grey text-center ">
                  This board is empty. Create a new column to get started.
                </h2>
                <button className="text-white w-[174px] h-[48px] bg-main-purple hover:bg-main-purple-hover rounded-3xl mt-6">
                  + Add New Column
                </button>
              </div>
            </div> */}
          </main>
        </div>

        <div
          onClick={() => settoggleSidebar((prev) => !prev)}
          className="sm:flex items-center bottom-8 pl-[18px] hover:bg-main-purple-hover rounded-r-[100px] cursor-pointer group mr-6 mt-2 w-14 h-12 bg-main-purple absolute hidden "
        >
          <ShowSidebarIcon className="fill-white" />
        </div>

        <Modal
          show={show}
          onClose={() => setShow(false)}
          toggle={isDarkTheme}
          setToggle={toggleTheme}
        />
      </AppShell>
    </div>
  );
}

export default App;
