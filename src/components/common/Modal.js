import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GapItems from "./GapItems";

const ModalWrapper = styled.div`
  position: fixed;
  width: ${props => props.$width? props.$width : "32rem"};
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$show ? "block" : "none")};
  z-index: 2;
`;

const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.$show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export default function Modal({ showModal, setShowModal, title, children, $width }) {
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="Content">
      <ModalOverlay $show={showModal} />
      <ModalWrapper $show={showModal} $width={$width}>
        <ModalInner>
          <button style={{ marginLeft: "auto" }} onClick={toggleModal}>
            <CloseRoundedIcon />
          </button>
          <h1>{title}</h1>
          {children}
        </ModalInner>
      </ModalWrapper>
    </div>
  );
}
