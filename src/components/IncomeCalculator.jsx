import React, { useState, useEffect } from "react";
import CardStepper from "./CardStepper";
import GenerateNewButton from "./GenerateNewButton";

const IncomeCalculator = () => {
  const [data, setData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [baseIncome, setBaseIncome] = useState(0);
  const [genderIncome, setGenderIncome] = useState(0);
  const [ageIncome, setAgeIncome] = useState(0);
  const [educationIncome, setEducationIncome] = useState(0);
  const [finalIncome, setFinalIncome] = useState(0);

  const [loading, setLoading] = useState(true);

  // Fetch the JSON data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/income_data.json");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Random Generator
  const handleRandomSelection = () => {
    if (!data) return;

    const countries = Object.keys(data.countries);
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

    const genders = Object.keys(data.countries[randomCountry].multipliers.gender);
    const randomGender = genders[Math.floor(Math.random() * genders.length)];

    const educationLevels = Object.keys(data.countries[randomCountry].multipliers.education);
    const randomEducation = educationLevels[Math.floor(Math.random() * educationLevels.length)];

    const ageGroups = Object.keys(data.countries[randomCountry].multipliers.age);
    const randomAge = ageGroups[Math.floor(Math.random() * ageGroups.length)];

    // Set state for the random values
    setSelectedCountry(randomCountry);
    setSelectedGender(randomGender);
    setSelectedEducation(randomEducation);
    setSelectedAge(randomAge);

    // Trigger calculation
    handleCalculate(randomCountry, randomGender, randomEducation, randomAge);
  };

  // Calculate Income and Contributions
  const handleCalculate = (country = selectedCountry, gender = selectedGender, education = selectedEducation, age = selectedAge) => {
    if (!country || !gender || !education || !age || !data) return;

    const countryData = data.countries[country];
    const base = countryData.baseIncome;
    const genderMult = countryData.multipliers.gender[gender];
    const ageMult = countryData.multipliers.age[age];
    const eduMult = countryData.multipliers.education[education];

    const genderIncome = base * genderMult;
    const ageIncome = base * ageMult;
    const educationIncome = base * eduMult;

    const final = base * genderMult * ageMult * eduMult;

    // Update state
    setBaseIncome(base);
    setGenderIncome(genderIncome);
    setAgeIncome(ageIncome);
    setEducationIncome(educationIncome);
    setFinalIncome(final);
  };

  // Update input state and recalculate dynamically
  const handleUpdateInput = (field, value) => {
    switch (field) {
      case "gender":
        setSelectedGender(value);
        break;
      case "age":
        setSelectedAge(value);
        break;
      case "education":
        setSelectedEducation(value);
        break;
      default:
        break;
    }

    // Trigger recalculation
    handleCalculate(
      selectedCountry,
      field === "gender" ? value : selectedGender,
      field === "education" ? value : selectedEducation,
      field === "age" ? value : selectedAge
    );
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500">
        <p className="text-white text-2xl animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-teal-100 p-6 relative">
      {/* Generate New Button */}
      <GenerateNewButton selectedCountry={selectedCountry} onGenerateNew={handleRandomSelection} />

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl mt-6">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Global Income Explorer</h1>

        {/* Card Stepper */}
        <CardStepper
          baseIncome={baseIncome}
          genderIncome={genderIncome}
          ageIncome={ageIncome}
          educationIncome={educationIncome}
          finalIncome={finalIncome}
          country={selectedCountry}
          gender={selectedGender}
          age={selectedAge}
          education={selectedEducation}
          educationOptions={Object.keys(data.countries[selectedCountry]?.multipliers.education || {})}
          onUpdateInput={handleUpdateInput}
        />
      </div>
    </div>
  );
};

export default IncomeCalculator;
