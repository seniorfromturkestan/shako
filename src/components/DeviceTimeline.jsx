import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceTimeline = ({ deviceId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`/api/device-events/${deviceId}`);
        setEvents(res.data);
      } catch (error) {
        console.error('Ошибка при загрузке событий:', error);
      }
    };

    fetchEvents();
  }, [deviceId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Device Timeline</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border p-3 rounded shadow-sm">
            <div><strong>Event Time:</strong> {new Date(event.eventTime).toLocaleString()}</div>
            <div><strong>Status Before:</strong> {event.statusBefore}</div>
            <div><strong>Status During:</strong> {event.statusDuring}</div>
            <div><strong>Status After:</strong> {event.statusAfter}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceTimeline;