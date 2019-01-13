import React from 'react';


const TextField = ({
   value, onChange, name, label, placeholder,divClass,
   inputclass
}) => (
  <div className={divClass}>
    <label htmlFor="2">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      name={name}
      className={inputclass}
      placeholder={placeholder}
    />
  </div>
);

export default TextField;

