import React, { useEffect } from "react";
import styled from "styled-components";

const ToggleButton = styled.input`
  position: relative;
  width: 48px;
  height: 24px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  background: white;
  border-radius: 20px;

  &:before {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 20px;
    top: 5px;
    left: 5px;
    background: #5964e0;
    transition: 0.5s;
  }

  &:checked:before {
    left: 30px;
  }
`;

const Toggle = (props) => {
  const [theme, setTheme] = React.useState("light");
  const nextTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <ToggleButton
      checked={theme === "dark"}
      onChange={() => setTheme(nextTheme)}
      {...props}
      type="checkbox"
      id="checkbox"
    />
  );
};

export default Toggle;
