import React from 'react';

const CpuUtilization = ({ networkData, getCpuPercentage }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-4">Devices by CPU Utilization</h2>
      <div className="grid grid-cols-2 gap-2 text-sm font-medium mb-2">
        <div>Device Name</div>
        <div>CPU Usage</div>
      </div>
      <div className="space-y-6">
        {Object.entries(networkData).map(([device, metrics], index) => {
          if (!metrics.CPU) return null;
          const cpuUsage = getCpuPercentage(metrics.CPU);
          
          return (
            <div key={index} className="grid grid-cols-2 gap-2 items-center">
              <div className="text-sm">{device}</div>
              <div className="relative">
                <div className="w-24 h-24 mx-auto">
                  <svg viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={cpuUsage < 50 ? "green" : cpuUsage < 80 ? "orange" : "red"}
                      strokeWidth="10"
                      strokeDasharray={`${cpuUsage * 2.83} 283`}
                      transform="rotate(-90 50 50)"
                    />
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="16"
                      fontWeight="bold"
                    >
                      {cpuUsage}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CpuUtilization;