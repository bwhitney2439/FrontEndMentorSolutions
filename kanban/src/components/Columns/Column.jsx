import React from "react";

const Column = ({ column }) => {
  return (
    <div className="mx-3 min-w-[280px]">
      <div className="flex items-center">
        <div className="w-[15px] h-[15px] mr-3 rounded-full bg-main-purple" />
        <h4 className="text-medium-grey tracking-[2.5px] uppercase">
          {column.name} ({column.tasks.length})
        </h4>
      </div>
    </div>
  );
};

export default Column;
