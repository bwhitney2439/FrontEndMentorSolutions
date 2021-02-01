import React, { useState } from "react";
import IconFilter from "../assets/mobile/icon-filter.svg";
import IconSearch from "../assets/desktop/icon-search.svg";
import IconLocation from "../assets/desktop/icon-location.svg";
import styled from "styled-components";
import { Modal } from "./Modal";
import { useMedia } from "../hooks/useMedia";

const FilterContainer = styled.form`
  margin: 32px 24px 57px 24px;
  height: 80px;
  background: #19202d;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 24px;

  & input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    opacity: 0.5;
  }
`;

const SearchContainer = styled.button`
  display: flex;
  border: none;
  outline: none;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  min-height: 48px;
  min-width: 48px;
  background: #5964e0;
  margin-left: 24px;
`;

const LocationInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  input {
    margin-left: 16px;
    background: transparent;
    outline: none;
    border: none;
    color: #ffffff;
    mix-blend-mode: normal;
    opacity: 0.5;
    &::placeholder {
      color: #ffffff;
      mix-blend-mode: normal;
      opacity: 0.5;
    }
  }
`;

const Divider = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: #6e8098;
  mix-blend-mode: normal;
  opacity: 0.2;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;

  p {
    margin-left: 16px;
    color: #ffffff;
    font-weight: bold;
  }
`;

const Checkbox = styled.input`
  position: relative;

  width: 24px;
  height: 24px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  background: #ffffff;
  border: none;
  border-radius: 3px;
  opacity: 0.1;

  &:before {
    display: none;
    content: "";
    position: absolute;
    left: 9px;
    top: 4px;
    width: 7px;
    height: 14px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  &:hover {
    opacity: 0.25;
  }

  &:checked:before {
    display: block;
  }

  &:checked {
    opacity: 1;
    background: #5964e0;
  }
`;

const Button = styled.button`
  width: 279px;
  height: 48px;
  display: block;
  background: #5964e0;
  border-radius: 5px;
  outline: none;
  border: none;
  margin-left: auto;
  margin-right: auto;
  color: white;
  font-weight: bold;

  &:hover {
    background: #939bf4;
  }
`;

const Filter = ({ handleDescriptionSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { useModal } = useMedia(
    // Media queries
    ["(min-width: 1440px)", "(min-width: 768px)", "(min-width: 375px)"],
    // Column counts (relates to above media queries by array index)
    [{ useModal: false }, { useModal: false }, { useModal: true }],
    // Default object
    { useModal: true }
  );

  return (
    <>
      <FilterContainer
        onSubmit={(event) => {
          event.preventDefault();
          console.log(event.target[0].value);
          handleDescriptionSearch(event.target[0].value);
        }}
      >
        <input
          style={{ opacity: "0.5" }}
          type="text"
          placeholder="Enter job description..."
        />
        <img
          onClick={useModal ? () => setIsOpen(true) : null}
          src={IconFilter}
          alt=""
        />
        <SearchContainer type="submit">
          <img src={IconSearch} alt="" width="20px" height="20px" />
        </SearchContainer>
      </FilterContainer>
      <Modal open={useModal ? isOpen : false} onClose={() => setIsOpen(false)}>
        <LocationInputContainer>
          <img src={IconLocation} alt="" srcset="" />
          <input placeholder="Filter by location..." type="text" />
        </LocationInputContainer>
        <Divider className="divider" />
        <CheckboxContainer>
          <Checkbox type="checkbox" id="checkbox" />
          <p>Full Time Only</p>
        </CheckboxContainer>
        <Button>Search</Button>
      </Modal>
    </>
  );
};

export default Filter;
