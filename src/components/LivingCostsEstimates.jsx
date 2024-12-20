import React, { useState, useEffect } from 'react';
import { Home, Users, Utensils, Wallet, Calendar } from 'lucide-react';

const LivingCostsEstimate = ({ country, totalIncome }) => {
  const [hasFamily, setHasFamily] = useState(false);
  const [consumptionData, setConsumptionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rollFamily = Math.random() < 0.4;
    setHasFamily(rollFamily);

    const fetchData = async () => {
      try {
        const response = await fetch('/Consumption_Data.json');
        const data = await response.json();
        setConsumptionData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading consumption data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [country]);

  if (loading || !consumptionData || !consumptionData[country]) {
    return <div className="animate-pulse">Loading cost estimates...</div>;
  }

  const countryData = consumptionData[country];
  const monthlyFoodCost = countryData.minimum_food_cost * (hasFamily ? 4 : 1);
  const monthlyRentCost = hasFamily ? 
    countryData.rent_3bd_city_centre : 
    countryData.rent_1bd_city_centre;

  const monthlyTotalCosts = monthlyFoodCost + monthlyRentCost;
  const yearlyTotalCosts = monthlyTotalCosts * 12;
  const yearlyIncome = totalIncome;
  const yearlyRemaining = yearlyIncome - yearlyTotalCosts;
  const percentageUsed = ((yearlyTotalCosts / yearlyIncome) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-lg mt-6 p-6">
      {/* Updated Header Section */}
      <div className="mb-6">
        <h2 className="text-emerald-700 font-bold flex items-center gap-2 mb-2">
          <Users className="h-6 w-6" />
          Living Costs Estimate
        </h2>
        <div className={`flex items-center gap-2 p-3 rounded-lg ${hasFamily ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
          <Users className={`h-5 w-5 ${hasFamily ? 'text-blue-500' : 'text-gray-500'}`} />
          <div>
            <span className="font-medium">
              {hasFamily ? 'Family Household (4 people)' : 'Single Person Household'}
            </span>
            <p className="text-sm text-gray-600 mt-1">
              {hasFamily 
                ? 'Calculations include food for 4 people and a 3-bedroom apartment'
                : 'Calculations include food for 1 person and a 1-bedroom apartment'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-gray-500">
          These estimates are based on living in urban city center and consuming 2500 calories per day per person
        </p>
        
        {/* Monthly Costs Section */}
        <div className="border-b pb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Monthly Breakdown
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-500" />
                <span>Food Costs</span>
              </div>
              <span className="font-semibold">${monthlyFoodCost.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-500" />
                <span>Rent</span>
              </div>
              <span className="font-semibold">${monthlyRentCost.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg font-semibold">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-500" />
                <span>Total Monthly Costs</span>
              </div>
              <span>${monthlyTotalCosts.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Yearly Overview Section */}
        <div className="pt-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" />
            Yearly Financial Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Yearly Income</span>
              <span className="font-semibold">${yearlyIncome.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Yearly Essential Expenses</span>
              <span className="font-semibold">${yearlyTotalCosts.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Yearly Remaining for Other Expenses</span>
              <span className={`font-semibold ${yearlyRemaining < 0 ? 'text-red-500' : 'text-green-500'}`}>
                ${yearlyRemaining.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Percentage of Income Used for Essentials</span>
              <span className={`font-semibold ${parseInt(percentageUsed) > 100 ? 'text-red-500' : 'text-amber-500'}`}>
                {percentageUsed}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingCostsEstimate;