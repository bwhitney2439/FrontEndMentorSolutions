import React from "react";
import { forwardRef } from "react";

const VerticalEllipsisIcon = forwardRef(({ className, fill }, ref) => {
  return (
    <svg
      ref={ref}
      width="5"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill={fill} fillule="evenodd">
        <circle cx="2.308" cy="2.308" r="2.308" />
        <circle cx="2.308" cy="10" r="2.308" />
        <circle cx="2.308" cy="17.692" r="2.308" />
      </g>
    </svg>
  );
});

export default VerticalEllipsisIcon;
