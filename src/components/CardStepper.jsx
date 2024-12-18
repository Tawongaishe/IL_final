import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CardStepper = ({
  baseIncome,
  genderIncome,
  ageIncome,
  educationIncome,
  finalIncome,
  country,
  gender,
  age,
  education,
  onUpdateInput,
  educationOptions,
}) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const getBarChartData = (label, value) => ({
    labels: ["Country Median", label],
    datasets: [
      {
        label: "Income Comparison",
        data: [baseIncome, value],
        backgroundColor: ["#FFCE56", "#36A2EB"],
      },
    ],
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
      {step === 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">You were born in {country}</h2>
          <p>The typical yearly income in this country is <strong>${baseIncome.toLocaleString()}</strong>.</p>
          <button onClick={nextStep} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">As a {gender},</h2>
          <p>The typical yearly income for this group is <strong>${genderIncome.toLocaleString()}</strong>.</p>
          <Bar key={`gender-chart-${step}`} data={getBarChartData("Gender Group", genderIncome)} />
          <div className="mt-4">
            <p className="text-lg font-bold mb-4">Tweak a Little:</p>
            <select
              value={gender}
              onChange={(e) => onUpdateInput("gender", e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mt-4">
            <button onClick={prevStep} className="bg-gray-300 text-black px-4 py-2 rounded mr-4">
              Back
            </button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">At {age} years old,</h2>
          <p>The typical yearly income for this age group is <strong>${ageIncome.toLocaleString()}</strong>.</p>
          <Bar key={`age-chart-${step}`} data={getBarChartData("Age Group", ageIncome)} />
          <div className="mt-4">
            <p className="text-lg font-bold mb-4">Tweak a Little:</p>
            <select
              value={age}
              onChange={(e) => onUpdateInput("age", e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="18-25">18-25</option>
              <option value="25-35">25-35</option>
              <option value="35-45">35-45</option>
              <option value="45-55">45-55</option>
              <option value="55+">55+</option>
            </select>
          </div>
          <div className="mt-4">
            <button onClick={prevStep} className="bg-gray-300 text-black px-4 py-2 rounded mr-4">
              Back
            </button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">With {education} education,</h2>
          <p>The typical yearly income for this group is <strong>${educationIncome.toLocaleString()}</strong>.</p>
          <Bar key={`education-chart-${step}`} data={getBarChartData("Education Level", educationIncome)} />
          <div className="mt-4">
            <p className="text-lg font-bold mb-4">Tweak a Little:</p>
            <select
              value={education}
              onChange={(e) => onUpdateInput("education", e.target.value)}
              className="p-2 border rounded w-full"
            >
              {educationOptions.map((edu) => (
                <option key={edu} value={edu}>
                  {edu}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <button onClick={prevStep} className="bg-gray-300 text-black px-4 py-2 rounded mr-4">
              Back
            </button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Estimated Yearly Income</h2>
          <p>Your estimated yearly income is <strong>${finalIncome.toLocaleString()}</strong>.</p>
          <div className="mt-4">
            <button onClick={prevStep} className="bg-gray-300 text-black px-4 py-2 rounded mr-4">
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardStepper;
