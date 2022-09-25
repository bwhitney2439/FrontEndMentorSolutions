import React, { useState } from "react";

const Toggle = ({ className }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <input
      type="checkbox"
      style={{ WebkitAppearance: "none" }}
      className="relative w-20 h-10 appearance-none bg-main-purple outline-none rounded-[20px] shadow-inner[0px_0px_5px_rgba(0,0,0,0.2)] transition-[0.5s] before:absolute before:w-10 before:h-10 before:rounded-[20px] before:top-0 before:left-0 before:bg-white toggle checked:bg-main-purple indeterminate:bg-main-purple checked:before:left-10"
    />

    // <label
    //   htmlFor="purple-toggle"
    //   className={`inline-flex relative items-centercursor-pointer ${className}`}
    // >
    //   <input
    //     type="checkbox"
    //     value=""
    //     id="purple-toggle"
    //     className="sr-only peer"
    //     checked={toggle}
    //     onChange={() => setToggle((prev) => !prev)}
    //   />
    //   <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-main-purple"></div>
    // </label>
  );
};

export default Toggle;
