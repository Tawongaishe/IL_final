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

  // Function to get conditional paragraph based on percentage used
  const getSpendingInsight = (percentageUsed) => {
    const parsedPercentage = parseFloat(percentageUsed);
    
    if (parsedPercentage > 100) {
      return " It seems like urban life in your country may be unaffordable. You might need to cut food costs (perhaps sacrificing balance) or move to a more remote area with cheaper rent. And that's without including healthcare or leisure—both essential! Can you imagine what life would be like?";
    }
    
    if (parsedPercentage > 50) {
      return " Over half your income is spent on necessities, excluding healthcare, insurance, and other essential expenses. With so much directed toward survival, you might struggle to save or enjoy life. What would happen if you lost your job?";
    }
    
    if (parsedPercentage >= 30 && parsedPercentage <= 50) {
      return " Your income leaves some room to live in an urban center and eat well. But how much do other essentials like healthcare, insurance, and transport cost in your country? After all expenses, would you still be able to save?";
    }
    
    if (parsedPercentage < 30) {
      return " After covering rent and food, you still have plenty left for essentials and luxuries. You're among the fortunate few who can live comfortably, with extra money for savings or indulgences. What would you do with this freedom?";
    }
    
    return ""; // Fallback for unexpected scenarios
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mt-6 p-6">
      {/* Updated Header Section */}
      <div className="mb-6">
        <h2 className="text-emerald-700 font-bold flex items-center gap-2 mb-2">
          <Users className="h-6 w-6" />
          Living Costs Estimate
        </h2>
        <div className="bg-emerald-50 p-4 rounded-lg">
            <p className="text-emerald-700 text-lg leading-relaxed">
            Just like the lottery of life determined where you were born, 
            it also decided your household size — the number of people you live with and are financially responsible for.
            </p>
        </div>
        
  <h2 className="text-2xl font-bold text-emerald-800 mb-4">
    You live in a:
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
        <div className="border-t border-gray-200 my-8"></div>
      </div>

      <div className="space-y-6">
        
        {/* Monthly Costs Section */}
        <div className="border-b pb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Monthly Breakdown
          </h3>
          <div className="space-y-4">
            <p className = "text-gray-600">A balanced 2,400 calorie per day diet including bread, milk, meat, fruits, vegetables,
                 and other essentials — for your family costs an average of ${monthlyFoodCost.toFixed(2)} in your country.</p>
            <p className = "text-gray-600">Rent in an urban center averages around ${monthlyRentCost.toFixed(2)}. 
                Based on your income, could you afford a stunning city apartment with skyline views, 
                or would you need to downsize—or even move out of the city?</p>
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

            <div className={`flex items-center justify-between p-3 rounded-lg 
              ${yearlyRemaining < 0 ? 'bg-red-100 border border-red-300' : 
                yearlyRemaining / yearlyIncome < 0.3 ? 'bg-yellow-100 border border-yellow-300' : 
                yearlyRemaining / yearlyIncome >= 0.5 ? 'bg-green-100 border border-green-300' : 
                'bg-gray-50'}`}>
              <span>Yearly Remaining for Other Expenses</span>
              <span className={`font-semibold ${
                yearlyRemaining < 0 ? 'text-red-700' : 
                yearlyRemaining / yearlyIncome < 0.3 ? 'text-yellow-700' : 
                yearlyRemaining / yearlyIncome >= 0.5 ? 'text-green-700' : 
                'text-gray-700'}`}>
                ${yearlyRemaining.toFixed(2)}
              </span>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-lg 
              ${parseInt(percentageUsed) > 100 ? 'bg-red-100 border border-red-300' : 
                parseInt(percentageUsed) > 50 ? 'bg-yellow-100 border border-yellow-300' : 
                'bg-gray-50'}`}>
              <span>Percentage of Income Used for Essentials</span>
              <span className={`font-semibold ${
                parseInt(percentageUsed) > 100 ? 'text-red-700' : 
                parseInt(percentageUsed) > 50 ? 'text-yellow-700' : 
                'text-amber-500'}`}>
                {percentageUsed}%
              </span>
            </div>

            {/* New Spending Insight Section */}
            <div className={`mt-4 p-4 rounded-lg border 
              ${parseInt(percentageUsed) > 100 ? 'bg-red-50 border-red-200 text-red-700' : 
                parseInt(percentageUsed) > 50 ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 
                'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Your Financial Insight
              </h3>
              <p>
                You used {percentageUsed}% of your income for these two essentials: food and shelter. 
                {getSpendingInsight(percentageUsed)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingCostsEstimate;