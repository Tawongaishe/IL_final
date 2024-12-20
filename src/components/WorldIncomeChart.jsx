import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts';

const WorldIncomeChart = ({ countryIncome = 21353 }) => {
  const data = [
    { percentile: 10, income: 700 },
    { percentile: 15, income: 1500 },
    { percentile: 20, income: 2000 },
    { percentile: 30, income: 3000 },
    { percentile: 40, income: 5000 },
    { percentile: 50, income: 7000 },
    { percentile: 60, income: 9000 },
    { percentile: 70, income: 15000 },
    { percentile: 80, income: 25000 },
    { percentile: 90, income: 40000 },
    { percentile: 95, income: 60000 },
    { percentile: 99, income: 120000 }
  ];

  const getPercentile = (income) => {
    for (let i = 0; i < data.length; i++) {
      if (income < data[i].income) {
        if (i === 0) return data[i].percentile;
        const prevPerc = data[i-1].percentile;
        const nextPerc = data[i].percentile;
        const prevInc = data[i-1].income;
        const nextInc = data[i].income;
        return prevPerc + (nextPerc - prevPerc) * (income - prevInc) / (nextInc - prevInc);
      }
    }
    return 99;
  };

  const percentile = getPercentile(countryIncome);

  return (
    <div className="bg-white p-4 rounded-lg mt-4">
      <h3 className="text-lg font-semibold mb-2 text-center">Global Income Distribution</h3>
      <h3 className="text-sm text-gray-600 text-center mb-4">Let’s see how your income compares to the rest of the world. </h3>
      <p className="text-center text-sm mb-4">
        Your income is in the top <span className="font-bold">{Math.round(100 - percentile)}%</span> globally
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="percentile" 
              label={{ value: 'Percentile', position: 'bottom' }}
            />
            <YAxis 
              scale="log"
              domain={[500, 150000]}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Income']}
              labelFormatter={(value) => `${value}th percentile`}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke="#2c7a7b" 
              fill="#e6fffa" 
            />
            <ReferenceLine 
              y={countryIncome} 
              stroke="#2c7a7b" 
              strokeWidth={2}
              strokeDasharray="3 3"
            >
              <label position="right" fill="#2c7a7b">Your Income</label>
            </ReferenceLine>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorldIncomeChart;