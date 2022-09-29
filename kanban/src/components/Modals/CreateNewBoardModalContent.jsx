import React, { useState } from "react";
import CrossIcon from "../../assets/icon-cross.svg";
import Button from "../Button";
const CreateNewBoardModalContent = ({ data, handleCreateNewBoard }) => {
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

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    // const formIsValid = Object.values(fieldValues).every(
    //   (value) => !getFieldError(value)
    // );
    // setWasSubmitted(true);

    console.log(fieldValues);
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
      {columns.map((columns, index) => {
        return (
          <div className="flex mb-3">
            <input
              required
              key={index}
              name={index}
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
      <Button type="submit" className="w-full ">
        Create New Board
      </Button>
    </form>
  );
};

export default CreateNewBoardModalContent;
