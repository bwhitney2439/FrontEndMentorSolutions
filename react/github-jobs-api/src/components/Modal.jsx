import React, { useEffect } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { theme } from "../theme";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  mix-blend-mode: normal;
  opacity: 0.5;
  zindex: 1000;
`;

const FilterContainer = styled.div`
  position: fixed;
  top: 225px;
  left: 50%;
  transform: translateX(-50%);
  zindex: 1100;
  width: 327px;
  height: 217px;
  background: ${theme.colors.cardBackground};
  border-radius: 6px;
`;

export const Modal = ({ open, children, onClose }) => {
  useEffect(() => {
    if (open) {
      document.querySelector("html").style.overflow = "hidden";
    } else {
      document.querySelector("html").style.overflow = "unset";
    }
  }, [open]);

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <FilterContainer>{children}</FilterContainer>
    </>,
    document.getElementById("portal")
  );
};
