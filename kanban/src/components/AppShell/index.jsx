import React from "react";

const AppShell = ({ children, header, sidebar, className, ...rest }) => {
  return (
    <div
      className={`h-screen flex flex-col dark:bg-very-dark-grey ${className}`}
    >
      {/* Header */}
      {header}

      {/* Sidebar */}
      {sidebar}

      {/* Main Content */}
      {children}
    </div>
  );
};

export default AppShell;
