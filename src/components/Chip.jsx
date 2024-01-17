import React from 'react';

const Chip = ({ item, onDelete }) => (
  <div className="flex items-center bg-blue-100 rounded-full pl-2 pr-1 py-1">
    <img src={item.avatar} alt="" className="h-6 w-6 rounded-full mr-1" />
    <span className="text-sm font-medium mr-2">{item.name}</span>
    <button
      onClick={() => onDelete(item)}
      className="text-blue-600 hover:text-blue-800 rounded-full p-1"
    >
      &times;
    </button>
  </div>
);

export default Chip;