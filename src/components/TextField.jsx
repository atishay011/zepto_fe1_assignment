import React from 'react';

const TextField = ({ value, onChange, onKeyDown, placeholder }) => (
  <input
    className="flex-1 outline-none placeholder-gray-400"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  />
);

export default TextField;