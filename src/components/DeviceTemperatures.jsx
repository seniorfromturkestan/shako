import React from 'react';

const DeviceTemperatures = ({ networkData, getTemperatureC, getTemperatureColor }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-4">Device Temperatures</h2>
      <div className="grid grid-cols-3 gap-2 text-sm font-medium mb-2">
        <div>Device Name</div>
        <div>Temperature</div>
        <div>Status</div>
      </div>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {Object.entries(networkData).map(([device, metrics], index) => {
          if (!metrics.Temperature) return null;
          const temp = getTemperatureC(metrics.Temperature);
          
          return (
            <div key={index} className="grid grid-cols-3 gap-2 text-sm items-center">
              <div>{device}</div>
              <div>{metrics.Temperature}</div>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-200 rounded mr-2">
                  <div 
                    className={`h-full rounded ${getTemperatureColor(temp)}`} 
                    style={{ width: `${Math.min(100, temp)}%` }}
                  ></div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getTemperatureColor(temp)} text-white`}>
                  {temp < 40 ? 'Normal' : temp < 70 ? 'Warning' : 'Critical'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceTemperatures;