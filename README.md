

# The Lottery of Life: Global Income Inequality Explorer

## Live Website: https://inequalitycalculator.vercel.app/authors 
<img width="944" alt="Screenshot 2024-12-20 at 15 10 18" src="https://github.com/user-attachments/assets/a11c3094-df3b-4a6c-9249-39a3b2a8dbc4" />

## Project Overview

The Lottery of Life is an interactive web application that explores global income inequality by allowing users to experience how factors like country, gender, age, and education impact economic opportunities.

## Team

- **Tawongaishe Nhawu**: Technical Lead & Full-Stack Developer
- **Emma Stoks**: Product, User Experience & Research Director
- **Maria Julia**: Data Strategy & Income Analytics Specialist

## Technologies Used

- React
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React

## Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Tawongaishe/IL_final.git
cd IL_final
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── IncomeCalculator.jsx
│   ├── Authors.jsx
│   ├── Methodology.jsx
│   └── ...
├── App.jsx
└── main.jsx
```

## Key Features

- Interactive income calculation based on demographic factors
- Visualization of income disparities
- Detailed methodology page
- Responsive design

## Data Sources

- Luxembourg Income Study (LIS)
- World Inequality Database (WID)
- Numbeo Cost of Living Data

## Methodology

The application uses a weighted calculation model:
- Education: 45%
- Age/Experience: 35%
- Gender: 20%

## Limitations

- Data from 2018
- Simplified economic model
- Averages and multipliers may not reflect individual circumstances

## Future Improvements

- Industry-specific income adjustments
- Regional variation enhancements
- More frequent data updates
- Confidence interval calculations

## Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check [issues page](https://github.com/Tawongaishe/IL_final/issues).

## License

[Minerva University]

## Contact

- Tawongaishe Nhawu - [LinkedIn](https://www.linkedin.com/in/tawongaishe/)
- Project Link: [https://github.com/Tawongaishe/IL_final](https://github.com/Tawongaishe/IL_final)
```

Would you like me to make any modifications to either the Methodology component or the README?



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
