import React from 'react';

const ErrorsTable = ({ errors, getActionColor }) => {
  return (
    <div className="bg-white p-4 rounded shadow col-span-2">
      <div className="flex justify-between mb-2">
        <h2 className="font-bold text-lg">Errors</h2>
        <button className="text-sm text-gray-500 flex items-center">
          Generate report
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500">
              <th className="px-2 py-2">Device name</th>
              <th className="px-2 py-2">Reason</th>
              <th className="px-2 py-2">Severity</th>
              <th className="px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {errors.map((error, index) => (
              <tr key={index}>
                <td className="px-2 py-2">{error.device}</td>
                <td className="px-2 py-2 text-blue-500">{error.reason}</td>
                <td className="px-2 py-2">{error.severity}</td>
                <td className="px-2 py-2">
                  <span className={`${getActionColor(error.action)} text-white px-3 py-1 text-xs rounded`}>
                    {error.action}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ErrorsTable;