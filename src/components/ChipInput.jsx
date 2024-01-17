import React, { useState } from 'react';
import UserAvatar from '../assets/user_avatar.png';
import Chip from './Chip';
import TextField from './TextField';

const ChipInput = () => {

    const [items, setItems] = useState([
        { name: 'Atishay Jain', email: 'atishayjain690@gmail.com', avatar: UserAvatar },
        { name: 'Narendra Modi', email: 'narendramodi@gmail.com', avatar: UserAvatar },
        { name: 'Nelson Mandela', email: 'nelsonmandela@gmail.com', avatar: UserAvatar },
        { name: 'Barack Obama', email: 'b.obama@gmail.com', avatar: UserAvatar },
    ]);

    const [selectedItems, setSelectedItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isInputFocused, setInputFocused] = useState(false);

    const handleSelectItem = (item) => {
        setSelectedItems([...selectedItems, item]);
        setItems(items.filter((i) => i.email !== item.email));
        setInputValue('');
    };

    const handleDeleteChip = (item) => {
        setSelectedItems(selectedItems.filter((i) => i.email !== item.email));
        setItems([...items, item]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && inputValue === '' && selectedItems.length > 0 && isInputFocused) {
            handleDeleteChip(selectedItems[selectedItems.length - 1]);
        }
    };

    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));




    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2 items-center mb-2 bg-white border rounded">
                {selectedItems.map((item) => (
                    <Chip key={item.email} item={item} onDelete={handleDeleteChip} />
                ))}
                <TextField
                    placeholder="Add new user..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />
            </div>
            {inputValue && (
                <ul className="origin-top-left absolute mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    {filteredItems.map((item) => (
                        <li
                            key={item.email}
                            className="text-gray-700 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelectItem(item)}
                        >
                            <div className="flex items-center p-2">
                                <img src={item.avatar} alt="" className="h-6 w-6 rounded-full mr-2" />
                                <span className="font-medium">{item.name}</span>&nbsp;
                                <span className="text-gray-500">{item.email}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChipInput;