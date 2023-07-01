import React from "react";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectOption = (option) => {
    onSelect(option);
    setIsOpen(false);
  };
  return (
    <>
      <div className="dropdown relative flex flex-col items-center w-full h-auto rounded-lg">
        <button
          className="bg-gray-200 p4 w-full h-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-2 border-transparent active:border-white duration-150 active:text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedOption}
          {isOpen ? (
            <MdKeyboardArrowUp fontSize={24} />
          ) : (
            <MdKeyboardArrowDown fontSize={24} />
          )}
        </button>
        {isOpen && (
          <div className="bg-gray-200 absolute top-9 flex flex-col items-start rounded-lg p-2 w-full">
            {options.map((option, index) => (
              <div
                key={index}
                className="option__list flex w-full hover:bg-gray-100 cursor-pointer rounded-lg border-l-transparent border-r-transparent border-t-transparent"
                onClick={() => handleSelectOption(option)}
              >
                <p className="uppercase">{option}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
