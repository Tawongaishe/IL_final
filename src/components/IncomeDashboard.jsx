import React, { useState, useEffect } from 'react';
import { Globe, User, GraduationCap, CalendarDays } from 'lucide-react';

const IncomeDashboard = () => {
  const [data, setData] = useState({
    baseData: [],
    ageData: [],
    genderData: [],
    educationData: []
  });
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vS--8l2r0QU3Z8zzI_Sw8q1RlrV5O7hBKMAaL274VELNktab96XSkxZ2iEkCSttpSnX9cG1msGMO7m-/pub?output=csv&gid=0'
        );
        const data = await response.text();
        console.log('Data:', data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Global Income Explorer</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <select 
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select country</option>
              {/* Add options when data loads */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Age Range</label>
            <select 
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedAge(e.target.value)}
            >
              <option value="">Select age</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select 
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">Select gender</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Education</label>
            <select 
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedEducation(e.target.value)}
            >
              <option value="">Select education</option>
            </select>
          </div>

          <button 
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600"
            onClick={() => console.log('Calculate')}
          >
            Calculate Income
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeDashboard;