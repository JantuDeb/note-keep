import React from "react";
import "./Button.css";
const Button = ({ loading, text, clickHandler, btnStyle ,disable=false}) => {
  return (
    <button className={`${btnStyle} ${loading? "btn-loading":""}`} onClick={clickHandler} disabled={loading}>
      <span className="btn-text">{text}</span>
    </button>
  );
};

export default Button;
