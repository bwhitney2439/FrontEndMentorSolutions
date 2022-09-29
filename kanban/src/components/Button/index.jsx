import React from "react";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={`h-10 leading-[23px] font-bold text-[13px] text-white flex items-center justify-center bg-main-purple hover:bg-main-purple-hover rounded-3xl ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
