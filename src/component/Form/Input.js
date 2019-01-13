import React from "react";
import './Form.css';

const Input = ({
  type,
  value,
  onChange,
  name,
  label,
  placeholder,
  inputClass,
  autoComplete,
  divClass,
  dataid,
  id,
  checked,
  errorMessage,
  onBlur
}) => (
  <div className={divClass}>
    <label>{label}</label>
    <input
    id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      data-id={dataid}
      onBlur={onBlur}
      autoComplete={autoComplete || `off`}
      className={inputClass}
      placeholder={placeholder}
      checked={checked}
    />
    <span className="error">{inputClass && inputClass.includes('error') ? errorMessage : ''}</span>
  </div>
);

export default Input;
