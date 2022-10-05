import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`block w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px] ${className}`}
      {...props}
    />
  );
};

export default Input;
