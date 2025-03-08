import React from 'react';

const RecentAlarms = ({ alarmCount, errors }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-2">Recent Alarms</h2>
      <div className="flex justify-center items-center mb-4">
        <div className="relative w-40 h-40">
          <div className="w-full h-full rounded-full bg-[#E86660] flex items-center justify-center">
            <div className="text-4xl font-bold text-black px-10 py-8 bg-white rounded-full">{alarmCount}</div>
          </div>
          <div className="text-center mt-2 text-gray-500">Alarms</div>
        </div>
      </div>
      <div className="space-y-2 mt-4 overflow-y-auto max-h-64">
        <div className="text-sm font-medium">Device Name =</div>
        {errors.map((error, index) => (
          <div key={index} className="border-l-4 border-red-500 pl-2 py-1 text-xs">
            <div className="font-medium">{error.device}</div>
            <div className="text-gray-600">Need to {error.action.toLowerCase()}. {error.reason}</div>
            <div className="text-gray-400">{new Date().toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAlarms;