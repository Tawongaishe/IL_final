import React from "react";

const GenerateNewButton = ({ selectedCountry, onGenerateNew }) => {
  return (
    <div className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-teal-700">
        Born in: <span className="text-teal-500">{selectedCountry || "Select a Country"}</span>
      </h1>
      <button
        onClick={onGenerateNew}
        className="bg-yellow-400 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition"
      >
        🎲 Generate New
      </button>
    </div>
  );
};

export default GenerateNewButton;
