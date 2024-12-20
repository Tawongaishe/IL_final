import React from 'react';
import LivingCostsEstimate from './LivingCostsEstimates';

const IncomeEstimate = ({ baseIncome, educationIncome, gender, age, country }) => {
  const willShowNA = !educationIncome || educationIncome === 0;

  const calculateIncome = () => {
    if (willShowNA) return { value: "N/A", hasData: false };
    const genderFactor = gender === 'male' ? 1.15 : 0.85;
    const ageFactor = age === '18-25' ? 0.8 :
                     age === '25-35' ? 1.1 :
                     age === '35-45' ? 1.2 :
                     age === '45-55' ? 1.15 : 0.9;
    
    const monthlyIncome = educationIncome * genderFactor * ageFactor;
    return {
      value: monthlyIncome,
      formatted: `$${monthlyIncome.toLocaleString()}`,
      hasData: true
    };
  };

  const income = calculateIncome();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="p-8 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-teal-700 mb-4">Income Estimate for Your Current Profile</h2>
        <div className="bg-white p-6 rounded-lg">
          {income.hasData ? (
            <>
              <p className="text-lg mb-4">
              Income isn’t shaped by a single factor—it’s the result of how gender, age, and education level combined.
              Education has the most significant impact on income. Based on your education level in {country}, taking into account 
              that you {age} years old and {gender}, your estimated yearly income is:
                {/* {gender && ` (${gender === 'male' ? '+15% for male' : '-15% for female'})`}
                {age && `, and age group ${age} (${
                  age === '18-25' ? '-20%' :
                  age === '25-35' ? '+10%' :
                  age === '35-45' ? '+20%' :
                  age === '45-55' ? '+15%' : '-10%'
                })`}: */}
              </p>
              <p className="text-4xl font-bold text-teal-600">{income.formatted}</p>
              <p className="text-sm text-gray-600">
                Note: these are demonstrative estimates and may not reflect actual income levels in {country}.
              </p>
              {/* /* add in component that says something about scrolling to living costs */}
              <div className="mt-6 flex items-center justify-center text-emerald-600 gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 animate-bounce" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                  <p className="text-base md:text-lg font-medium">
                    Scroll down to explore living costs in {country}
                  </p>
                </div>
            </>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">
                Insufficient data available for this combination. Some income data might be missing or unavailable for certain education levels in {country}.
              </p>
            </div>
          )}
          {willShowNA && (
            <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
              <p className="text-sm text-gray-600">
                Note: Some combinations of education, age, and gender may show as N/A due to insufficient or unavailable data for certain demographic groups in {country}.
              </p>
            </div>
          )}
        </div>
      </div>

      {income.hasData && (
        <LivingCostsEstimate 
          country={country}
          totalIncome={income.value}
        />
      )}
    </div>
  );
};

export default IncomeEstimate;