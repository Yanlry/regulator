import React from 'react';

const TransportVolumeChart: React.FC = () => {
  // This is a placeholder component for the chart
  // In a real application, you would integrate with a charting library like Chart.js or Recharts
  
  // Sample data for the chart
  const hourlyData = [
    { hour: '6h', count: 2 },
    { hour: '7h', count: 3 },
    { hour: '8h', count: 5 },
    { hour: '9h', count: 8 },
    { hour: '10h', count: 6 },
    { hour: '11h', count: 7 },
    { hour: '12h', count: 4 },
    { hour: '13h', count: 3 },
    { hour: '14h', count: 5 },
    { hour: '15h', count: 7 },
    { hour: '16h', count: 9 },
    { hour: '17h', count: 6 },
  ];
  
  // Find the maximum value to scale the chart
  const maxCount = Math.max(...hourlyData.map(item => item.count));
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 flex items-end">
        {hourlyData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-4/5 bg-blue-500 rounded-t-sm" 
              style={{ 
                height: `${(item.count / maxCount) * 100}%`,
                opacity: item.hour === '10h' || item.hour === '16h' ? 1 : 0.7
              }}
            ></div>
            <div className="text-xs text-gray-500 mt-2">{item.count}</div>
            <div className="text-xs font-medium mt-1">{item.hour}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium text-gray-700">Total aujourd'hui:</span>
            <span className="ml-2 text-lg font-bold">65 transports</span>
          </div>
          <div className="text-sm text-green-600 font-medium">
            +12% vs. hier
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Pic d'activité à 16h (9 transports)
        </div>
      </div>
    </div>
  );
};

export default TransportVolumeChart;