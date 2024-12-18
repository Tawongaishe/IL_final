import React from "react";

// GenerateNewButton.jsx
const GenerateNewButton = ({ profile, onGenerateNew }) => {
    const { country, age, education, gender } = profile;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-teal-700">Your Profile</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div>
                <span className="font-semibold">Country:</span> {country || '-'}
              </div>
              <div>
                <span className="font-semibold">Age Group:</span> {age || '-'}
              </div>
              <div>
                <span className="font-semibold">Education:</span> {education || '-'}
              </div>
              <div>
                <span className="font-semibold">Gender:</span> {gender || '-'}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              onGenerateNew();
            }}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-600 transition flex items-center space-x-2"
          >
            <span>🎲</span>
            <span>Generate New Profile</span>
          </button>
        </div>
      </div>
    );
  };

export default GenerateNewButton;
