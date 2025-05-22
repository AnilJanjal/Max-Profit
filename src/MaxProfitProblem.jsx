import React, { useState } from 'react';

const MaxProfitProblem = () => {
  const [timeUnits, setTimeUnits] = useState('');
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateMaxProfit = (timeUnits) => {
    const properties = [
      { type: 'T', time: 5, earnings: 1500 },
      { type: 'P', time: 4, earnings: 1000 },
      { type: 'C', time: 10, earnings: 3000 }
    ];

    let maxEarnings = 0;
    let bestSolutions = [];

    const explore = (remainingTime, sequence, currentEarnings) => {
      if (remainingTime < 0) return;

      // Calculate earnings for current sequence
      let totalEarnings = 0;
      let timeUsed = 0;
      for (const item of sequence) {
        timeUsed += item.time;
        totalEarnings += item.earnings * (timeUnits - timeUsed);
      }

      if (totalEarnings > maxEarnings) {
        maxEarnings = totalEarnings;
        bestSolutions = [countProperties(sequence)];
      } else if (totalEarnings === maxEarnings) {
        const newSolution = countProperties(sequence);
        if (!bestSolutions.some(sol => 
            sol.T === newSolution.T && sol.P === newSolution.P && sol.C === newSolution.C)) {
          bestSolutions.push(newSolution);
        }
      }

      // Explore further options
      for (const prop of properties) {
        if (prop.time <= remainingTime) {
          explore(remainingTime - prop.time, [...sequence, prop], currentEarnings);
        }
      }
    };

    const countProperties = (sequence) => {
      const counts = { T: 0, P: 0, C: 0 };
      for (const item of sequence) {
        counts[item.type]++;
      }
      return counts;
    };

    explore(timeUnits, [], 0);

    return {
      timeUnit: timeUnits,
      earnings: maxEarnings,
      solutions: bestSolutions
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timeUnits && !isNaN(timeUnits)) {
      setIsCalculating(true);
      setTimeout(() => {
        const calculatedResult = calculateMaxProfit(Number(timeUnits));
        setResult(calculatedResult);
        setIsCalculating(false);
      }, 300);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Mars Land Development Profit Calculator
          </h1>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <label htmlFor="timeUnits" className="text-lg font-medium text-gray-700">
                Enter Time Units:
              </label>
              <input
                type="number"
                id="timeUnits"
                value={timeUnits}
                onChange={(e) => setTimeUnits(e.target.value)}
                min="1"
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Calculate'}
              </button>
            </div>
          </form>

          {result && (
            <div className="border border-gray-200 rounded-lg p-6 mb-8 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Results for {result.timeUnit} Time Units
              </h2>
              <p className="text-lg mb-4">
                <span className="font-bold">Maximum Earnings:</span> 
                <span className="text-green-600 ml-2">${result.earnings.toLocaleString()}</span>
              </p>
              
              <h3 className="text-xl font-medium text-gray-700 mb-3">Optimal Solutions:</h3>
              <div className="space-y-4">
                {result.solutions.map((solution, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-2">Solution {index + 1}:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-blue-50 p-2 rounded">
                        <span className="font-medium">Theatres (T):</span> 
                        <span className="ml-1 font-bold">{solution.T}</span>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <span className="font-medium">Pubs (P):</span> 
                        <span className="ml-1 font-bold">{solution.P}</span>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <span className="font-medium">Commercial Parks (C):</span> 
                        <span className="ml-1 font-bold">{solution.C}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MaxProfitProblem;