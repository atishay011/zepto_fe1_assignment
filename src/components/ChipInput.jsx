import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Chip from './Chip';
import TextField from './TextField';
import USERS_LIST from '../constants/mock_data'

const ChipInput = () => {

    const [items, setItems] = useState(USERS_LIST);

    const [selectedItems, setSelectedItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(inputValue); 


    const debounceTimerRef = useRef(null);

    // Effect to handle the input for debouncing
    useEffect(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            setDebouncedSearchTerm(inputValue);
        }, 500);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [inputValue]);

    const inputRef = useRef(null);

    const handleDeleteChip = useCallback((item) => {
        setSelectedItems((currentSelectedItems) => currentSelectedItems.filter((i) => i.email !== item.email));
        setItems((currentItems) => [...currentItems, item]);
        inputRef.current?.focus();
    }, []);

    const handleSelectItem = useCallback((item) => {
        setSelectedItems((currentSelectedItems) => [...currentSelectedItems, item]);
        setItems((currentItems) => currentItems.filter((i) => i.email !== item.email));
        setInputValue('');
    }, []);

    
    const filteredItems = useMemo(() => {
        return items.filter((item) => item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }, [items, debouncedSearchTerm]);


    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2 items-center mb-2 bg-white border rounded">
                {selectedItems.map((item) => (
                    <Chip key={item.email} item={item} onDelete={handleDeleteChip} />
                ))}
                <TextField
                    ref={inputRef}
                    placeholder="Add new user..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
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