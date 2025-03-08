import React from 'react';

const MemoryUtilization = ({ networkData, getMemoryGB }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-4">Devices by Memory Utilization</h2>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm font-medium mb-2">
          <div>Device Name</div>
          <div>Memory</div>
        </div>
        {Object.entries(networkData).map(([device, metrics], index) => {
          if (!metrics.Memory) return null;
          const memoryGB = getMemoryGB(metrics.Memory);
          const memoryPercentage = Math.min(100, memoryGB * 8); 
          
          return (
            <div key={index} className="grid grid-cols-2 items-center">
              <div className="text-sm">{device}</div>
              <div className="flex items-center">
                <span className="text-xs mr-1">{memoryPercentage}%</span>
                <div className="flex-grow h-2 bg-black rounded">
                  <div className="h-full bg-blue-500 rounded" style={{ width: `${memoryPercentage}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center text-xs mt-4">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-blue-500 mr-1"></div>
          <span className='font-bold'>Used</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-black mr-1"></div>
          <span className='font-bold'>Free</span>
        </div>
      </div>
    </div>
  );
};

export default MemoryUtilization;