import React from "react";
import "./Modal.css";
const Modal = ({ show, children }) => {
  return show && <div className="modal">{children}</div>;
};

export default Modal;
