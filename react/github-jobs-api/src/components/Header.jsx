import React from "react";
import styled from "styled-components";
import { ReactComponent as IconMoon } from "../assets/desktop/icon-moon.svg";
import { ReactComponent as IconSun } from "../assets/desktop/icon-sun.svg";
import Toggle from "../components/Toggle";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 327px;
  margin: 32px auto 0 auto;

  @media (min-width: 768px) {
    width: 689px;
    margin: 42px auto 0 auto;
  }
  @media (min-width: 1440px) {
    width: 1110px;
    margin: 45px auto 0 auto;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 112px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>devJobs</h1>
      <ToggleContainer>
        <IconSun />
        <Toggle />
        <IconMoon />
      </ToggleContainer>
    </HeaderContainer>
  );
};

export default Header;
