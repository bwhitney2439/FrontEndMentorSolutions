import React from "react";
import CreateNewBoardModal from "./CreateNewBoardModal";

const Modals = ({ activeModal, setActiveModal }) => {
  switch (activeModal) {
    case "createNewBoard":
      return <CreateNewBoardModal onClose={() => setActiveModal("")} />;

    default:
      return null;
  }
};

export default Modals;
