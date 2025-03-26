import React, { useState, useEffect } from 'react';
import NetworkPerformance from './components/NetworkPerformance';
import ErrorsTable from './components/ErrorsTable';
import RecentAlarms from './components/RecentAlarms';
import MemoryUtilization from './components/MemoryUtilization';
import InterfaceStatus from './components/InterfaceStatus';
import DeviceTemperatures from './components/DeviceTemperatures';
import CpuUtilization from './components/CpuUtilization';
import DeviceUptime from './components/DeviceUptime';
import DeviceTimeline from './components/DeviceTimeline';
import DeviceSearch from './components/DeviceSearch';


const App = () => {
  const [networkData, setNetworkData] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNetworkData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9090/api/metrics");
      const data = await response.json();
      setNetworkData(data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkData();
    const interval = setInterval(fetchNetworkData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newErrors = [];
    
    Object.entries(networkData).forEach(([device, metrics]) => {
      if (metrics.CPU && parseInt(metrics.CPU) > 90) {
        newErrors.push({
          device,
          reason: `CPU Load ${metrics.CPU} (10 min)`,
          severity: 'High',
          action: 'Reset'
        });
      } else if (metrics.CPU && parseInt(metrics.CPU) > 65) {
        newErrors.push({
          device,
          reason: `CPU Load ${metrics.CPU} (5 min)`,
          severity: 'Medium',
          action: 'Monitor'
        });
      }
      
      if (metrics.Temperature && parseInt(metrics.Temperature) > 90) {
        newErrors.push({
          device,
          reason: `High Temperature ${metrics.Temperature}`,
          severity: 'High',
          action: 'Reset'
        });
      } else if (metrics.Temperature && parseInt(metrics.Temperature) > 60) {
        newErrors.push({
          device,
          reason: `Elevated Temperature ${metrics.Temperature}`,
          severity: 'Medium',
          action: 'Monitor'
        });
      }
      
      const memoryGB = metrics.Memory ? parseInt(metrics.Memory) : 0;
      if (memoryGB > 12) {
        newErrors.push({
          device,
          reason: `High Memory Usage ${metrics.Memory}`,
          severity: 'Medium',
          action: 'Monitor'
        });
      }
      
      if (metrics["Traffic OUT"] && metrics["Traffic IN"]) {
        const outTraffic = parseInt(metrics["Traffic OUT"]);
        const inTraffic = parseInt(metrics["Traffic IN"]);
        
        if (outTraffic > 150) {
          newErrors.push({
            device,
            reason: `High Outbound Traffic ${metrics["Traffic OUT"]}`,
            severity: 'Medium',
            action: 'Monitor'
          });
        }
        
        if (inTraffic > 150) {
          newErrors.push({
            device,
            reason: `High Inbound Traffic ${metrics["Traffic IN"]}`,
            severity: 'Medium',
            action: 'Monitor'
          });
        }
      }
    });
    
    setErrors(newErrors);
  }, [networkData]);

  const getCpuPercentage = (cpuString) => {
    return parseInt(cpuString.replace('%', ''));
  };

  const getMemoryGB = (memoryString) => {
    return parseInt(memoryString.replace('Gb', ''));
  };

  const getTrafficKb = (trafficString) => {
    return parseInt(trafficString.replace('Kb', ''));
  };

  const getTemperatureC = (tempString) => {
    return parseInt(tempString.replace(' C', ''));
  };

  const generateInterfaceStatus = () => {
    const result = [];
    
    Object.entries(networkData).forEach(([device, metrics]) => {
      if (metrics["Traffic IN"] && metrics["Traffic OUT"]) {
        const inTraffic = getTrafficKb(metrics["Traffic IN"]);
        const outTraffic = getTrafficKb(metrics["Traffic OUT"]);
        const totalTraffic = (inTraffic + outTraffic) / 10; 
        
        result.push({
          device,
          interface: 'g0/0',
          traffic: `${totalTraffic.toFixed(2)} Mbps`,
          inPercentage: Math.min(100, inTraffic / 2),
          outPercentage: Math.min(100, outTraffic / 2)
        });
      }
    });
    
    return result;
  };

  const getTemperatureColor = (temp) => {
    if (temp < 40) return 'bg-green-500';
    if (temp < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getActionColor = (action) => {
    if (action === 'Reset') return 'bg-red-500';
    if (action === 'Monitor') return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const [alarmCount, setAlarmCount] = useState(errors.length);
  
  useEffect(() => {
    setAlarmCount(errors.length);
  }, [errors]);

  return (
    <div className="bg-gray-100 p-4">
      {loading && <div className="text-center">Загрузка данных...</div>}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <NetworkPerformance />
        <DeviceSearch />
        <DeviceTimeline />
        <ErrorsTable errors={errors} getActionColor={getActionColor} />
        <RecentAlarms alarmCount={alarmCount} errors={errors} />
        <MemoryUtilization networkData={networkData} getMemoryGB={getMemoryGB} />
        <InterfaceStatus generateInterfaceStatus={generateInterfaceStatus} />
        <DeviceTemperatures networkData={networkData} getTemperatureC={getTemperatureC} getTemperatureColor={getTemperatureColor} />
        <CpuUtilization networkData={networkData} getCpuPercentage={getCpuPercentage} />
        <DeviceUptime networkData={networkData} />

      </div>
    </div>
  );
};

export default App;