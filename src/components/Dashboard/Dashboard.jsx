import React, { useState, useEffect } from 'react';
import { GaugeMeter } from '../GaugeMeter/GaugeMeter';
import { fetchSystemUsage, fetchBatteryStatus } from './Dashboard';
import './Dashboard.css';

export const Dashboard = ({ token }) => {
  const [ramUsed, setRamUsed] = useState(70);
  const [battery, setBattery] = useState(55);
  const [cpuUsed, setCpuUsed] = useState(10);
  const [networkSpeed, setNetworkSpeed] = useState(60);

  useEffect(() => {
    if (!token) return;

    // fetchBatteryStatus(setBattery);
    // fetchSystemUsage(setRamUsed, setBattery);

    // const interval = setInterval(() => {
    //   fetchBatteryStatus(setBattery);
    //   fetchSystemUsage(setRamUsed, setBattery);
    // }, 5000);

    //return () => clearInterval(interval);
  }, [token]);

  return (
    <div
      id="dashboard"
      className="text-center py-20 bg-white h-100 flex flex-col justify-between items-center"
    >
      <h2 className="text-2xl font-bold mt-10">
        Resource usage of your system
      </h2>
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <GaugeMeter value={token ? cpuUsed : 0} label="CPU Usage" />
        </div>
        <div className="flex flex-col items-center">
          <GaugeMeter value={token ? ramUsed : 0} label="Memory Usage" />
        </div>
        <div className="flex flex-col items-center">
          <GaugeMeter value={token ? battery : 0} label="Battery Remaining" />
        </div>
      </div>

      
    </div>
  );
};
