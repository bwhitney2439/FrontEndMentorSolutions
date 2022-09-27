import React from "react";

const Modal = (props) => {
  const { children, className } = props;
  if (!props.show) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity flex justify-center items-start ${className}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={props.onClose}
    >
      <div
        className="w-full m-14 dark:bg-gray-dark bg-white mt-20 rounded-lg py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
