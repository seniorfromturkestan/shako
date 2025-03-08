import React from 'react';

const InterfaceStatus = ({ generateInterfaceStatus }) => {
  return (
    <div className="bg-white p-4 rounded shadow col-span-2">
      <h2 className="font-bold text-lg mb-4">Interface Status</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500">
              <th className="px-2 py-2">Device name</th>
              <th className="px-2 py-2">Interface name</th>
              <th className="px-2 py-2">Total Traffic</th>
              <th className="px-2 py-2">In (%)</th>
              <th className="px-2 py-2">Out (%)</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {generateInterfaceStatus().map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-2">{item.device}</td>
                <td className="px-2 py-2 text-blue-500">{item.interface}</td>
                <td className="px-2 py-2">{item.traffic}</td>
                <td className="px-2 py-2">
                  <div className="w-full h-2 bg-gray-200 rounded">
                    <div className="h-full bg-green-500 rounded" style={{ width: `${item.inPercentage}%` }}></div>
                  </div>
                </td>
                <td className="px-2 py-2">
                  <div className="w-full h-2 bg-gray-200 rounded">
                    <div className="h-full bg-red-500 rounded" style={{ width: `${item.outPercentage}%` }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterfaceStatus;