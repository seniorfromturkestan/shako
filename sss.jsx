import React, { useState, useEffect } from 'react';

const NetworkMonitoringDashboard = () => {
  // Mock data that would typically come from backend
  const [errors, setErrors] = useState([
    { device: 'Cisco Router-1', reason: 'Interface down (5+ min)', severity: 'High', action: 'Reset' },
    { device: 'Cisco Router-1', reason: 'CPU Load 95% (10 min)', severity: 'High', action: 'Reset' },
    { device: 'Cisco Router-1', reason: 'Packet Loss (6 %)', severity: 'Medium', action: 'Monitor' },
    { device: 'Cisco Router-1', reason: 'down...', severity: 'High', action: 'Reset' },
    { device: 'Cisco Router-1', reason: 'down...', severity: 'Medium', action: 'Monitor' },
    { device: 'Cisco Router-1', reason: 'down...', severity: 'High', action: 'Reset' },
    { device: 'Cisco Router-1', reason: 'down...', severity: 'High', action: 'Reset' },
    { device: 'Cisco Router-1', reason: 'down...', severity: 'Low', action: 'Log' },
    { device: 'Cisco Router-1', reason: 'down...', severity: 'High', action: 'Reset' },
  ]);

  const [diskUsage, setDiskUsage] = useState([
    { device: 'Cisco Router-1', volume: 'C:', utilization: 96 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 83 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 42 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 96 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 83 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 42 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 96 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 83 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 42 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 96 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 83 },
    { device: 'Cisco Router-1', volume: 'C:', utilization: 42 },
  ]);

  const [memoryUsage, setMemoryUsage] = useState([
    { device: 'OPM', usage: 65 },
    { device: 'OPM-1', usage: 65 },
    { device: 'OPM-2', usage: 65 },
    { device: 'OPM-3', usage: 65 },
    { device: 'OPM-4', usage: 65 },
    { device: 'OPM-5', usage: 65 },
    { device: 'OPM-6', usage: 65 },
    { device: 'OPM-7', usage: 65 },
    { device: 'OPM-8', usage: 65 },
  ]);

  const [interfaceStatus, setInterfaceStatus] = useState([
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 30, outPercentage: 45 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 25, outPercentage: 40 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 35, outPercentage: 30 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 28, outPercentage: 42 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 32, outPercentage: 38 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 30, outPercentage: 35 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 27, outPercentage: 40 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 33, outPercentage: 36 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 29, outPercentage: 39 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 31, outPercentage: 37 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 28, outPercentage: 41 },
    { device: 'Cisco Router-1', interface: 'g0/0', traffic: '8.21 Mbps', inPercentage: 34, outPercentage: 33 },
  ]);

  const [cpuUtilization, setCpuUtilization] = useState([
    { device: 'Cisco Router-1', usage: 39.56 },
    { device: 'Cisco Router-2', usage: 78 },
  ]);

  const [recentAlarms, setRecentAlarms] = useState([
    { device: 'Cisco Router 1', message: 'Need to reset. High Fidelity Error on the interface', timestamp: '21 Feb 2019 04:57:02 PM IST' },
    { device: 'Cisco Router 1', message: 'Need to reset. High Fidelity Error on the interface', timestamp: '21 Feb 2019 04:57:02 PM IST' },
    { device: 'Cisco Router 1', message: 'Need to reset. High Fidelity Error on the interface', timestamp: '21 Feb 2019 04:57:02 PM IST' },
    { device: 'Cisco Router 1', message: 'Need to reset. High Fidelity Error on the interface', timestamp: '21 Feb 2019 04:57:02 PM IST' },
    { device: 'Cisco Router 1', message: 'Need to reset. High Fidelity Error on the interface', timestamp: '21 Feb 2019 04:57:02 PM IST' },
    { device: 'Cisco Router 1', message: 'Need to reset. High Fidelity Error on the interface', timestamp: '21 Feb 2019 04:57:02 PM IST' },
  ]);

  const [alarmCount, setAlarmCount] = useState(10);

  // Function to get color based on utilization
  const getUtilizationColor = (value) => {
    if (value < 50) return 'bg-green-500';
    if (value < 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Function to get color based on severity
  const getSeverityColor = (severity) => {
    if (severity === 'Low') return 'bg-blue-500';
    if (severity === 'Medium') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Function to get text color based on action
  const getActionColor = (action) => {
    if (action === 'Reset') return 'bg-red-500';
    if (action === 'Monitor') return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Network Performance */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Network Performance</h2>
          <div className="mb-2">
            <p className="text-sm">Network Latency & Packet Loss</p>
            <div className="flex text-xs justify-between">
              <span>&lt;Nov 1, 3:24 am</span>
              <span className="text-blue-500">Last 12 hours</span>
              <span>Nov 1, 3:24 pm &gt;</span>
            </div>
          </div>
          <div className="h-32 relative">
            {/* Simplified graph representation */}
            <div className="h-full w-full flex items-end">
              <div className="w-1/2 h-full relative">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <path d="M0,50 Q20,40 40,55 Q60,70 80,35 Q100,20 120,30" stroke="green" fill="none" strokeWidth="2" />
                </svg>
                <div className="absolute bottom-0 left-0 p-1 bg-green-100 text-xs flex items-center">
                  <div className="w-3 h-3 bg-green-500 mr-1"></div>
                  <span>Ping latency</span>
                </div>
              </div>
              <div className="w-1/2 h-full relative">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <path d="M0,60 Q20,70 40,50 Q60,65 80,45 Q100,70 120,50" stroke="red" fill="none" strokeWidth="2" />
                </svg>
                <div className="absolute bottom-0 right-0 p-1 bg-red-100 text-xs flex items-center">
                  <div className="w-3 h-3 bg-red-500 mr-1"></div>
                  <span>Packet loss</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Errors */}
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

        {/* Recent Alarms */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Recent Alarms</h2>
          <div className="flex justify-center items-center mb-4">
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full bg-red-200 flex items-center justify-center">
                <div className="text-4xl font-bold text-red-500">{alarmCount}</div>
              </div>
              <div className="text-center mt-2 text-gray-500">Alarms</div>
            </div>
          </div>
          <div className="space-y-2 mt-4 overflow-y-auto max-h-64">
            <div className="text-sm font-medium">Device Name =</div>
            {recentAlarms.map((alarm, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-2 py-1 text-xs">
                <div className="font-medium">{alarm.device}</div>
                <div className="text-gray-600">{alarm.message}</div>
                <div className="text-gray-400">{alarm.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices by Memory Utilization */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-4">Devices by Memory Utilization</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium mb-2">
              <div>Device Name</div>
              <div>Memory Usage</div>
            </div>
            {memoryUsage.map((device, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 items-center">
                <div className="text-sm">{device.device}</div>
                <div className="flex items-center">
                  <span className="text-xs mr-2">{device.usage}%</span>
                  <div className="flex-grow h-2 bg-gray-200 rounded">
                    <div className="h-full bg-blue-500 rounded" style={{ width: `${device.usage}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center text-xs mt-4">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-blue-500 mr-1"></div>
              <span>Used</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-700 mr-1"></div>
              <span>Free</span>
            </div>
          </div>
        </div>

        {/* Interface Status */}
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
                {interfaceStatus.map((item, index) => (
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

        {/* Volumes with most Disk Usage */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-4">Volumes with most Disk Usage</h2>
          <div className="grid grid-cols-3 gap-2 text-sm font-medium mb-2">
            <div>Device Name</div>
            <div>Volume</div>
            <div>Utilization ( 93 )</div>
          </div>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {diskUsage.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-sm items-center">
                <div>{item.device}</div>
                <div>{item.volume}</div>
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-gray-200 rounded mr-2">
                    <div 
                      className={`h-full rounded ${getUtilizationColor(item.utilization)}`} 
                      style={{ width: `${item.utilization}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{item.utilization}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices by CPU Utilization */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-4">Devices by CPU Utilization</h2>
          <div className="grid grid-cols-2 gap-2 text-sm font-medium mb-2">
            <div>Device Name</div>
            <div>CPU Usage</div>
          </div>
          <div className="space-y-6">
            {cpuUtilization.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 items-center">
                <div className="text-sm">{item.device}</div>
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
                        stroke={item.usage < 50 ? "green" : item.usage < 80 ? "orange" : "red"}
                        strokeWidth="10"
                        strokeDasharray={`${item.usage * 2.83} 283`}
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
                        {item.usage}
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMonitoringDashboard;