import React from "react";

const Input = ({
  inputChangeHandler,
  name,
  value,
  placeholder,
  type = "text",
  disable = false,
}) => {
  return (
    <div className="input-group my-2">
      <label htmlFor={name} className="label">
        {placeholder}
      </label>
      <input
        type={type}
        id={name}
        className="input p-2 "
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={inputChangeHandler}
        disabled={disable}
        autoFocus
      />
    </div>
  );
};

export default Input;
