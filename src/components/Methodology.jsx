import React from 'react';
import { Link } from 'react-router-dom';

const Methodology = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Methodology</h1>
        <p className="text-lg mb-6">
          This tool utilizes data from the Luxembourg Income Study (LIS). The methodology involves:
        </p>
        <ul className="list-disc list-inside mb-6 text-lg">
          <li>Calculating median incomes for different age groups using LIS microdata.</li>
          <li>Applying demographic-specific multipliers (gender, education, and age).</li>
          <li>Converting all monetary values to USD using Purchasing Power Parity (PPP) rates.</li>
        </ul>
        <p className="text-lg">
          This approach allows us to estimate typical incomes across diverse populations and
          highlight disparities effectively.
        </p>
        <div className="text-center mt-6">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Back to Income Explorer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
