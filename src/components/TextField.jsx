import React, { forwardRef } from 'react';

const TextField = forwardRef(({ value, onChange, placeholder, ...props }, ref) => (
  <input
    ref={ref}
    className="flex-1 outline-none placeholder-gray-400"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    {...props}
  />
));

export default TextField;