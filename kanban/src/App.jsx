import AppShell from "./components/AppShell";
import Header from "./components/Header";
import Sidebar from "./components/SIdebar";

function App() {
  return (
    <AppShell header={Header} sidebar={Sidebar}>
      <div className="bg-very-dark-grey flex-1 sm:ml-[300px] mt-[97px]">
        <main className="h-full">
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
        </main>
      </div>
    </AppShell>
  );
}

export default App;
