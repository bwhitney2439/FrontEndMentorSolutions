import { createGlobalStyle } from "styled-components";
import BackgroundPatternHeaderMobile from "../src/assets/mobile/bg-pattern-header.svg";
import BackgroundPatternHeaderDesktop from "../src/assets/desktop/bg-pattern-header.svg";
import BackgroundPatternHeaderTablet from "../src/assets/tablet/bg-pattern-header.svg";
import { theme } from "./theme";

const GlobalStyles = createGlobalStyle`
 
@import url("https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap");
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html:focus-within {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: "Kumbh Sans", sans-serif;
  font-size: 16px;
  background: ${theme.colors.background} url(${BackgroundPatternHeaderMobile}) no-repeat top;
  background-size: 100% 136px;
  
  
  @media (min-width: 768px) {
      background: ${theme.colors.background} url(${BackgroundPatternHeaderTablet}) no-repeat;
      background-size: 100% 160px;
    }
    @media (min-width: 1440px) {
        background: ${theme.colors.background} url(${BackgroundPatternHeaderDesktop}) no-repeat;
        background-size: 100% 162px;
    }

}

input,
button,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

h1 {
  color: white;
  font-size: 28px;
  line-height: 34px;
}
h2 {
  color: ${theme.colors.h2};
  font-size: 20px;
  line-height: 20px;
}
h3 {
  color: white;
  font-size: 20px;
  line-height: 20px;
}

p {
  color: ${theme.colors.p};
}

small {
  font-size: 14px;
  color: #5964e0;
}

img,
picture {
  max-width: 100%;
  display: block;
}


`;

export default GlobalStyles;
