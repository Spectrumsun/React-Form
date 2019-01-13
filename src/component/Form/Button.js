import React from "react";

const Button = ({ buttonClass, name, type, disabled, onClick }) => (
  <button
    className={buttonClass}
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {name}
  </button>
);

export default Button;
