import React from "react";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

const ModalContext = React.createContext();

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalDismissForm({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);

  return React.cloneElement(child, {
    onSubmit: callAll(() => setIsOpen(false), child.props.onSubmit),
  });
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);

  return isOpen ? (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity flex justify-center items-start z-50 `}
      aria-labelledby="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`w-full m-14 dark:bg-gray-dark bg-white mt-20 rounded-lg py-4 ${props.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  ) : null;
}

function ModalContents({ children, ...props }) {
  return <ModalContentsBase {...props}>{children}</ModalContentsBase>;
}

export {
  Modal,
  ModalDismissButton,
  ModalOpenButton,
  ModalContents,
  ModalDismissForm,
};
