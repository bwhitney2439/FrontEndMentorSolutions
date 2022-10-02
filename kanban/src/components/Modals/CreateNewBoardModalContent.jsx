import React, { useState } from "react";
import CrossIcon from "../../assets/icon-cross.svg";
import Button from "../Button";
import { ModalDismissForm } from "../Modal";

const createID = () => {
  return Date.now();
};
const CreateNewBoardModalContent = ({ handleCreateNewBoard }) => {
  const [columns, setColumns] = useState(() => [createID()]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    // const formIsValid = Object.values(fieldValues).every(
    //   (value) => !getFieldError(value)
    // );
    // setWasSubmitted(true);

    // defaultValue={selectedTaskData?.status}
    console.log(fieldValues);

    const { boardName, ...rest } = fieldValues;

    handleCreateNewBoard({ boardName, columns: Object.values(rest) });

    // if (formIsValid) {
    //   console.log(`Fast Form Submitted`, fieldValues);
    // }
  }

  return (
    <form className="px-6 py-2" onSubmit={handleSubmit}>
      <h2>Add New Board</h2>
      <p htmlFor="board-name" className="text-xs mb-2 mt-6 text-white">
        Board Name
      </p>
      <input
        required
        name="boardName"
        id="board-name"
        className="block w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px]"
        type="text"
        placeholder="e.g. Web Design"
      />

      <p htmlFor="board-name" className="text-xs mb-2 mt-6 text-white">
        Board Columns
      </p>
      {columns.map((column) => {
        return (
          <div className="flex mb-3" key={column}>
            <input
              name={column}
              required
              className="block w-full bg-transparent text-white focus:border-main-purple focus:border focus:ring-0 rounded text-[13px] mr-4"
              type="text"
              placeholder="e.g. Web Design"
            />
            <button
              type="button"
              onClick={() =>
                setColumns((prev) => {
                  const thing = prev.filter(
                    (prevColumn) => prevColumn !== column
                  );

                  return thing;
                })
              }
            >
              <img src={CrossIcon} alt="cross-icon" srcSet="" />
            </button>
          </div>
        );
      })}

      <Button
        type="button"
        onClick={() => setColumns((prev) => [...prev, Date.now()])}
        className="w-full mb-6 bg-white text-main-purple hover:bg-white"
      >
        + Add New Column
      </Button>
      <Button type="submit" className="w-full">
        Create New Board
      </Button>
    </form>
  );
};

export default CreateNewBoardModalContent;
