import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Methodology = () => {
  const [openSections, setOpenSections] = useState({
    dataSources: false,
    dataProcessing: false,
    factorWeights: false,
    calculationMethod: false,
    limitations: false,
    futurePlans: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const ExpandableSection = ({ title, children, sectionKey }) => (
    <div className="mb-6 border-b pb-4">
      <button 
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex justify-between items-center text-left font-bold text-xl text-emerald-800 hover:text-emerald-600"
      >
        {title}
        {openSections[sectionKey] ? <ChevronDown /> : <ChevronRight />}
      </button>
      {openSections[sectionKey] && (
        <div className="mt-4 text-gray-700">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-8">
          Global Income Explorer Methodology
        </h1>

        <ExpandableSection title="Data Sources" sectionKey="dataSources">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Key Data Sources</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-emerald-600">Luxembourg Income Study (LIS)</h3>
              <p>A leading global database of harmonized microdata on income and wealth. The data used is from 2018, chosen for its comprehensive country coverage.</p>
            </div>
            <div>
              <h3 className="font-bold text-emerald-600">World Inequality Database (WID)</h3>
              <p>Provides income distribution data for diverse populations, enriching our analysis of global income disparities.</p>
            </div>
            <div>
              <h3 className="font-bold text-emerald-600">Numbeo</h3>
              <p>Source for cost of living data (food and rent prices), using a combination of user-generated and manually collected information.</p>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection title="Data Processing" sectionKey="dataProcessing">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Data Cleaning and Preparation</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Used Python and pandas to clean and process LIS data</li>
            <li>Removed zeros from datasets to ensure accurate income representation</li>
            <li>Extracted median incomes for genders, age brackets, and education levels</li>
            <li>Created demographic-specific multipliers</li>
            <li>Converted all monetary values to USD using Purchasing Power Parity (PPP) rates</li>
            <li>Supplemented data cleaning with Google Sheets formulas</li>
            <li>Used Numbeo data to estimate average cost of basic needs per country</li>
          </ul>
        </ExpandableSection>

        <ExpandableSection title="Factor Weights" sectionKey="factorWeights">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Income Determinant Weights</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-emerald-600">Education (45%)</h3>
              <p>Strongest determinant of income. Research shows 8-13% returns per year of education, with bachelor's degree holders earning 50-100% more than high school graduates.</p>
            </div>
            <div>
              <h3 className="font-bold text-emerald-600">Age/Experience (35%)</h3>
              <p>Experience correlates strongly with income, with typical returns of 3-5% per year, plateauing after about 20 years.</p>
            </div>
            <div>
              <h3 className="font-bold text-emerald-600">Gender (20%)</h3>
              <p>Accounts for persistent wage disparities, with global gender pay gap averaging 20% and varying by country.</p>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection title="Calculation Method" sectionKey="calculationMethod">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Income Estimation Formula</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code className="text-lg">
              Estimated Income = Base Median Income * (<br />
              &nbsp;&nbsp;(Education Multiplier * 0.45) +<br />
              &nbsp;&nbsp;(Age Multiplier * 0.35) +<br />
              &nbsp;&nbsp;(Gender Multiplier * 0.20)<br />
              )
            </code>
          </div>
        </ExpandableSection>

        <ExpandableSection title="Limitations" sectionKey="limitations">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Research Constraints</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Data from 2018, potentially missing recent economic changes</li>
            <li>Simplified model that may not capture local economic complexities</li>
            <li>Relies on average multipliers that don't reflect individual variations</li>
            <li>Does not account for wealth or non-monetary measures of well-being</li>
          </ul>
        </ExpandableSection>

        <ExpandableSection title="Future Improvements" sectionKey="futurePlans">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Planned Enhancements</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Include industry-specific income adjustments</li>
            <li>Add regional variations within countries</li>
            <li>Account for interaction effects between factors</li>
            <li>Implement more frequent data updates</li>
            <li>Add confidence intervals for estimates</li>
          </ul>
        </ExpandableSection>

        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Back to Income Explorer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Methodology;