import React, { useState } from "react";
// import IconSearch from "../assets/desktop/icon-search.svg";
// import IconLocation from "../assets/desktop/icon-location.svg";
import { ReactComponent as IconFilter } from "../assets/desktop/icon-filter.svg";
import { ReactComponent as IconSearch } from "../assets/desktop/icon-search.svg";
import { ReactComponent as IconLocation } from "../assets/desktop/icon-location.svg";
import styled from "styled-components";
import { Modal } from "./Modal";
import { useMedia } from "../hooks/useMedia";
import { theme } from "../theme";

const FilterForm = styled.form`
  position: relative;
  margin: 32px auto 57px auto;
  height: 80px;
  width: 327px;
  background: ${theme.colors.cardBackground};
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 24px;
  input[type="text"] {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: ${theme.colors.input};
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    padding: 0;
    width: 689px;
    margin: 46px auto 70px auto;
  }
  @media (min-width: 1440px) {
    padding: 0;
    width: 1110px;
    margin: 44px auto 105px auto;
  }
`;

const SearchButton = styled.button`
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

  &:hover {
    background: #939bf4;
  }

  svg {
    fill: white;
  }
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
    color: ${theme.colors.input};
    mix-blend-mode: normal;
    // opacity: 0.5;
    &::placeholder {
      color: ${theme.colors.input};
      mix-blend-mode: normal;
      opacity: 0.5;
    }
  }

  svg {
    width: 17px;
    height: 24px;
    fill: #5964e0;
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
  flex: 1;
  align-items: center;
  padding: 24px;
  p {
    margin-left: 16px;
    color: ${theme.colors.p};
    font-weight: bold;
  }

  @media (min-width: 768px) {
    padding: 0 16px 0 20px;
  }
  @media (min-width: 1440px) {
    padding: 0 16px 0 20px;
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
  background: ${theme.colors.checkboxBackground};
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

  @media (min-width: 768px) {
    width: 80px;
    display: block;
    margin-left: auto;
    margin-right: 0;
  }
  @media (min-width: 1440px) {
    width: 123px;
    display: block;
    margin-left: auto;
    margin-right: 0;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 100%;
  background: #6e8098;
  opacity: 0.2;
`;

const TitleSearchInput = styled.div`
  display: flex;
  padding: 24px;
  width: ${({ width }) => width};
  svg {
    margin-right: 16px;
    fill: #5964e0;
  }

  @media (min-width: 768px) {
    width: 222px;
  }
  @media (min-width: 1440px) {
    width: 463px;
  }
`;
const LocationSearchInput = styled.div`
  display: flex;
  padding: 24px;
  width: ${({ width }) => width};
  svg {
    width: 17px;
    height: 24px;
    margin-right: 16px;
    fill: #5964e0;
  }

  @media (min-width: 768px) {
    width: 213px;
  }
  @media (min-width: 1440px) {
    width: 300px;
  }
`;

const Filter = ({ setFilter, setFilterOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullTime, setIsFullTime] = useState(false);
  const { type } = useMedia(
    // Media queries
    ["(min-width: 1440px)", "(min-width: 768px)", "(min-width: 375px)"],
    // (relates to above media queries by array index)
    [
      {
        type: "desktop",
      },
      {
        type: "tablet",
      },

      { type: "mobile" },
    ],
    // Default object
    { type: "mobile" }
  );

  return (
    <>
      <FilterForm
        onSubmit={(event) => {
          event.preventDefault();

          setFilterOptions((prev) => ({
            ...prev,
            description: event.target[0].value,
            location: event.target[1].value,
            fullTime: event.target[1].value,
          }));
        }}
      >
        {type !== "mobile" ? (
          <>
            <TitleSearchInput>
              <IconSearch />
              <input type="text" placeholder="Filter by title..." />
            </TitleSearchInput>
            <VerticalDivider />
            <LocationSearchInput>
              <IconLocation />
              <input type="text" placeholder="Filter by location" />
            </LocationSearchInput>
            <VerticalDivider />
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="checkbox"
                checked={isFullTime}
                onChange={() => setIsFullTime((prev) => !prev)}
              />{" "}
              <p>{type === "tablet" ? "Full Time" : "Full Time Only"}</p>
              <Button type="submit">Search</Button>
            </CheckboxContainer>
          </>
        ) : (
          <>
            <input type="text" placeholder="Enter job description..." />
            <IconFilter
              style={{ fill: theme.colors.icon }}
              onClick={() => setIsOpen(true)}
            />
            <SearchButton type="submit">
              <IconSearch />
            </SearchButton>{" "}
          </>
        )}
      </FilterForm>
      <Modal
        open={type === "mobile" ? isOpen : false}
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setFilterOptions((prev) => ({
              ...prev,
              location: event.target[0].value,
              fullTime: event.target[1].checked,
            }));
            setIsOpen(false);
          }}
        >
          <LocationInputContainer>
            <IconLocation />
            <input placeholder="Filter by location..." type="text" />
          </LocationInputContainer>
          <Divider className="divider" />
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              id="checkbox"
              checked={isFullTime}
              onChange={() => setIsFullTime((prev) => !prev)}
            />{" "}
            <p>Full Time Only</p>
          </CheckboxContainer>
          <Button type="submit">Search</Button>
        </form>
      </Modal>
    </>
  );
};

export default Filter;
