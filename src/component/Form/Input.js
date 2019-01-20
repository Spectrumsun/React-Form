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
  dataId,
  id,
  checked,
  errorMessage,
  onBlur,
  onKeyDown
}) => (
  <div className={divClass}>
    <label>{label}</label>
    <input
    id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      data-id={dataId}
      onBlur={onBlur}
      autoComplete={autoComplete || `off`}
      className={inputClass}
      placeholder={placeholder}
      checked={checked}
      onKeyDown={onKeyDown}
    />
    <span className="error">{inputClass && inputClass.includes('error') ? errorMessage : ''}</span>
  </div>
);

export default Input;
