import React, { useState, useEffect } from "react";
import CardStepper from "./CardStepper";
import GenerateNewButton from "./GenerateNewButton";
import IncomeEstimate from "./IncomeEstimate";

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
  const [loading, setLoading] = useState(true);

  const profile = {
    country: selectedCountry,
    age: selectedAge,
    education: selectedEducation,
    gender: selectedGender
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/country_income_data.json");
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

  const handleRandomSelection = () => {
    if (!data) return;

    const countries = Object.keys(data.countries);
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    const genders = Object.keys(data.countries[randomCountry].gender);
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const educationLevels = Object.keys(data.countries[randomCountry].education);
    const randomEducation = educationLevels[Math.floor(Math.random() * educationLevels.length)];
    const ageGroups = Object.keys(data.countries[randomCountry].age);
    const randomAge = ageGroups[Math.floor(Math.random() * ageGroups.length)];

    setSelectedCountry(randomCountry);
    setSelectedGender(randomGender);
    setSelectedEducation(randomEducation);
    setSelectedAge(randomAge);
    handleCalculate(randomCountry, randomGender, randomEducation, randomAge);
  };

  const handleCalculate = (country = selectedCountry, gender = selectedGender, education = selectedEducation, age = selectedAge) => {
    if (!country || !gender || !education || !age || !data) return;

    const countryData = data.countries[country];
    setBaseIncome(countryData.baseIncome);
    setGenderIncome(countryData.gender[gender]);
    setAgeIncome(countryData.age[age]);
    setEducationIncome(countryData.education[education] || 0);
  };

  const handleUpdateInput = (field, value) => {
    switch (field) {
      case "gender": setSelectedGender(value); break;
      case "age": setSelectedAge(value); break;
      case "education": setSelectedEducation(value); break;
      default: break;
    }

    handleCalculate(
      selectedCountry,
      field === "gender" ? value : selectedGender,
      field === "education" ? value : selectedEducation,
      field === "age" ? value : selectedAge
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500">
        <p className="text-white text-2xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!selectedCountry) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-100 to-teal-100">
        <h1 className="text-4xl font-bold text-teal-700 mb-8">Global Income Explorer</h1>
        <button
          onClick={handleRandomSelection}
          className="bg-teal-500 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:bg-teal-600 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <span>🎲</span>
          Generate Random Profile
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-teal-100 p-6 relative">
      <GenerateNewButton profile={profile} onGenerateNew={handleRandomSelection} />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl mt-6">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Global Income Explorer</h1>
        <CardStepper
          baseIncome={baseIncome}
          genderIncome={genderIncome}
          ageIncome={ageIncome}
          educationIncome={educationIncome}
          country={selectedCountry}
          gender={selectedGender}
          age={selectedAge}
          education={selectedEducation}
          educationOptions={Object.keys(data.countries[selectedCountry]?.education || {})}
          onUpdateInput={handleUpdateInput}
        />
        <IncomeEstimate 
          baseIncome={baseIncome}
          educationIncome={educationIncome}
          gender={selectedGender}
          age={selectedAge}
          country={selectedCountry}
        />
      </div>
    </div>
  );
};

export default IncomeCalculator;