import React, { useState } from "react";
import Modal from "../Modal";
import CrossIcon from "../../assets/icon-cross.svg";
import Button from "../Button";
const CreateNewBoardModal = ({ onClose }) => {
  const [columns, setColumns] = useState([
    {
      name: "Todo",
      tasks: [],
    },
    {
      name: "Doing",
      tasks: [],
    },
  ]);
  return (
    <Modal show={true} onClose={onClose} className="mx-4 pb-6 pt-6 px-6">
      <div>
        <h2>Add New Board</h2>
        <p htmlFor="board-name" className="text-xs mb-2 mt-6 text-white">
          Board Name
        </p>
        <input
          id="board-name"
          className="block w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px]"
          type="text"
          placeholder="e.g. Web Design"
        />

        <p htmlFor="board-name" className="text-xs mb-2 mt-6 text-white">
          Board Columns
        </p>
        {columns.map((columns) => {
          return (
            <div className="flex mb-3">
              <input
                id="board-name"
                className="block w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px] mr-4"
                type="text"
                placeholder="e.g. Web Design"
              />
              <button>
                <img src={CrossIcon} alt="cross-icon" srcset="" />
              </button>
            </div>
          );
        })}
        <Button className="w-full mb-6 bg-white text-main-purple hover:bg-white">
          + Add New Column
        </Button>
        <Button className="w-full ">Create New Board</Button>
      </div>
    </Modal>
  );
};

export default CreateNewBoardModal;
