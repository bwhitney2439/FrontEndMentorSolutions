import React from "react";
import IconFilter from "../assets/mobile/icon-filter.svg";
import IconSearch from "../assets/desktop/icon-search.svg";
import styled from "styled-components";

const FilterContainer = styled.div`
  margin: 32px 24px 57px 24px;
  height: 80px;
  background: #19202d;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 24px;

  & input {
    background: transparent;
    border: none;
    outline: none;
    color: white;
    opacity: 0.5;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 48px;
  width: 48px;
  background: #5964e0;
  margin-left: 24px;
`;

const Filter = () => {
  return (
    <FilterContainer>
      <input
        style={{ opacity: "0.5" }}
        type="text"
        placeholder="Filter by title..."
      />
      <img src={IconFilter} alt="" />
      <SearchContainer>
        <img src={IconSearch} alt="" width="20px" height="20px" />
      </SearchContainer>
    </FilterContainer>
  );
};

export default Filter;
