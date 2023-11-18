import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GapItems from "./GapItems";

const ModalWrapper = styled.div`
  position: fixed;
  width: 32rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 2;
`;

const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;
export default function Modal({ showModal, setShowModal, title, children }) {
  const [price, setPrice] = useState("");

  const handleInputChange = (event) => {
    // Remove commas and set the price state
    setPrice(event.target.value.replace(/,/g, ""));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="Content">
      <ModalOverlay show={showModal} />
      <ModalWrapper show={showModal}>
        <button>
          <CloseRoundedIcon onClick={toggleModal} />
        </button>
        <h1>{title}</h1>
        {children}
      </ModalWrapper>
    </div>
  );
}
