import React from 'react';

const NetworkPerformance = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg bg-gray-100 p-4">Network Performance</h2>
      <div className="mb-5">
        <p className="text-sm my-3 font-bold">Network Traffic & Bandwidth</p>
        <div className="flex text-xs justify-between">
          <span>&lt;Now</span>
          <span className="text-blue-500">Last 12 hours</span>
          <span>12 hours ago&gt;</span>
        </div>
      </div>
      <div>
        <div className="h-60 w-full flex-row">
          <div className="w-full h-full">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <path d="M0,50 Q20,40 40,55 Q60,70 80,35 Q100,20 120,30" stroke="green" fill="none" strokeWidth="2" />
            </svg>
          </div>
          <div className="w-full h-full">
            <svg viewBox="0 0 100 100" className="h-full w-full -mt-48">
              <path d="M0,60 Q20,70 40,50 Q60,65 80,45 Q100,70 120,50" stroke="red" fill="none" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex justify-around">
            <div className="p-1 font-bold text-xs flex items-center">
              <div className="w-3 h-3 bg-green-500 mr-1"></div>
              <span>Ping latency</span>
            </div>
            <div className="p-1 font-bold text-xs flex items-center">
              <div className="w-3 h-3 bg-red-500 mr-1"></div>
              <span>Packet loss</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPerformance;