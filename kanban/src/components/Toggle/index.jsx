import React, { useState } from "react";

const Toggle = ({ className, toggle, setToggle }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id="toggle"
        type="checkbox"
        checked={toggle}
        onChange={setToggle}
        className="sr-only peer"
      />
      <label
        htmlFor="toggle"
        className="inline-block w-10 h-5 m-auto relative cursor-pointer inset-0 bg-main-purple transition-all rounded-xl before:absolute before:h-[14px] before:w-[14px] before:left-[3px] before:bottom-[3px] before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-5"
      />
    </div>
  );
};

export default Toggle;
