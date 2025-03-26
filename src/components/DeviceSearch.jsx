import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceSearch = () => {
  const [vendor, setVendor] = useState('');
  const [status, setStatus] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [devices, setDevices] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get('/api/devices/search', {
        params: { vendor, status, ipAddress },
      });
      setDevices(res.data);
    } catch (error) {
      console.error('Ошибка при поиске устройств:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          placeholder="Vendor"
        />
        <input
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        />
        <input
          className="border p-2 rounded"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          placeholder="IP Address"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      
      <div>
        {devices.map((device) => (
          <div key={device.id} className="border p-2 rounded mb-2 shadow">
            <div><strong>ID:</strong> {device.id}</div>
            <div><strong>Vendor:</strong> {device.vendor}</div>
            <div><strong>Status:</strong> {device.status}</div>
            <div><strong>IP Address:</strong> {device.ipAddress}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceSearch;