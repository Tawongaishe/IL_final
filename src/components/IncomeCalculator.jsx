import { useState, useEffect } from 'react';

const IncomeCalculator = () => {
  const [data, setData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [estimatedIncome, setEstimatedIncome] = useState(null);

  useEffect(() => {
    // Load the JSON data
    const loadData = async () => {
      try {
        // Assuming the JSON file is in the public folder
        const response = await fetch('/income_data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const calculateIncome = () => {
    if (!selectedCountry || !selectedGender || !selectedEducation || !selectedAge || !data) return null;

    const countryData = data.countries[selectedCountry];
    const weights = data.weights;

    const baseIncome = countryData.baseIncome;
    const genderMultiplier = countryData.multipliers.gender[selectedGender];
    const educationMultiplier = countryData.multipliers.education[selectedEducation];
    const ageMultiplier = countryData.multipliers.age[selectedAge];


    return baseIncome * genderMultiplier * educationMultiplier * ageMultiplier;
  };

  const handleCalculate = () => {
    const result = calculateIncome();
    setEstimatedIncome(result);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Income Estimator</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select 
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a country</option>
            {Object.keys(data.countries).map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select 
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Education Level</label>
          <select 
            value={selectedEducation}
            onChange={(e) => setSelectedEducation(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select education level</option>
            {selectedCountry && Object.keys(data.countries[selectedCountry].multipliers.education).map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Age Group</label>
          <select 
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select age group</option>
            {Object.keys(data.countries[selectedCountry]?.multipliers.age || {}).map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
          disabled={!selectedCountry || !selectedGender || !selectedEducation || !selectedAge}
        >
          Calculate Estimated Income
        </button>

        {estimatedIncome !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h2 className="text-lg font-medium mb-2">Estimated Annual Income:</h2>
            <p className="text-3xl font-bold text-blue-600">
              ${estimatedIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeCalculator;