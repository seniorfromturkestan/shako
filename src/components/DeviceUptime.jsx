import React from 'react';

const DeviceUptime = ({ networkData }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-4">Device Uptime</h2>
      <div className="space-y-2">
        {Object.entries(networkData).map(([device, metrics], index) => {
          if (!metrics.Uptime) return null;
          
          return (
            <div key={index} className="flex justify-between items-center p-2 border-b">
              <div className="font-medium">{device}</div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>{metrics.Uptime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceUptime;