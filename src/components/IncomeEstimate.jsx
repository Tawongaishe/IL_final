const IncomeEstimate = ({ baseIncome, educationIncome, gender, age, country }) => {
    const calculateIncome = () => {
      if (!educationIncome) return 0;
      const genderFactor = gender === 'male' ? 1.15 : 0.85;
      const ageFactor = age === '18-25' ? 0.8 :
                       age === '25-35' ? 1.1 :
                       age === '35-45' ? 1.2 :
                       age === '45-55' ? 1.15 : 0.9;
      return educationIncome * genderFactor * ageFactor;
    };
  
    const formatIncome = (value) => {
      if (!value || value === 0) return "N/A";
      return `$${value.toLocaleString()}`;
    };
  
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-teal-700 mb-4">Income Estimate</h2>
        <div className="bg-white p-6 rounded-lg">
          <p className="text-lg mb-4">
            Based on your profile in {country}, taking into account your education level
            {gender && ` (${gender === 'male' ? '+15% for male' : '-15% for female'})`}
            {age && `, and age group ${age} (${
              age === '18-25' ? '-20%' :
              age === '25-35' ? '+10%' :
              age === '35-45' ? '+20%' :
              age === '45-55' ? '+15%' : '-10%'
            })`}:
          </p>
          <p className="text-4xl font-bold text-teal-600">
            {formatIncome(calculateIncome())}
          </p>
          <p className="text-sm text-gray-500 mt-2">*This is an estimated calculation based on available data and adjustments</p>
        </div>
      </div>
    );
  };
  
  export default IncomeEstimate;