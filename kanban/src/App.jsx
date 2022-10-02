import AppShell from "./components/AppShell";
import Header from "./components/Header";
import ShowSidebarIcon from "./components/Icons/ShowSidebarIcon";
import Sidebar from "./components/SIdebar";
import Main from "./components/Main";
import { ModalsManager } from "./context/ModalsManager";
import { AppManager } from "./context/AppContext";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

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
  const [isDarkTheme, setDarkTheme] = useLocalStorage(
    "darkTheme",
    getInitialState()
  );

  const toggleTheme = () => {
    setDarkTheme((prevValue) => !prevValue);
  };

  const [toggleSidebar, settoggleSidebar] = useState(false);

  return (
    <div className={`${isDarkTheme && "dark"}`}>
      <AppManager
        toggleTheme={toggleTheme}
        isDarkTheme={isDarkTheme}
        toggleSidebar={toggleSidebar}
        settoggleSidebar={settoggleSidebar}
      >
        <ModalsManager>
          <AppShell header={<Header />} sidebar={<Sidebar />}>
            <Main toggleSidebar={toggleSidebar} />

            <div
              onClick={() => settoggleSidebar((prev) => !prev)}
              className="sm:flex  items-center bottom-8 pl-[18px] hover:bg-main-purple-hover rounded-r-[100px] cursor-pointer group mr-6 mt-2 w-14 h-12 bg-main-purple fixed hidden "
            >
              <ShowSidebarIcon className="fill-white" />
            </div>
          </AppShell>
        </ModalsManager>
      </AppManager>
    </div>
  );
}

export default App;
