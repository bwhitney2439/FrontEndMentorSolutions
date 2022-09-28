import { useState } from "react";
import AppShell from "./components/AppShell";
import Header from "./components/Header";
import ShowSidebarIcon from "./components/Icons/ShowSidebarIcon";
import Sidebar from "./components/SIdebar";
import useLocalStorage from "./hooks/useLocalStorage";
import data from "./data.json";
import MobileSidebar from "./components/MobileSidebar";
import Main from "./components/Main";
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
  const [selectedBoard, setSelectedBoard] = useState(kanBanData.boards[0]);

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
        <Main
          kanBanData={kanBanData}
          setKanBanData={setKanBanData}
          selectedBoard={selectedBoard}
          toggleSidebar={toggleSidebar}
        />

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
      </AppShell>
    </div>
  );
}

export default App;
