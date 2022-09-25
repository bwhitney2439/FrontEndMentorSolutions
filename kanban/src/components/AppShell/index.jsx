import React from "react";

const AppShell = ({ children, header, sidebar, ...rest }) => {
  return (
    <div className="h-screen flex flex-col bg-very-dark-grey">
      {/* Header */}
      {header()}

      {/* Sidebar */}
      {sidebar()}

      {/* Main Content */}
      {children}
    </div>
  );
};

export default AppShell;
