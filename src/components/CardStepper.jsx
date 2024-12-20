import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import WorldIncomeChart from "./WorldIncomeChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CardStepper = ({
  baseIncome,
  genderIncome,
  ageIncome,
  educationIncome,
  country,
  gender,
  age,
  education,
  onUpdateInput,
  educationOptions,
}) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const formatIncome = (value) => {
    if (!value || value === 0) return "N/A";
    return `$${value.toLocaleString()}`;
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  const getBarChartData = (label, value) => ({
    labels: ["Country Median", label],
    datasets: [
      {
        label: "Income Comparison",
        data: [baseIncome, value],
        backgroundColor: ["#FCD34D", "#60A5FA"],
        borderRadius: 4,
        barPercentage: 0.8,
      },
    ],
  });
  
  useEffect(() => {
    setStep(0);
  }, [country]);

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-lg text-center">
        {step === 0 && (
          <div>
            <div className="bg-emerald-50 p-6 rounded-lg text-center mb-8">
              <p className="text-emerald-700 text-lg mb-3">
                In this scenario, you were born in {country}.
              </p>
              <h2 className="text-3xl font-bold text-emerald-800 mb-3">
                Born in {country},
              </h2>
              <p className="text-xl text-emerald-700">
                Your median yearly income is {formatIncome(baseIncome)}.
              </p>
            </div>
            <WorldIncomeChart countryIncome={baseIncome} />
            <p className="text-lg mt-4">Curious about what shapes your income? Click next to explore the key factors.</p>
            <button onClick={nextStep} className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors duration-200">
              Next
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="border-b-2 border-emerald-100 pb-4 mb-6 bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-emerald-700 mb-2">
                In this scenario, you were randomly assigned to be a {gender}.
              </p>
              <h2 className="text-xl font-bold text-emerald-800 mb-1">
                As a {gender},
              </h2>
              <p className="text-lg text-emerald-700">
                Your median yearly income is {formatIncome(genderIncome)} in {country}.
              </p>
            </div>
            
            <div className="mb-6">
              <Bar key={`gender-chart-${step}`} data={getBarChartData("Gender Group", genderIncome)} options = {chartOptions} />
              <p className="text-sm text-gray-600 mt-2">
                On the right (blue), view your gender-specific income. On the left (yellow), 
                the overall median income.
              </p>
            </div>

            <div>
              <p className="text-emerald-700 font-bold mb-2">Change your gender to see how it affects income and opportunities</p>
              <select
                value={gender}
                onChange={(e) => onUpdateInput("gender", e.target.value)}
                className="p-2 border rounded w-full max-w-xs mx-auto mb-4"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="flex justify-center gap-4">
                <button onClick={prevStep} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg">
                  Back
                </button>
                <button onClick={nextStep} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="border-b-2 border-emerald-100 pb-4 mb-6 bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-emerald-700 mb-2">
                In this scenario, you are between {age} years old.
              </p>
              <h2 className="text-xl font-bold text-emerald-800 mb-1">
                At {age} years old,
              </h2>
              <p className="text-lg text-emerald-700">
                Your median yearly income is {formatIncome(ageIncome)} in {country}.
              </p>
            </div>
            
            <div className="mb-6">
              <Bar key={`age-chart-${step}`} data={getBarChartData("Age Group", ageIncome)} options = {chartOptions} />
              <p className="text-sm text-gray-600 mt-2">
                On the right (blue), view your age-specific income. On the left (yellow), 
                the overall median income.
              </p>
            </div>

            <div>
            <p className="text-emerald-700 font-bold mb-2">Change your age to see how it affects income and opportunities</p>

              <select
                value={age}
                onChange={(e) => onUpdateInput("age", e.target.value)}
                className="p-2 border rounded w-full max-w-xs mx-auto mb-4"
              >
                <option value="18-25">18-25</option>
                <option value="25-35">25-35</option>
                <option value="35-45">35-45</option>
                <option value="45-55">45-55</option>
                <option value="55+">55+</option>
              </select>
              <div className="flex justify-center gap-4">
                <button onClick={prevStep} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg">
                  Back
                </button>
                <button onClick={nextStep} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="border-b-2 border-emerald-100 pb-4 mb-6 bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-emerald-700 mb-2">
                Your education level is {education}.
              </p>
              <h2 className="text-xl font-bold text-emerald-800 mb-1">
                With {education} education,
              </h2>
              <p className="text-lg text-emerald-700">
                Your median yearly income is {formatIncome(educationIncome)} in {country}.
              </p>
            </div>
            
            <div className="mb-6">
              <Bar key={`education-chart-${step}`} data={getBarChartData("Education Level", educationIncome)} options = {chartOptions} />
              <p className="text-sm text-gray-600 mt-2">
                On the right (blue), view your education-specific income. On the left (yellow), 
                the overall median income.
              </p>
            </div>

            <div>
            <p className="text-emerald-700 font-bold mb-2">Change your education to see how it affects income and opportunities</p>

              <select
                value={education}
                onChange={(e) => onUpdateInput("education", e.target.value)}
                className="p-2 border rounded w-full max-w-xs mx-auto mb-4"
              >
                {educationOptions.map((edu) => (
                  <option key={edu} value={edu}>
                    {edu}
                  </option>
                ))}
              </select>
              <div className="flex justify-center gap-4">
                <button onClick={prevStep} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg">
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardStepper;