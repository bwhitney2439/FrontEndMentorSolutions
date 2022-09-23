function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex w-full fixed">
        <div className="w-[300px] h-[97px] bg-gray-dark border-b-[1px] border-b-lines-dark"></div>
        <div className="flex-1 h-[97px] bg-gray-dark border-b-lines-dark border-b-[1px] flex items-center px-6">
          <h1 className="text-white">Platform Launch</h1>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed z-20 h-full top-0 flex flex-col w-[300px]">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-dark pt-0 border-r-[1px] border-r-lines-dark">
          <img src="" alt="" />
        </div>
      </aside>

      <div className="bg-very-dark-grey flex-1 ml-[300px] mt-[97px]"></div>
    </div>
  );
}

export default App;
