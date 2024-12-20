import React, { useState, useEffect } from "react";
import CardStepper from "./CardStepper";
import GenerateNewButton from "./GenerateNewButton";
import IncomeEstimate from "./IncomeEstimate";
import LivingCostsEstimate from "./LivingCostsEstimates";

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
        <p className="text-white text-2xl animate-pulse">Loading your destiny...</p>
      </div>
    );
  }

  if (!selectedCountry) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-100 to-teal-100">
        <div className="w-full bg-emerald-600 p-4 fixed top-0 left-0 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">The Lottery of Life</h1>
            <nav className="flex gap-6">
              <a href="calculator" className="text-white hover:text-emerald-200">Calculator</a>
              <a href="about" className="text-white hover:text-emerald-200">About Us</a>
              <a href="methodology" className="text-white hover:text-emerald-200">Methodology</a>
            </nav>
          </div>
        </div>
        
        <div className="text-center space-y-8 max-w-3xl px-4">
          <h1 className="text-5xl font-bold text-emerald-800 mb-6">The Lottery of Life</h1>
          
          <h2 className="text-2xl font-semibold text-emerald-700">
            Every birth is a roll of the dice
          </h2>
          
          <div className="space-y-4">
            <h3 className="text-xl text-emerald-600">
              Your birthplace, gender, and circumstances shape your economic destiny
            </h3>
            
            <p className="text-lg text-emerald-600 leading-relaxed">
              Click below to experience a random life path and discover how different circumstances 
              affect global income inequality.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={handleRandomSelection}
            className="bg-emerald-500 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <span>🎲</span>
            Roll the Dice of Destiny
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-teal-100 p-6 relative">
      <div className="w-full bg-emerald-600 p-4 fixed top-0 left-0 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">The Lottery of Life</h1>
          <nav className="flex gap-6">
            <a href="#calculator" className="text-white hover:text-emerald-200">Calculator</a>
            <a href="#about" className="text-white hover:text-emerald-200">About Us</a>
            <a href="#methodology" className="text-white hover:text-emerald-200">Methodology</a>
          </nav>
        </div>
      </div>
      <GenerateNewButton profile={profile} onGenerateNew={handleRandomSelection} />
    
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl mt-16">
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